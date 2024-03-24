import { asInt16, parseIntN } from "../utils";
import { LC3Memory } from "./memory";
import { LC3Registers } from "./registers";

export class LC3Worker {
    memory: LC3Memory;
    registers: LC3Registers;

    constructor(memory: LC3Memory, registers: LC3Registers) {
        this.memory = memory;
        this.registers = registers;
    }

    /**
     * Executes a given LC-3 instruction. This method will execute the given
     * instruction, and will modify the memory and registers as necessary.
     * @param instruction {number} the U16 instruction to execute
     */
    public executeInstruction(instruction: number) {
        // First, we need to extract the opcode from the instruction
        const opcode = (instruction & 0xf000) >> 12;

        // There are some common formats for the LC=3 instructions. Let's
        // extract the common fields from the instruction
        const DR = (instruction >> 9) & 0x7;
        const SR1 = (instruction >> 6) & 0x7;
        const SR2 = instruction & 0x7;
        const mode = (instruction >> 5) & 0x1;
        const imm5 = parseIntN(instruction & 0x001f, 5);
        const PCOffset9 = parseIntN(instruction & 0x01ff, 9);
        const PCOffset6 = parseIntN(instruction & 0x003f, 6);
        const PCOffset11 = parseIntN(instruction & 0x07ff, 11);

        const updateCC = (value: number) => {
            value = parseIntN(value, 16);
            this.registers.CC = value < 0 ? -1 : value === 0 ? 0 : 1;
        };

        // Here are the values that we will be using
        const PCValue = this.registers.PC;
        const DRValue = this.registers.get(DR);
        const SR1Value = this.registers.get(SR1);
        const SR2Value = this.registers.get(SR2);

        /**
         * https://people.cs.georgetown.edu/~squier/Teaching/HardwareFundamentals/LC3-trunk/docs/LC3-uArch-extended.html
         * The instructions that update the CCs are: ADD, AND, LD, LDI, LDR, LEA, and NOT.
         */

        // Now, we need to execute the instruction based on the opcode
        switch (opcode) {
            case this.Instructions.ADD:
                if (mode === 0) {
                    // Register mode
                    this.registers.set(DR, asInt16(SR1Value + SR2Value));
                } else {
                    // Immediate mode
                    this.registers.set(DR, asInt16(SR1Value + imm5));
                }

                updateCC(this.registers.get(DR));

                break;

            case this.Instructions.AND:
                if (mode === 0) {
                    // Register mode
                    this.registers.set(DR, asInt16(SR1Value & SR2Value));
                } else {
                    // Immediate mode
                    this.registers.set(DR, asInt16(SR1Value & imm5));
                }

                // set condition codes
                updateCC(this.registers.get(DR));
                break;

            case this.Instructions.BR:
                const n = (instruction >> 11) & 0x1;
                const z = (instruction >> 10) & 0x1;
                const p = (instruction >> 9) & 0x1;

                const matchesCC =
                    (n && this.registers.CC === -1) ||
                    (z && this.registers.CC === 0) ||
                    (p && this.registers.CC === 1);

                if (matchesCC) {
                    this.registers.PC += PCOffset9;
                }
                break;

            case this.Instructions.JMP:
                this.registers.PC = SR1Value;
                break;

            case this.Instructions.JSR:
                const offset = (instruction >> 11) & 0x1;
                this.registers.set(7, asInt16(PCValue));
                if (offset) {
                    // JSR
                    this.registers.PC += PCOffset11;
                } else {
                    // JSRR
                    this.registers.PC = SR1Value;
                }
                break;

            case this.Instructions.LD:
                const loadAddr = PCValue + PCOffset9;
                this.registers.set(DR, asInt16(this.memory.get(loadAddr)));
                updateCC(this.registers.get(DR));
                break;

            case this.Instructions.LDI:
                const loadAddrAddr = this.memory.get(PCValue + PCOffset9);
                this.registers.set(
                    DR,
                    asInt16(asInt16(this.memory.get(loadAddrAddr)))
                );
                updateCC(this.registers.get(DR));
                break;

            case this.Instructions.LDR:
                const loadAddrR = SR1Value + PCOffset6;
                this.registers.set(DR, asInt16(this.memory.get(loadAddrR)));
                updateCC(this.registers.get(DR));
                break;

            case this.Instructions.LEA:
                this.registers.set(DR, asInt16(PCValue + PCOffset9));
                updateCC(this.registers.get(DR));
                break;

            case this.Instructions.NOT:
                this.registers.set(DR, asInt16(~SR1Value));
                updateCC(this.registers.get(DR));
                break;

            case this.Instructions.RTI:
                throw new Error("RTI is not implemented");

            case this.Instructions.ST:
                const storeAddr = PCValue + PCOffset9;
                this.memory.set(storeAddr, DRValue);
                break;

            case this.Instructions.STI:
                const storeAddrAddr = this.memory.get(PCValue + PCOffset9);
                this.memory.set(storeAddrAddr, DRValue);
                break;

            case this.Instructions.STR:
                const storeAddrR = SR1Value + PCOffset6;
                this.memory.set(storeAddrR, DRValue);
                break;

            case this.Instructions.TRAP:
                const trapVector = instruction & 0x00ff;
                this.registers.set(7, asInt16(PCValue));

                // lookup the trap vector address
                const trapAddr = this.memory.get(trapVector);
                this.registers.PC = trapAddr;
                break;
        }
    }

    private Instructions = {
        BR: 0x0,
        ADD: 0x1,
        LD: 0x2,
        ST: 0x3,
        JSR: 0x4,
        AND: 0x5,
        LDR: 0x6,
        STR: 0x7,
        RTI: 0x8,
        NOT: 0x9,
        LDI: 0xa,
        STI: 0xb,
        JMP: 0xc,
        LEA: 0xe,
        TRAP: 0xf,
    };
}
