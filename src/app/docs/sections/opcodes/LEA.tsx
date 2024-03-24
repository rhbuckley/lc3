import {
    Heading,
    Content,
    BinaryInstruction,
    Code,
    LC3Code,
} from "~/components/DocComponents";

export default function LEAInstruction() {
    return (
        <Content>
            <Heading level={3}>LEA Instruction</Heading>
            <p>
                The LEA (Load Effective Address) instruction is used to load the
                effective address of a memory location into a register. It
                calculates the memory address and stores it in the specified
                register without actually loading the data from memory.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the LEA instruction is as follows:</p>

            <BinaryInstruction
                opcode="1110"
                bits={[
                    { size: 3, value: "DR" },
                    { size: 9, value: "PCoffset9" },
                ]}
            />

            <p>Where:</p>
            <ul className="flex flex-col gap-4">
                <li>
                    <Code>DR</Code>: Specifies the destination register where
                    the effective address will be stored. It is a 3-bit field
                    representing one of the eight general-purpose registers
                    (R0-R7).
                </li>
                <li>
                    <Code>PCoffset9</Code>: Specifies the 9-bit signed offset
                    value to calculate the memory address relative to the
                    current program counter (PC). It allows loading the
                    effective address within a range of -256 to 255 words.
                </li>
            </ul>

            <LC3Code
                lines={[
                    "LEA DR, PCoffset9 ; This instruction loads the effective address of a memory location into the specified destination register (DR), using the memory address calculated by adding the signed offset value to the current program counter (PC).",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the LEA instruction:</p>
            <ol>
                <li>
                    Calculate the signed offset value to specify the memory
                    address relative to the current program counter (PC).
                </li>
                <li>
                    Execute the LEA instruction, specifying the destination
                    register (DR) and the calculated offset.
                </li>
                <li>
                    The effective address calculated by adding the offset to the
                    current PC will be stored in the specified destination
                    register (DR).
                </li>
            </ol>

            <p>
                The LEA instruction is commonly used for loading the address of
                a memory location into a register for use in addressing modes or
                memory manipulation in LC-3 assembly language.
            </p>
        </Content>
    );
}
