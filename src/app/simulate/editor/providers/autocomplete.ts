import { Monaco } from "@monaco-editor/react";
import {
    LC3LanguageID,
    directives,
    opcodes,
    registers,
    trapCodes,
} from "../const";

const directivesNoOrig = directives.filter((d) => d != ".ORIG");

export const registerLC3AutocompleteProvider = (monaco: Monaco) => {
    monaco.languages.registerCompletionItemProvider(LC3LanguageID, {
        triggerCharacters: ["."],
        provideCompletionItems: (model, position) => {
            // there are four things that we need to autocomplete:
            // - opcodes
            // - directives
            // - registers
            // - labels

            const word = model.getWordAtPosition(position);
            if (word === null) {
                // there is no word at the current position. The preceding character must
                // be a dot, so we should suggest the directives
                const includeOrig =
                    position.lineNumber < 10 &&
                    !model.getValue().includes(".ORIG");

                // if the line is less than 10, we should suggest the .ORIG directive
                const _directives = includeOrig ? directives : directivesNoOrig;
                const suggestions = _directives.map((d) => ({
                    label: d,
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: d,
                    range: {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: 0,
                        endColumn: d.length,
                    },
                }));

                // include the .ORIG x3000 snippet if the line is less than 10
                if (includeOrig) {
                    suggestions.push({
                        label: ".ORIG x3000",
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ".ORIG x3000",
                        range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: 0,
                            endColumn: ".ORIG x3000".length,
                        },
                    });
                }

                return { suggestions };
            }

            const line = model.getLineContent(position.lineNumber);
            const keywords = [
                ...opcodes,
                ...directives,
                ...registers,
                ...trapCodes,
            ];
            const opcode = keywords.find((d) => line.includes(d));

            // there is no opcode, let's suggest one
            if (!opcode) {
                return {
                    suggestions: [
                        ...keywords.map((d) => ({
                            label: d,
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: d,
                            range: {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: word?.startColumn || 0,
                                endColumn: word?.endColumn || d.length,
                            },
                        })),
                    ],
                };
            }
            return { suggestions: [] };
        },
    });
};
