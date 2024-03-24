export const LC3LanguageID = "lc3-assembly";

/**
 * Here are the opcodes that are relevant to the LC-3 assembly language.
 * Opcodes represent the instructions that the LC-3 can execute.
 */
export const opcodes = [
    "ADD",
    "AND",
    "BR",
    "JMP",
    "JSR",
    "JSRR",
    "LD",
    "LDI",
    "LDR",
    "LEA",
    "NOT",
    "RET",
    "RTI",
    "ST",
    "STI",
    "STR",
    "TRAP",
];

/**
 * These are the directives that are allowed within the LC-3 compiler. Directives
 * are shortcuts used to define data or other information that is not an instruction.
 */
export const directives = [".ORIG", ".FILL", ".BLKW", ".STRINGZ", ".END"];

/**
 * Finally, here are the trap codes that are allowed within the LC-3 compiler. Trap
 * codes are used to generate a trap vector call.
 */
export const trapCodes = ["GETC", "OUT", "PUTS", "IN", "HALT"];

/**
 * These are the registers that are allowed within the LC-3 compiler. Registers are
 * used to store data and are used as operands in instructions.
 */
export const registers = ["R0", "R1", "R2", "R3", "R4", "R5", "R6", "R7"];
