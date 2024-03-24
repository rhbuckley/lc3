import { parseRegister, parseStrInt } from "../utils";
import { ASMManager } from "./manager";
import { TokenizedInstruction, tokenizeInstruction } from "./matcher";

interface CompilationResult {
    program: number[];
    startAddress: number;
    symbolTable: Map<string, number>;
}

export function compile_asm(lines: string[]) {
    const manager = new ASMManager();

    for (const line of lines) {
        handleLine(line, manager);
    }

    // Check if any labels are unresolved
    if (manager.hasUnresolvedLabels()) {
        throw new Error("Unresolved labels");
    }

    return {
        program: manager.getMemory(),
        startAddress: manager.getOrigin(),
        symbolTable: manager.getSymbolTable(),
    } as CompilationResult;
}

const Instructions = {
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

/**
 * Handle a line in the assembly code.
 * @param line {string} the line to handle
 * @param manager {ASMManager} the manager to handle the line
 */
function handleLine(line: string, manager: ASMManager) {
    // 0 will always be the opcode
    const instruction = tokenizeInstruction(line);
    if (!instruction) return;

    if (instruction.label)
        manager.addLabel(
            instruction.label,
            !instruction.opcode && !instruction.directive
        );

    if (instruction.opcode) handleInstruction(instruction, manager);
    if (instruction.directive) handleDirective(instruction, manager);
}

/**
 * Load the instruction into the manager.
 * @param instruction {TokenizedInstruction}
 * @param manager {ASMManager} the manager to handle the instruction
 */
function handleInstruction(
    tokenizeInstruction: TokenizedInstruction,
    manager: ASMManager
) {
    const { opcode, tokens } = tokenizeInstruction;
    if (!opcode) return;

    const opcodeValue = Instructions[opcode as keyof typeof Instructions];

    // Here we are going to define helper function to get the value of
    // a part of an instruction. We do this with functions because
    // directly calling could raise an error if the value is not
    // a number or register
    const DR = () => parseRegister(tokens[1]);
    const SR1 = () => parseRegister(tokens[2]);
    const SR2 = () => parseRegister(tokens[3]);

    // We can group instructions together, as many
    // of them have the same format

    let instruction = opcodeValue << 12;

    switch (opcodeValue) {
        case Instructions.ADD:
        case Instructions.AND:
            // Are we using an immediate or register value
            instruction |= 0x20 | (DR() << 9) | (SR1() << 6);
            if (tokens[3].startsWith("R")) {
                instruction |= SR2();
                manager.addInstruction(instruction);
            } else {
                manager.addImmediateInstruction(instruction, tokens[3], 5);
            }
            break;

        case Instructions.BR:
            if (tokens[0].match(/n/i) !== null) instruction |= 0x800;
            if (tokens[0].match(/z/i) !== null) instruction |= 0x400;
            if (tokens[0].match(/p/i) !== null) instruction |= 0x200;
            manager.addOffsetInstruction(instruction, tokens[1], 9);
            break;

        case Instructions.JMP:
            instruction |= SR1() << 6;
            break;

        case Instructions.JSR:
            if (tokens[0] === "JSRR") {
                instruction |= SR1() << 6;
                manager.addInstruction(instruction);
            } else {
                instruction |= 0x800;
                manager.addOffsetInstruction(instruction, tokens[1], 11);
            }
            break;

        case Instructions.ST:
        case Instructions.STI:
        case Instructions.LEA:
        case Instructions.LD:
        case Instructions.LDI:
            instruction |= DR() << 9;
            manager.addOffsetInstruction(instruction, tokens[2], 9);

            break;

        case Instructions.LDR:
        case Instructions.STR:
            instruction |= DR() << 9;
            instruction |= SR1() << 6;
            manager.addOffsetInstruction(instruction, tokens[3], 6);
            break;

        case Instructions.RTI:
            break;

        case Instructions.NOT:
            instruction |= DR() << 9;
            instruction |= SR1() << 6;
            instruction |= 0x3f;
            manager.addInstruction(instruction);
            break;

        case Instructions.TRAP:
            manager.addImmediateInstruction(instruction, tokens[1], 8);
            break;

        default:
            throw new Error("Invalid opcode: " + opcode);
    }
}

/**
 * Handle a directive in the assembly code.
 * @param instruction {TokenizedInstruction}
 * @param manager {ASMManager} the manager to handle the instruction
 */
function handleDirective(
    instruction: TokenizedInstruction,
    manager: ASMManager
) {
    const { directive, tokens } = instruction;
    const value = tokens[1];

    switch (directive) {
        // first, let's handle assembly directives
        case ".ORIG":
            manager.setOrigin(parseStrInt(value));
            break;

        case ".FILL":
            manager.addInstruction(parseStrInt(value));
            break;

        case ".BLKW":
            const count = parseInt(tokens[1]);
            if (isNaN(count))
                throw new Error(
                    "Error parsing .BLKW: Expected number\nExample: .BLKW 5"
                );

            for (let i = 0; i < count; i++) {
                manager.addInstruction(0);
            }
            break;

        case ".STRINGZ":
            const str = value;
            for (let i = 0; i < str.length; i++) {
                manager.addInstruction(str.charCodeAt(i));
            }
            manager.addInstruction(0);
            break;

        case ".END":
            manager.setEnd();
            break;

        default:
            throw new Error("Invalid directive: " + directive);
    }
}
