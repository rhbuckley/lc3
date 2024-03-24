import { Monaco } from "@monaco-editor/react";
import { LC3LanguageID, directives, opcodes, trapCodes } from "../const";

const directivesRegex = new RegExp(
    `(${directives.map((d) => d.replace(".", "\\.")).join("|")})`,
    "g"
);

const trapCodesRegex = new RegExp(`(${trapCodes.join("|")})`, "g");

export const registerLC3TokensProvider = (monaco: Monaco) => {
    monaco.languages.setMonarchTokensProvider(LC3LanguageID, {
        keywords: opcodes,
        tokenizer: {
            root: [
                // Firstly, we are going to look for labels. The reason we
                // check this first, is because labels end in colons, and
                // we need to look for them first.
                [/^[A-Za-z][A-Za-z0-9]*:/, "type"],

                // Next, we are going to look for directives. We are going to
                // use a regular expression to match all the directives, and
                // then we are going to use the "keyword" token type to highlight
                // them.
                [directivesRegex, "metatag"],

                // Now, we are going to look for the trap codes. We are going to
                // use a regular expression to match all the trap codes, and
                // then we are going to use the "keyword" token type to highlight
                // them.
                [trapCodesRegex, "keyword"],

                // Next, we are going to look for registers. We are going to use
                // the "type" token type to highlight them.
                [/R[0-7]/, "variable.parameter"],

                // Finally, we are looking for opcodes. We are going to use the
                // the "keyword" token type to highlight them.
                [
                    /@?[a-zA-Z][\w$]*/,
                    {
                        cases: {
                            "@keywords": "keyword",
                            "@default": "identifier",
                        },
                    },
                ],

                // This is just basic syntax highlighting for strings and comments.
                [/".*?"/, "string"],
                [/;(.*)$/, "comment"],
            ],
        },
    });
};
