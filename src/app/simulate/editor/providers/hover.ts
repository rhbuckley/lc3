import { Monaco } from "@monaco-editor/react";
import { LC3LanguageID } from "../const";

type KeywordsType = Record<
    string,
    {
        description: string;
        syntax?: string[];
        examples?: string[];
        type: string;
    }
>;

const supportedKeywords: KeywordsType = {
    ADD: {
        type: "Opcode",
        description:
            "This instruction adds the contents of SR1 and (SR2 or a 5 bit signed integer) and stores the result in DR.",
        syntax: ["ADD DR, SR1, SR2", "ADD DR, SR1, imm5"],
        examples: ["ADD R0, R1, R2", "ADD R0, R1, #5"],
    },

    AND: {
        type: "Opcode",
        description:
            "This instruction performs a bitwise AND operation between the contents of SR1 and (SR2 or a 5 bit signed integer) and stores the result in DR.",
        syntax: ["AND DR, SR1, SR2", "AND DR, SR1, imm5"],
        examples: ["AND R0, R1, R2", "AND R0, R1, #5"],
    },

    NOT: {
        type: "Opcode",
        description:
            "This instruction performs a bitwise NOT operation on the contents of SR and stores the result in DR.",
        syntax: ["NOT DR, SR"],
        examples: ["NOT R0, R1"],
    },

    BR: {
        type: "Opcode",
        description:
            "This instruction performs a conditional branch based on the condition codes specified. PC is updated if the condition is met.",
        syntax: ["BR n", "BRzp", "BRzp offset9"],
        examples: ["BRnzp", "BRn -5"],
    },

    JMP: {
        type: "Opcode",
        description:
            "This instruction performs an unconditional jump to the address specified by the contents of BaseR.",
        syntax: ["JMP BaseR"],
        examples: ["JMP R7"],
    },

    JSR: {
        type: "Opcode",
        description:
            "This instruction performs a jump to the subroutine specified by PC+offset11 or the address contained in BaseR.",
        syntax: ["JSR offset11", "JSRR BaseR"],
        examples: ["JSR -10", "JSRR R3"],
    },

    LD: {
        type: "Opcode",
        description:
            "This instruction loads the contents of the memory location specified by PC+offset9 into DR.",
        syntax: ["LD DR, offset9"],
        examples: ["LD R0, 10"],
    },

    LDI: {
        type: "Opcode",
        description:
            "This instruction loads the contents of the memory location specified by the address contained in BaseR+offset9 into DR.",
        syntax: ["LDI DR, offset9"],
        examples: ["LDI R0, 20"],
    },

    LDR: {
        type: "Opcode",
        description:
            "This instruction loads the contents of the memory location specified by BaseR+offset6 into DR.",
        syntax: ["LDR DR, BaseR, offset6"],
        examples: ["LDR R0, R1, 5"],
    },

    LEA: {
        type: "Opcode",
        description:
            "This instruction loads the effective address (PC+offset9) into DR.",
        syntax: ["LEA DR, offset9"],
        examples: ["LEA R0, -15"],
    },

    ST: {
        type: "Opcode",
        description:
            "This instruction stores the contents of DR into the memory location specified by PC+offset9.",
        syntax: ["ST DR, offset9"],
        examples: ["ST R0, 30"],
    },

    STI: {
        type: "Opcode",
        description:
            "This instruction stores the contents of DR into the memory location specified by the address contained in BaseR+offset9.",
        syntax: ["STI DR, offset9"],
        examples: ["STI R0, 40"],
    },

    STR: {
        type: "Opcode",
        description:
            "This instruction stores the contents of DR into the memory location specified by BaseR+offset6.",
        syntax: ["STR DR, BaseR, offset6"],
        examples: ["STR R0, R1, -5"],
    },

    TRAP: {
        type: "Opcode",
        description:
            "This instruction generates a trap vector call. The PC and a modified PSR are stored in R7. The trap vector address is loaded into PC.",
        syntax: ["TRAP vector8"],
        examples: ["TRAP x20"],
    },

    OUT: {
        type: "Trap",
        description:
            "This instruction outputs the character in R0 to the console.",
        syntax: ["OUT"],
        examples: ["OUT"],
    },

    IN: {
        type: "Trap",
        description:
            "This instruction reads a character from the console and stores it in R0.",
        syntax: ["IN"],
        examples: ["IN"],
    },

    PUTS: {
        type: "Trap",
        description:
            "This instruction outputs a null-terminated string starting at the memory location specified by the address in R0.",
        syntax: ["PUTS"],
        examples: ["PUTS"],
    },

    RET: {
        type: "Alias",
        description: "This instruction is an alias for JMP R7.",
    },

    ".BLKW": {
        type: "Directive",
        description:
            "This directive reserves a block of memory that is initialized to zero.",
        syntax: [".BLKW n"],
        examples: [".BLKW 10"],
    },

    ".STRINGZ": {
        type: "Directive",
        description:
            "This directive reserves a block of memory that contains a null-terminated string.",
        syntax: [".STRINGZ string"],
        examples: [".STRINGZ 'Hello, World!'"],
    },

    ".FILL": {
        type: "Directive",
        description:
            "This directive initializes a memory location with the specified value.",
        syntax: [".FILL value"],
        examples: [".FILL xFF"],
    },

    ".ORIG": {
        type: "Directive",
        description:
            "This directive specifies the starting address of the program.",
        syntax: [".ORIG address"],
        examples: [".ORIG x3000"],
    },

    ".END": {
        type: "Directive",
        description: "This directive specifies the end of the program.",
        syntax: [".END"],
        examples: [".END"],
    },

    HALT: {
        type: "Trap",
        description: "This instruction halts the program.",
        syntax: ["HALT"],
        examples: ["HALT"],
    },
};

const getContents = (keyword: string) => {
    if (!Object.hasOwn(supportedKeywords, keyword)) return { contents: [] };
    const { type, description, syntax, examples } = supportedKeywords[keyword];

    const mdList = (arr: string[]) =>
        "  \n" + arr.map((e) => `  - ${e}`).join("\n");

    const contents = [
        { value: `**${keyword} ${type}**` },
        { value: description },
    ];

    if (syntax) contents.push({ value: `Syntax: ${mdList(syntax)}` });
    if (examples) contents.push({ value: `Examples: ${mdList(examples)}` });

    return { contents: contents };
};

export const registerLC3HoverProvider = (monaco: Monaco) => {
    monaco.languages.registerHoverProvider(LC3LanguageID, {
        provideHover: (model, position) => {
            // get the hovered word
            const word = model.getWordAtPosition(position);
            if (word === null) return { contents: [] };

            // was the char before a dot?
            if (
                model.getValueInRange({
                    startLineNumber: position.lineNumber,
                    startColumn: word.startColumn - 1,
                    endLineNumber: position.lineNumber,
                    endColumn: word.startColumn,
                }) === "."
            ) {
                return getContents("." + word.word.toUpperCase());
            }

            // is the hovered word a brnzp? (we have BR as a keyword, but it could be BRn)
            if (word.word.toUpperCase().startsWith("BR")) {
                return getContents("BR");
            }

            // last case, just get the contents
            return getContents(word.word.toUpperCase());
        },
    });
};
