import {
    Content,
    Heading,
    BinaryInstruction,
    Code,
    LC3Code,
} from "~/components/DocComponents";

export default function BRInstruction() {
    return (
        <Content>
            <Heading level={3}>BR Instruction</Heading>
            <p>
                The BR (Branch) instruction is used for conditional branching in
                LC-3 assembly language. It allows the program to change the flow
                of execution based on the condition of the specified
                register&apos;s contents. The BR instruction supports various
                conditions: N (negative), Z (zero), and P (positive).
            </p>

            <Heading level={4}>Format</Heading>
            <p>The general format of the BR instruction is as follows:</p>

            <BinaryInstruction
                opcode="0000"
                bits={[
                    { size: 3, value: "NZP" },
                    { size: 9, value: "PCoffset9" },
                ]}
            />

            <p>Where:</p>
            <ul className="flex flex-col gap-4">
                <li>
                    <Code>NZP</Code>: Specifies the condition(s) under which the
                    branch occurs. It is a combination of three bits, where each
                    bit represents a condition (N for negative, Z for zero, P
                    for positive).
                </li>
                <li>
                    <Code>PCoffset9</Code>: Specifies the offset value to be
                    added to the program counter (PC) if the condition(s) are
                    met. It is a 9-bit signed offset, allowing branches within a
                    range of -256 to 255 instructions. Labels are typically used
                    here, but it is important to know that the label must be
                    within the range of -256 to 255 instructions.
                </li>
            </ul>

            <LC3Code
                lines={[
                    "BR NZP, offset ; This instruction branches to the specified offset if the specified condition(s) are met.",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the BR instruction:</p>
            <ol>
                <li>
                    Ensure that a value is assigned to <Code>R0</Code>, as the
                    BR instruction checks if <Code>R0</Code> is positive,
                    negative, or zero. If <Code>R0</Code> is positive, the P
                    flag is set. If <Code>R0</Code> is negative, the N flag is
                    set. If <Code>R0</Code> is zero, the Z flag is set.
                </li>
            </ol>

            <Heading level={4}>Unconditional Branching</Heading>
            <p>
                If the BR instruction is used without any condition, the program
                counter (PC) will increment, and the program will continue
                normally. If the BR instruction is used with all conditions, the
                program will branch to the specified offset, regardless of the
                condition of the specified register.
            </p>
        </Content>
    );
}
