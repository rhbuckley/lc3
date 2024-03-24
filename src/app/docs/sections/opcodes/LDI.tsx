import {
    Heading,
    Content,
    BinaryInstruction,
    Code,
    LC3Code,
} from "~/components/DocComponents";

export default function LDIInstruction() {
    return (
        <Content>
            <Heading level={3}>LDI Instruction</Heading>
            <p>
                The LDI (Load Indirect) instruction is used to load a value from
                memory indirectly into a register. It retrieves the value stored
                at the memory location specified by the sum of the current
                program counter (PC) and an offset, and stores that value in a
                register.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the LDI instruction is as follows:</p>

            <BinaryInstruction
                opcode="1010"
                bits={[
                    { size: 3, value: "DR" },
                    { size: 9, value: "PCoffset9" },
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
                    <Code>PCoffset9</Code>: Specifies the 9-bit signed offset
                    value to calculate the memory address relative to the
                    current program counter (PC). It allows loading from memory
                    within a range of -256 to 255 words.
                </li>
            </ul>

            <LC3Code
                lines={[
                    "LDI DR, PCoffset9 ; This instruction loads a value from memory indirectly into the specified destination register (DR), using the memory address calculated by adding the signed offset value to the current program counter (PC).",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the LDI instruction:</p>
            <ol>
                <li>
                    Calculate the signed offset value to specify the memory
                    address relative to the current program counter (PC).
                </li>
                <li>
                    Execute the LDI instruction, specifying the destination
                    register (DR) and the calculated offset.
                </li>
                <li>
                    The value from memory at the address obtained by adding the
                    offset to the current PC will be loaded indirectly into the
                    specified destination register (DR).
                </li>
            </ol>

            <p>
                The LDI instruction is commonly used for loading data or
                addresses indirectly from memory into registers in LC-3 assembly
                language.
            </p>
        </Content>
    );
}
