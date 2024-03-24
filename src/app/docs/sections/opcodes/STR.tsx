import {
    Heading,
    Content,
    BinaryInstruction,
    LC3Code,
    Code,
} from "~/components/DocComponents";

export default function STRInstruction() {
    return (
        <Content>
            <Heading level={3}>STR Instruction</Heading>
            <p>
                The STR (Store Indirect) instruction is used to store the
                contents of a register into a memory location specified
                indirectly by the value in another register, which serves as a
                pointer.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the STR instruction is as follows:</p>

            <BinaryInstruction
                opcode="0111"
                bits={[
                    { size: 3, value: "SR" },
                    { size: 3, value: "BaseR" },
                    { size: 6, bits: [0, 0, 0, 0, 0, 0] },
                ]}
            />

            <p>Where:</p>
            <ul className="flex flex-col gap-4">
                <li>
                    <Code>SR</Code>: Specifies the source register whose
                    contents will be stored in memory. It is a 3-bit field
                    representing one of the eight general-purpose registers
                    (R0-R7).
                </li>
                <li>
                    <Code>BaseR</Code>: Specifies the base register, which holds
                    the base address for memory storage. It is a 3-bit field
                    representing one of the eight general-purpose registers
                    (R0-R7).
                </li>
            </ul>

            <LC3Code
                lines={[
                    "STR SR, BaseR ; This instruction stores the contents of the source register (SR) into memory at the address specified by the value in the base register (BaseR).",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the STR instruction:</p>
            <ol>
                <li>
                    Load the base register (BaseR) with the address of the
                    memory location where you want to store the data.
                </li>
                <li>
                    Load the source register (SR) with the data you want to
                    store.
                </li>
                <li>Execute the STR instruction.</li>
                <li>
                    The contents of the source register (SR) will be stored in
                    memory at the address specified by the value in the base
                    register (BaseR).
                </li>
            </ol>

            <p>
                The STR instruction is useful for storing data indirectly
                through a pointer in LC-3 assembly language.
            </p>
        </Content>
    );
}
