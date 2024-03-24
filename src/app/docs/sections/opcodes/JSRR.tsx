import {
    Content,
    Heading,
    BinaryInstruction,
    Code,
    LC3Code,
} from "~/components/DocComponents";

export default function JSRRInstruction() {
    return (
        <Content>
            <Heading level={3}>JSRR Instruction</Heading>
            <p>
                The JSRR (Jump to Subroutine Register) instruction is used to
                transfer control to a subroutine whose address is stored in a
                register. It saves the address of the next instruction in
                register R7 (the link register) before jumping to the target
                address specified by the register.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the JSRR instruction is as follows:</p>

            <BinaryInstruction
                opcode="0100"
                bits={[
                    { size: 1, value: "0" },
                    { size: 2, bits: [0, 0] },
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
                    "JSRR BaseR ;  This instruction transfers control to the subroutine located at the address stored in the specified register (BaseR). It saves the address of the next instruction in register R7.",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the JSRR instruction:</p>
            <ol>
                <li>
                    Load the target address of the subroutine into one of the
                    general-purpose registers (R0-R7).
                </li>
                <li>
                    Execute the JSRR instruction, specifying the register
                    containing the target address.
                </li>
                <li>
                    Control will be transferred to the subroutine located at the
                    address stored in the specified register, and the address of
                    the next instruction will be saved in register R7.
                </li>
            </ol>

            <p>
                The JSRR instruction is commonly used for implementing function
                calls and subroutines in LC-3 assembly language when the address
                of the subroutine is calculated dynamically or stored in a
                register.
            </p>
        </Content>
    );
}
