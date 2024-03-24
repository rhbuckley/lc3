import {
    Heading,
    Content,
    BinaryInstruction,
    Code,
    LC3Code,
} from "~/components/DocComponents";

export default function NOTInstruction() {
    return (
        <Content>
            <Heading level={3}>NOT Instruction</Heading>
            <p>
                The NOT (Bitwise NOT) instruction is used to perform a bitwise
                negation (complement) operation on the contents of a register
                and store the result in another register.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the NOT instruction is as follows:</p>

            <BinaryInstruction
                opcode="1001"
                bits={[
                    { size: 3, value: "DR" },
                    { size: 3, value: "SR" },
                    { size: 6, bits: [0, 0, 0, 0, 0, 0] },
                ]}
            />

            <p>Where:</p>
            <ul className="flex flex-col gap-4">
                <li>
                    <Code>DR</Code>: Specifies the destination register where
                    the result of the bitwise NOT operation will be stored. It
                    is a 3-bit field representing one of the eight
                    general-purpose registers (R0-R7).
                </li>
                <li>
                    <Code>SR</Code>: Specifies the source register whose
                    contents will be negated. It is a 3-bit field representing
                    one of the eight general-purpose registers (R0-R7).
                </li>
            </ul>

            <LC3Code
                lines={[
                    "NOT DR, SR ; This instruction performs a bitwise NOT operation on the contents of the source register (SR) and stores the result in the destination register (DR).",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the NOT instruction:</p>
            <ol>
                <li>
                    Specify the source register (SR) whose contents you want to
                    negate.
                </li>
                <li>
                    Specify the destination register (DR) where you want to
                    store the result of the bitwise NOT operation.
                </li>
                <li>Execute the NOT instruction.</li>
                <li>
                    The bitwise NOT operation will be performed on the contents
                    of the source register (SR), and the result will be stored
                    in the destination register (DR).
                </li>
            </ol>

            <p>
                The NOT instruction is commonly used for bitwise manipulation
                and logical operations in LC-3 assembly language.
            </p>
        </Content>
    );
}
