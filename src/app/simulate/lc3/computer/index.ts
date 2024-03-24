import {
    $halted,
    $input,
    $memDisplayWindow,
    $memory,
    $output,
} from "../@react";
import { HARDWARE_ADDRESSES } from "../const";
import { LC3Memory } from "./memory";
import { symbolTable } from "./os";
import { LC3Registers } from "./registers";
import { LC3Worker } from "./worker";
import { $registers } from "~/app/simulate/lc3/@react";

export class LittleComputer3 {
    memory: LC3Memory;
    program: LC3Program;
    worker: LC3Worker;
    registers: LC3Registers;
    symbolTable: Map<string, number>;

    constructor() {
        this.memory = new LC3Memory();
        this.registers = new LC3Registers();
        this.worker = new LC3Worker(this.memory, this.registers);
        this.program = { program: [], startAddress: 0, symbolTable: new Map() };

        /**
         * Load in the initial symbol table from
         * the OS.
         */
        this.symbolTable = new Map(Object.entries(symbolTable));

        /**
         * When the KBDR register is read, we need to
         * update the KBSR register to show that the
         * keyboard is ready.
         */
        this.memory.onRead(HARDWARE_ADDRESSES.KBDR, () => {
            this.memory.set(HARDWARE_ADDRESSES.KBSR, (kbsr) => kbsr | 0x8000);
        });

        /**
         * When the DDR register is written to, we need to
         * update the DSR register to show that the display
         * is ready.
         */
        this.memory.onWrite(HARDWARE_ADDRESSES.DDR, () => {
            this.memory.set(HARDWARE_ADDRESSES.DSR, () => 0x0000);
        });

        /**
         * Watch ALL memory writes (this is for UI updates)
         */
        this.memory.onAccess((addr, val, set) => {
            // - We don't care about reads
            if (!set) return;

            // - Update the UI
            $memory.setKey(addr, val);
        });

        /**
         * Watch all registers
         */
        this.registers.onAny((register, value, set) => {
            if (!set) return;
            $registers.setKey(register, value);
        });
    }

    /**
     * This loads a program into memory, initializes the symbols,
     * and sets the program counter to the start address.
     * @param program {LC3Program}
     */
    loadProgram(program: LC3Program) {
        this.program = program;
        this.registers.PC = program.startAddress;
        this.memory.clear();
        this.memory.load(program.program, program.startAddress);
        program.symbolTable.forEach((value, key) =>
            this.symbolTable.set(key, value)
        );
    }

    /**
     * This gets the symbol value from the symbol table.
     * @param symbol {string}
     * @returns {number}
     */
    getSymbolValue(symbol: string): number {
        return this.symbolTable.get(symbol) || 0;
    }

    /**
     * This resets the computer to its initial state.
     * This will clear the memory and registers.
     * It will also reload the symbol table.
     */
    reset() {
        this.memory.clear();
        this.registers.reset();
        this.loadProgram(this.program);
    }

    /**
     * This runs the computer. It will execute the program
     * until the program counter is at the HALT instruction.
     */
    run() {
        $halted.set(false);
        // const loop = setInterval(() => {
        //     this.tick();
        //     $memDisplayWindow.set([
        //         $memDisplayWindow.get()[0],
        //         this.registers.PC,
        //     ]);

        //     if ($halted.get() || this.registers.PC === 0xfd79) {
        //         clearInterval(loop);
        //     }
        // }, 50);

        while (!$halted.get() && this.registers.PC !== 0xfd79) {
            this.tick();
            $memDisplayWindow.set([
                $memDisplayWindow.get()[0],
                this.registers.PC,
            ]);
        }

        $halted.set(true);
    }

    /**
     * This steps the computer. It will execute the next
     * instruction in the program.
     */
    step() {
        $halted.set(false);
        this.tick();
        $memDisplayWindow.set([$memDisplayWindow.get()[0], this.registers.PC]);
    }

    /**
     * This steps the computer over a subroutine. It will
     * execute the next instruction in the program, but if
     * the instruction is a JSR, it will execute the subroutine
     * and return to the next instruction.
     */
    stepOver() {
        $halted.set(false);
        const instruction = this.memory.get(this.registers.PC);
        this.execute(instruction);

        if ((instruction & 0xf000) === 0x4800) {
            // - If the instruction is a JSR, we need to step over the subroutine
            const returnAddress = this.registers.PC;
            do {
                this.tick();
            } while (this.memory.get(this.registers.PC) !== returnAddress);
        } else {
            this.tick();
        }
    }

    /**
     * We need to check the hardware of this computer. Specifically,
     * we need to get the input from stdin and output to stdout.
     */
    private stdin() {
        // - Get the KBSR and KBDR registers
        const { KBSR, KBDR } = HARDWARE_ADDRESSES;

        // - Check if the KBSR register is ready
        const hasInput = $input.get().length > 0;
        if (hasInput && (this.memory.get(KBSR) & 0x8000) === 0) {
            // - If it is, then we can read the input
            const input = $input.get().charCodeAt(0) & 0xff;
            this.memory.set(KBSR, (kbsr) => kbsr | 0x8000);
            this.memory.set(KBDR, (kbdr) => (kbdr & 0xff00) | input);

            // - Pop from input
            $input.set($input.get().substring(1));
        }
    }

    /**
     * Don't forget about stdout. We need to check if the computer
     * is trying to output to the screen.
     */
    private stdout() {
        // - Get the DSR and DDR registers
        const { DSR, DDR } = HARDWARE_ADDRESSES;

        // - Check if the DSR register is ready
        // - we are going to say that the display
        // - is always ready
        if ((this.memory.get(DSR) & 0x8000) === 0) {
            // - If it is, then we can write the output
            const output = this.memory.get(DDR) & 0xff;
            $output.set($output.get() + String.fromCharCode(output));

            // - Set the DSR register to ready
            this.memory.set(DSR, (dsr) => dsr | 0x8000);
        }
    }

    private execute(instruction: number) {
        this.worker.executeInstruction(instruction);
    }

    private tick() {
        // - Get the current instruction
        const instruction = this.memory.get(this.registers.PC);

        // - Increment the program counter
        this.registers.PC += 1;

        // - Execute the instruction
        this.execute(instruction);

        // - Check the hardware
        this.stdin();
        this.stdout();
    }

    /**
     * Here ar public methods to interact with the computer.
     */
    public writeMemory(address: number, value: number) {
        this.memory.set(address, value);
    }

    public readMemory(address: number): number {
        return this.memory.get(address);
    }

    public writeRegister(register: number, value: number) {
        this.registers.set(register, value);
    }

    public readRegister(register: number): number {
        return this.registers.get(register);
    }

    public getPC() {
        return this.registers.PC;
    }

    public getCC() {
        return this.registers.CC;
    }

    public setPC(value: number) {
        this.registers.PC = value;
    }
}

export interface LC3Program {
    program: number[];
    startAddress: number;
    symbolTable: Map<string, number>;
}
