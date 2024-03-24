import {
    Heading,
    Content,
    BinaryInstruction,
    Code,
    LC3Code,
} from "~/components/DocComponents";

export default function LDRInstruction() {
    return (
        <Content>
            <Heading level={3}>LDR Instruction</Heading>
            <p>
                The LDR (Load Base + Offset) instruction is used to load a value
                from memory into a register. It calculates the memory address by
                adding an offset to the contents of a base register and
                retrieves the value stored at that address.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the LDR instruction is as follows:</p>

            <BinaryInstruction
                opcode="0110"
                bits={[
                    { size: 3, value: "DR" },
                    { size: 3, value: "BaseR" },
                    { size: 6, value: "offset6" },
                ]}
            />

            <p>Where:</p>
            <ul className="flex flex-col gap-4">
                <li>
                    <Code>DR</Code>: Specifies the destination register where
                    the loaded value will be stored. It is a 3-bit field
                    representing one of the eight general-purpose registers
                    (R0-R7).
                </li>
                <li>
                    <Code>BaseR</Code>: Specifies the base register containing
                    the base address. It is a 3-bit field representing one of
                    the eight general-purpose registers (R0-R7).
                </li>
                <li>
                    <Code>offset6</Code>: Specifies the 6-bit signed offset
                    value to calculate the memory address relative to the
                    contents of the base register. It allows loading from memory
                    within a range of -32 to 31 words.
                </li>
            </ul>

            <LC3Code
                lines={[
                    "LDR DR, BaseR, offset6 ; This instruction loads a value from memory into the specified destination register (DR), using the memory address calculated by adding the signed offset value to the contents of the base register (BaseR).",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the LDR instruction:</p>
            <ol>
                <li>Load the base address into a base register (BaseR).</li>
                <li>
                    Calculate the signed offset value to specify the memory
                    address relative to the contents of the base register.
                </li>
                <li>
                    Execute the LDR instruction, specifying the destination
                    register (DR), the base register (BaseR), and the calculated
                    offset.
                </li>
                <li>
                    The value from memory at the address obtained by adding the
                    offset to the contents of the base register will be loaded
                    into the specified destination register (DR).
                </li>
            </ol>

            <p>
                The LDR instruction is commonly used for loading data from
                memory into registers in LC-3 assembly language when the address
                is calculated dynamically based on the contents of a base
                register.
            </p>
        </Content>
    );
}
