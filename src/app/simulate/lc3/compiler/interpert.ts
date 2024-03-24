/**
 * This file will have two exported functions. compile_asm and interpert_bin, where
 * these functions transform machine code into human readable asm, or asm into machine
 * readable bin.
 */

export function interpert_bin(
    instruction: number,
    hasHalted: boolean = false,
    currentAddr?: number
) {
    // Get the opcodes
    const ins_opcode = (instruction >> 12) & 0xf;
    if (instruction === 0) return "NULL";

    if (hasHalted) {
        // Could the value be ASCII? (Checking with priority)
        const char = String.fromCharCode(instruction & 0xff);
        if (/^[\x00-\x7F]*$/.test(char)) {
            return ` ${char}`;
        }
    }

    if (Object.hasOwn(OPCODES_TO_ASM, ins_opcode)) {
        const opcode = OPCODES_TO_ASM[ins_opcode];
        const asm = getOpcodeDetails(opcode, instruction, currentAddr);

        if (asm !== "UNKNOWN") return asm;
    }

    // Could the value be ASCII?
    const char = String.fromCharCode(instruction & 0xff);
    if (/^[\x00-\x7F]*$/.test(char)) {
        return `ASCII: ${char}`;
    }

    return "Unknown Operation";
}

/** All LC3 opcodes, sorted */
const ASM_TO_OPCODES = {
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
    // reserved: 0xd,
    LEA: 0xe,
    TRAP: 0xf,
};

const OPCODES_TO_ASM: Record<number, keyof typeof ASM_TO_OPCODES> =
    Object.fromEntries(
        Object.entries(ASM_TO_OPCODES).map(([key, value]) => [
            value,
            key as keyof typeof ASM_TO_OPCODES,
        ])
    );

/**
 * Here are the OPCODE REFERENCES
 */

function pcOrLiteral(offset: number, currentAddr?: number, bits = 9) {
    if (currentAddr === undefined) return `#${offset}`;
    if (offset & (1 << (bits - 1))) {
        offset = -Math.pow(2, bits) + 1 + offset;
    }
    return `0x${(currentAddr + offset).toString(16).padStart(4, "0")}`;
}

type Opcodes = keyof typeof ASM_TO_OPCODES;
function getOpcodeDetails(
    opcode: Opcodes,
    instruction: number,
    currentAddr?: number
) {
    if (opcode === "BR") {
        const n = (instruction >> 11) & 0x1;
        const z = (instruction >> 10) & 0x1;
        const p = (instruction >> 9) & 0x1;
        const PCoffset9 = instruction & 0x1ff;

        const nzp = `${n ? "n" : ""}${z ? "z" : ""}${p ? "p" : ""}`;
        return `BR${nzp} ${pcOrLiteral(PCoffset9, currentAddr)}`;
    }

    if (opcode === "ADD") {
        const mode = (instruction >> 5) & 0x1;
        const DR = (instruction >> 9) & 0x7;
        const SR1 = (instruction >> 6) & 0x7;

        if (mode === 0) {
            const SR2 = instruction & 0x7;
            return `ADD R${DR} R${SR1} R${SR2}`;
        } else {
            const imm5 = instruction & 0x1f;
            return `ADD R${DR} ${SR1} #${imm5}`;
        }
    }

    if (opcode === "LD") {
        const DR = (instruction >> 9) & 0x7;
        const PCoffset9 = instruction & 0x1ff;
        return `LD R${DR} ${pcOrLiteral(PCoffset9, currentAddr)}`;
    }

    if (opcode === "ST") {
        const SR = (instruction >> 9) & 0x7;
        const PCoffset9 = instruction & 0x1ff;
        return `ST R${SR} ${pcOrLiteral(PCoffset9, currentAddr)}`;
    }

    if (opcode === "JSR") {
        const bit11 = (instruction >> 11) & 0x1;
        if (bit11 === 0) {
            const BaseR = (instruction >> 6) & 0x7;
            return `JSRR R${BaseR}`;
        } else {
            const PCoffset11 = instruction & 0x7ff;
            return `JSR #${PCoffset11}`;
        }
    }

    if (opcode === "AND") {
        const mode = (instruction >> 5) & 0x1;

        const DR = (instruction >> 9) & 0x7;
        const SR1 = (instruction >> 6) & 0x7;

        if (mode === 0) {
            const SR2 = instruction & 0x7;
            return `AND R${DR} R${SR1} R${SR2}`;
        } else {
            const imm5 = instruction & 0x1f;
            return `AND R${DR} R${SR1} #${imm5}`;
        }
    }

    if (opcode === "LDR") {
        const DR = (instruction >> 9) & 0x7;
        const BaseR = (instruction >> 6) & 0x7;
        const offset6 = instruction & 0x3f;

        return `LDR R${DR} R${BaseR} ${pcOrLiteral(offset6, currentAddr, 6)}`;
    }

    if (opcode === "STR") {
        const SR = (instruction >> 9) & 0x7;
        const BaseR = (instruction >> 6) & 0x7;
        const offset6 = instruction & 0x3f;

        return `STR ${BaseR} R${SR} ${pcOrLiteral(offset6, currentAddr, 6)}`;
    }

    if (opcode === "RTI") {
        return `RTI`;
    }

    if (opcode === "NOT") {
        const DR = (instruction >> 9) & 0x7;
        const SR = (instruction >> 6) & 0x7;
        return `NOT R${DR} R${SR}`;
    }

    if (opcode === "LDI") {
        const DR = (instruction >> 9) & 0x7;
        const PCoffset9 = instruction & 0x1ff;
        return `LDI R${DR} ${pcOrLiteral(PCoffset9, currentAddr)}`;
    }

    if (opcode === "STI") {
        const SR = (instruction >> 9) & 0x7;
        const PCoffset9 = instruction & 0x1ff;
        return `STI R${SR} ${pcOrLiteral(PCoffset9, currentAddr)}`;
    }

    if (opcode === "JMP") {
        const BaseR = (instruction >> 6) & 0x7;
        return `JMP #${BaseR}`;
    }

    if (opcode === "LEA") {
        const DR = (instruction >> 9) & 0x7;
        const PCoffset9 = instruction & 0x1ff;
        return `LEA R${DR} ${pcOrLiteral(PCoffset9, currentAddr)}`;
    }

    if (opcode === "TRAP") {
        const trapvect8 = instruction & 0xff;

        if (trapvect8 === 0x20) return "GETC";
        if (trapvect8 === 0x21) return "OUT";
        if (trapvect8 === 0x22) return "PUTS";
        if (trapvect8 === 0x23) return "IN";
        if (trapvect8 === 0x25) return "HALT";

        return `TRAP 0x${trapvect8.toString(16)}`;
    }

    return "UNKNOWN";
}
