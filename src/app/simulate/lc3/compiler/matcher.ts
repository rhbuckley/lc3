export interface TokenizedInstruction {
    type: "instruction" | "directive" | "label";
    directive?: ASMDirective;
    opcode?: ASMInstruction;
    label?: string;
    tokens: string[];
}

/**
 * This function will take an instruction and tokenize it.
 * The tokens will not return the instruction, but the
 * tokens that follow the instruction.
 * @param instruction {string}
 * @returns
 */
export function tokenizeInstruction(instruction: string): TokenizedInstruction {
    // - Split off all comments and trim the instruction
    instruction = instruction.split(/(?!\B"[^"]*);(?![^"]*"\B)/)[0].trim();

    // - Check if the instruction has a string. I
    // do this now because I do not want to tokenize
    // the string.
    if (/.STRINGZ (["'])(?:(?=(\\?))\2.)*?\1/.exec(instruction)) {
        const idx = /.STRINGZ/i.exec(instruction)!.index;
        const string = instruction
            .slice(idx + 8)
            .trim()
            .slice(1, -1);

        const label = instruction.slice(0, idx).trim().replaceAll(":", "");

        return {
            type: "directive",
            directive: ".STRINGZ",
            tokens: [".STRINGZ", string],
            label: label === "" ? undefined : label,
        };
    }

    // - Apply our opinionated mutations
    const originalInstruction = instruction;
    instruction = applyMutations(instruction);

    // - Match a directive, opcode, or label
    const keyword = findKeyword(instruction);

    if (
        !keyword &&
        instruction.split(" ").filter((x) => x !== "").length === 1
    ) {
        return {
            type: "label",
            label: originalInstruction.trim().replaceAll(":", ""),
            tokens: [],
        };
    }

    // - If there is no keyword, then there is most
    // likely a label at the beginning of the instruction.
    if (!keyword) {
        const label = instruction.split(" ")[0];

        // Let's see again, if this is valid with the label
        // removed
        const newInstruction = instruction.replace(label, "").trim();
        const newKeyword = findKeyword(newInstruction);

        if (!newKeyword) {
            throw new Error("Could not determine keyword");
        }

        return {
            label,
            ...newKeyword,
            tokens: tokenize(newInstruction),
        };
    }

    return {
        ...keyword,
        tokens: tokenize(instruction),
    };
}

function tokenize(instruction: string): string[] {
    // - Remove the keyword
    const tokens = instruction.split(" ").filter((x) => x !== "");
    return tokens;
}

/**
 * There are some conventions that I am forcing on
 * the user, these conventions include not using commas,
 * using uppercase R for registers, and using 0x for hex.
 * @param instruction {string}
 * @returns
 */
function applyMutations(instruction: string) {
    for (const mutation of REGEX.mutations) {
        instruction = instruction.replaceAll(mutation.regex, mutation.replace);
    }

    return instruction;
}

interface FindKeywordReturn {
    type: "instruction" | "directive";
    opcode?: ASMInstruction;
    directive?: ASMDirective;
}

/**
 * What is the purpose of the instruction? Instruction
 * need to do something, and this function will determine
 * what that something is.
 * @param instruction {string}
 * @param matches {RegExp[]}
 * @returns
 */
function findKeyword(instruction: string): FindKeywordReturn | null {
    for (const [key, value] of Object.entries(REGEX.matches)) {
        // -  1 does operand match
        if (value.regex.exec(instruction)) {
            // - 2 does a valid case match
            if (value.type === "instruction")
                return {
                    type: value.type,
                    opcode: key as ASMInstruction,
                };

            return {
                type: value.type,
                directive: key as ASMDirective,
            };
        }
    }

    return null;
}

/**
 * These are regex values that will be used to match
 * different parts of the assembly code.
 */
const REGEX_VALUE = {
    registerRegex: "R[0-7]",
    labelRegex: "[a-zA-Z_][a-zA-Z0-9_]*:?",
    immediateRegex: "((-?0?x[A-Fa-f0-9]{4})|((#)|(-#)|(#-)?[0-9]{1,5}))",
};

/**
 * This is all of the regex that will be used to match, mutate
 * and parse the assembly code.
 */
const REGEX: RegexMatcher = {
    mutations: [
        {
            regex: /(x|X)(?=[A-Fa-f0-9]{1,4})/gi,
            replace: "0x",
        },
        {
            regex: /(r)(?=[0-7])/gi,
            replace: "R",
        },
        {
            // Sometimes a user will enter R1, R2
            regex: /(?!\B"[^"]*), (?![^"]*"\B)/gi,
            replace: " ",
        },
        {
            // Sometimes a user will enter R1,R2
            regex: /(?!\B"[^"]*),(?![^"]*"\B)/gi,
            replace: " ",
        },
        {
            regex: /^BR$/gi,
            replace: "BRnzp",
        },

        // We are going to add our trap vectors here as
        // well, as they are really just aliases.
        {
            regex: /GETC/gi,
            replace: "TRAP 0x20",
        },
        {
            regex: /OUT/gi,
            replace: "TRAP 0x21",
        },
        {
            regex: /PUTS/gi,
            replace: "TRAP 0x22",
        },
        {
            regex: /IN/gi,
            replace: "TRAP 0x23",
        },
        {
            regex: /PUTSP/gi,
            replace: "TRAP 0x24",
        },
        {
            regex: /HALT/gi,
            replace: "TRAP 0x25",
        },

        // And also RET because it is just a JSR with
        // a different register.
        {
            regex: /RET/gi,
            replace: "JMP R7",
        },
    ],

    matches: {
        ADD: {
            type: "instruction",
            regex: /^(ADD)/i,
        },
        AND: {
            type: "instruction",
            regex: /^(AND)/i,
        },
        BR: {
            type: "instruction",
            regex: /^(BR(n|z|p){0,3})/i,
        },
        JMP: {
            type: "instruction",
            regex: /^(JMP)/i,
        },
        JSR: {
            type: "instruction",
            regex: /^(JSR)/i,
        },
        JSRR: {
            type: "instruction",
            regex: /^(JSRR)/i,
        },
        LD: {
            type: "instruction",
            regex: /^(LD)/i,
        },
        LDI: {
            type: "instruction",
            regex: /^(LDI)/i,
        },
        LDR: {
            type: "instruction",
            regex: /^(LDR)/i,
        },
        LEA: {
            type: "instruction",
            regex: /^(LEA)/i,
        },
        NOT: {
            type: "instruction",
            regex: /^(NOT)/i,
        },
        RTI: {
            type: "instruction",
            regex: /^(RTI)/i,
        },
        ST: {
            type: "instruction",
            regex: /^(ST)/i,
        },
        STI: {
            type: "instruction",
            regex: /^(STI)/i,
        },
        STR: {
            type: "instruction",
            regex: /^(STR)/i,
        },
        TRAP: {
            type: "instruction",
            regex: /^(TRAP)/i,
        },

        ".ORIG": {
            type: "directive",
            regex: /^(.ORIG)/i,
        },
        ".END": {
            type: "directive",
            regex: /^(.END)/i,
        },
        ".FILL": {
            type: "directive",
            regex: /^(.FILL)/i,
        },
        ".BLKW": {
            type: "directive",
            regex: /^(.BLKW)/i,
        },
        ".STRINGZ": {
            type: "directive",
            regex: /^(.STRINGZ)/i,
        },
    },
};

interface RegexMatcher {
    mutations: {
        regex: RegExp;
        replace: string;
    }[];

    matches: Record<
        ASMInstruction | ASMDirective,
        {
            type: "instruction" | "directive";
            regex: RegExp;
        }
    >;
}

export type ASMDirective = ".ORIG" | ".END" | ".FILL" | ".BLKW" | ".STRINGZ";
export type ASMInstruction =
    | "ADD"
    | "AND"
    | "BR"
    | "JMP"
    | "JSR"
    | "JSRR"
    | "LD"
    | "LDI"
    | "LDR"
    | "LEA"
    | "NOT"
    | "RTI"
    | "ST"
    | "STI"
    | "STR"
    | "TRAP";
