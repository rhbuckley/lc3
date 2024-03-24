export const OpcodeReference = () => {
    return (
        <div className="flex flex-col gap-4">
            {opcodesInReference.map((opcode, i) => (
                <div
                    key={i}
                    className="flex gap-2 flex-col items-start p-2 rounded-md"
                >
                    <div className="col-span-16 font-mono text-xl">
                        {opcode.opcode}
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-md font-mono w-full flex flex-col border-black border-2">
                        <div
                            className="grid place-content-center text-xs font-mono p-2 pb-0 border-b-2 border-black"
                            style={{ gridTemplateColumns: `repeat(16, 1fr)` }}
                        >
                            {new Array(16).fill(0).map((_, j) => (
                                <div
                                    key={j}
                                    className="last:border-0 border-r-2 border-gray-400 dark:border-gray-600 w-full text-center pb-[5px]"
                                >
                                    {16 - j}
                                </div>
                            ))}
                        </div>
                        <div
                            className="grid place-items-center text-sm p-2 pt-0"
                            style={{ gridTemplateColumns: `repeat(16, 1fr)` }}
                        >
                            {opcode.tokens.map((token, j) => (
                                <div
                                    key={j}
                                    className="text-center last:border-0 border-r-2 border-gray-400 dark:border-gray-600 w-full py-[5px]"
                                    style={{
                                        gridColumn: `auto / span ${opcode.tokenSize[j]}`,
                                    }}
                                >
                                    {token}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        {opcode.description.map((desc, j) => (
                            <p key={j} className="">
                                {desc}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// There are some duplicate opcodes here, for instance,
// switching the mode of AND
const opcodesInReference = [
    {
        opcode: "ADD",
        tokens: ["0001", "DR", "SR1", "0", "00", "SR2"],
        tokenSize: [4, 3, 3, 1, 2, 3],
        description: [
            "DR <- SR1 + SR2",
            "Bit 5 is 0 for register mode, 1 for immediate mode",
        ],
    },
    {
        opcode: "ADD",
        tokens: ["0001", "DR", "SR1", "1", "imm5"],
        tokenSize: [4, 3, 3, 1, 5],
        description: [
            "DR <- SR1 + imm5",
            "Bit 5 is 0 for register mode, 1 for immediate mode",
        ],
    },
    {
        opcode: "AND",
        tokens: ["0101", "DR", "SR1", "0", "00", "SR2"],
        tokenSize: [4, 3, 3, 1, 2, 3],
        description: [
            "DR <- SR1 & SR2",
            "Bit 5 is 0 for register mode, 1 for immediate mode",
        ],
    },
    {
        opcode: "AND",
        tokens: ["0101", "DR", "SR1", "1", "imm5"],
        tokenSize: [4, 3, 3, 1, 5],
        description: [
            "DR <- SR1 & imm5",
            "Bit 5 is 0 for register mode, 1 for immediate mode",
        ],
    },
    {
        opcode: "NOT",
        tokens: ["1001", "DR", "SR1", "111111"],
        tokenSize: [4, 3, 3, 6],
        description: ["DR <- NOT SR1", "Bit 5-0 are unused, must be 1"],
    },
    {
        opcode: "BR",
        tokens: ["0000", "n", "z", "p", "PCoffset9"],
        tokenSize: [4, 1, 1, 1, 9],
        description: [
            "if (n & N) || (z & Z) || (p & P) then PC <- PC + PCoffset9",
            "Bit 11-9 are unused, must be 0",
        ],
    },
    {
        opcode: "JMP",
        tokens: ["1100", "BaseR"],
        tokenSize: [4, 3],
        description: ["PC <- BaseR", "Bits 11-0 are unused, must be 0"],
    },
    {
        opcode: "JSR",
        tokens: ["0100", "1", "PCoffset11"],
        tokenSize: [4, 1, 11],
        description: [
            "R7 <- PC; PC <- PC + PCoffset11",
            "Bit 15 is 1 for JSR, 0 for JSRR",
        ],
    },
    {
        opcode: "JSRR",
        tokens: ["0100", "0", "BaseR"],
        tokenSize: [4, 1, 3],
        description: [
            "R7 <- PC; PC <- BaseR",
            "Bit 15 is 1 for JSR, 0 for JSRR",
        ],
    },
    {
        opcode: "LD",
        tokens: ["0010", "DR", "PCoffset9"],
        tokenSize: [4, 3, 9],
        description: [
            "DR <- mem[PC + PCoffset9]",
            "Bit 11-9 are unused, must be 0",
        ],
    },
    {
        opcode: "LDI",
        tokens: ["1010", "DR", "PCoffset9"],
        tokenSize: [4, 3, 9],
        description: [
            "DR <- mem[mem[PC + PCoffset9]]",
            "Bit 11-9 are unused, must be 0",
        ],
    },
    {
        opcode: "LDR",
        tokens: ["0110", "DR", "BaseR", "offset6"],
        tokenSize: [4, 3, 3, 6],
        description: [
            "DR <- mem[BaseR + offset6]",
            "Bit 11-9 are unused, must be 0",
        ],
    },
    {
        opcode: "LEA",
        tokens: ["1110", "DR", "PCoffset9"],
        tokenSize: [4, 3, 9],
        description: ["DR <- PC + PCoffset9", "Bit 11-9 are unused, must be 0"],
    },
    {
        opcode: "ST",
        tokens: ["0011", "SR", "PCoffset9"],
        tokenSize: [4, 3, 9],
        description: [
            "mem[PC + PCoffset9] <- SR",
            "Bit 11-9 are unused, must be 0",
        ],
    },
    {
        opcode: "STI",
        tokens: ["1011", "SR", "PCoffset9"],
        tokenSize: [4, 3, 9],
        description: [
            "mem[mem[PC + PCoffset9]] <- SR",
            "Bit 11-9 are unused, must be 0",
        ],
    },
    {
        opcode: "STR",
        tokens: ["0111", "SR", "BaseR", "offset6"],
        tokenSize: [4, 3, 3, 6],
        description: [
            "mem[BaseR + offset6] <- SR",
            "Bit 11-9 are unused, must be 0",
        ],
    },
    {
        opcode: "TRAP",
        tokens: ["1111", "trapvect8"],
        tokenSize: [4, 8],
        description: [
            "R7 <- PC; PC <- mem[trapvect8]",
            "Bits 15-8 of trap vector are unused, must be 0",
        ],
    },
];
