import {
    Content,
    Heading,
    BinaryInstruction,
    Code,
    LC3Code,
} from "~/components/DocComponents";

export default function JRInstruction() {
    return (
        <Content>
            <Heading level={3}>JMP Instruction</Heading>
            <p>
                The JMP (Jump Register) instruction is used to transfer control
                to the address stored in a register. Unlike the BR instruction,
                which uses an offset to calculate the new address, the JMP
                instruction directly uses the value stored in a register as the
                target address.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the JR instruction is as follows:</p>

            <BinaryInstruction
                opcode="1100"
                bits={[
                    { size: 3, bits: [0, 0, 0] },
                    { size: 3, value: "BaseR" },
                    { size: 6, bits: [0, 0, 0, 0, 0, 0] },
                ]}
            />

            <p>Where:</p>
            <ul className="flex flex-col gap-4">
                <li>
                    <Code>BaseR</Code>: Specifies the register containing the
                    target address. It is a 3-bit field representing one of the
                    eight general-purpose registers (R0-R7).
                </li>
            </ul>

            <LC3Code
                lines={[
                    "JMP BaseR ; This instruction transfers control to the address stored in the specified register (BaseR).",
                ]}
            />
            <Heading level={4}>Usage</Heading>
            <p>To use the JMP instruction:</p>
            <ol>
                <li>
                    Load the target address into one of the general-purpose
                    registers (R0-R7).
                </li>
                <li>
                    Execute the JMP instruction, specifying the register
                    containing the target address.
                </li>
                <li>
                    Control will be transferred to the address stored in the
                    specified register.
                </li>
            </ol>

            <p>
                The JMP instruction is commonly used for implementing function
                calls and returning from subroutines in LC-3 assembly language.
            </p>
        </Content>
    );
}
