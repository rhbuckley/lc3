import { Monaco } from "@monaco-editor/react";
import { registerLC3HoverProvider } from "./providers/hover";

import { LC3LanguageID } from "./const";
import { registerLC3TokensProvider } from "./providers/tokens";
import { registerLC3AutocompleteProvider } from "./providers/autocomplete";
export { LC3LanguageID };

// const opcodeTokens = {
//     ADD: ["opcode", "DR", "SR1", "SR2"],
//     AND: ["opcode", "DR", "SR1", "SR2"],
//     BR: ["opcode", "n", "z", "p", "PCoffset9"],
//     JMP: ["opcode", "BaseR"],
//     JSR: ["opcode", "PCoffset11"],
//     JSRR: ["opcode", "BaseR"],
//     LD: ["opcode", "DR", "PCoffset9"],
//     LDI: ["opcode", "DR", "PCoffset9"],
//     LDR: ["opcode", "DR", "BaseR", "offset6"],
//     LEA: ["opcode", "DR", "PCoffset9"],
//     NOT: ["opcode", "DR", "SR"],
//     RET: ["opcode"],
//     RTI: ["opcode"],
//     ST: ["opcode", "SR", "PCoffset9"],
//     STI: ["opcode", "SR", "PCoffset9"],
//     STR: ["opcode", "SR", "BaseR", "offset6"],
//     TRAP: ["opcode", "trapvect8"],
// };

export function registerLC3Language(monaco: Monaco) {
    const id = LC3LanguageID;

    // 1. Register the language
    monaco.languages.register({ id });

    // 2. Register a tokens provider for the language
    registerLC3TokensProvider(monaco);

    // 3. Allow Autocomplete
    registerLC3AutocompleteProvider(monaco);

    // add documentation
    registerLC3HoverProvider(monaco);
}

const getKeywords = (line: string) => {
    // ignore labels
    const words = line.split(":");
    if (words.length > 1) {
        return words[1].split(" ").filter((w) => w !== "");
    }

    return words[0].split(" ").filter((w) => w !== "");
};
