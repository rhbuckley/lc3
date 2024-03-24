import {
    Content,
    Heading,
    BinaryInstruction,
    Code,
    LC3Code,
} from "~/components/DocComponents";

export default function JSRInstruction() {
    return (
        <Content>
            <Heading level={3}>JSR Instruction</Heading>
            <p>
                The JSR (Jump to Subroutine) instruction is used to transfer
                control to a subroutine. It saves the address of the next
                instruction in register R7 (the link register) before jumping to
                the specified target address.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the JSR instruction is as follows:</p>

            <BinaryInstruction
                opcode="0100"
                bits={[
                    { size: 1, value: "1" },
                    { size: 11, value: "PCoffset11" },
                ]}
            />

            <p>The 1 in bit 11 differentiates JSR from JSRR</p>

            <p>Where:</p>
            <ul className="flex flex-col gap-4">
                <li>
                    <Code>PCoffset11</Code>: Specifies the 11-bit signed offset
                    value to calculate the target address relative to the
                    current program counter (PC). It allows jumps within a range
                    of -1024 to 1023 instructions.
                </li>
            </ul>

            <LC3Code
                lines={[
                    "JSR PCoffset11 ; This instruction transfers control to the subroutine located at the address calculated by adding the signed offset value to the current program counter (PC). It saves the address of the next instruction in register R7.",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the JSR instruction:</p>
            <ol>
                <li>
                    Calculate the signed offset value to specify the target
                    subroutine relative to the current program counter (PC).
                </li>
                <li>
                    Execute the JSR instruction, specifying the calculated
                    offset.
                </li>
                <li>
                    Control will be transferred to the subroutine located at the
                    calculated address, and the address of the next instruction
                    will be saved in register R7.
                </li>
            </ol>

            <p>
                The JSR instruction is commonly used for implementing function
                calls and subroutines in LC-3 assembly language.
            </p>
        </Content>
    );
}
