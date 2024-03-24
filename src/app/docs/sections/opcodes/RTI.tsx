import {
    Heading,
    Content,
    BinaryInstruction,
    LC3Code,
    Code,
} from "~/components/DocComponents";

export default function RTIInstruction() {
    return (
        <Content>
            <Heading level={3}>RTI Instruction</Heading>
            <p>
                The RTI (Return from Interrupt) instruction is used to return
                from an interrupt service routine (ISR) and resume the
                interrupted program&apos;s execution.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the RTI instruction is as follows:</p>

            <BinaryInstruction
                opcode="1000"
                bits={[
                    {
                        size: 12,
                        bits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                ]}
            />

            <p>Where:</p>
            <ul className="flex flex-col gap-4">
                <li>
                    The opcode <Code>1000</Code> signifies the RTI instruction.
                </li>
                <li>The remaining bits are unused and reserved.</li>
            </ul>

            <LC3Code
                lines={[
                    "RTI ;  This instruction returns from an interrupt service routine (ISR) and resumes the interrupted program's execution.",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the RTI instruction:</p>
            <ol>
                <li>
                    When an interrupt occurs and the processor begins executing
                    the ISR, the interrupt service routine needs to save the
                    processor state, including registers and program counter
                    (PC).
                </li>
                <li>
                    During the ISR execution, the RTI instruction is used to
                    return from the interrupt, restoring the saved processor
                    state and continuing the execution of the interrupted
                    program.
                </li>
            </ol>

            <p>
                The RTI instruction is essential for managing interrupts and
                ensuring proper execution flow in embedded systems and real-time
                applications.
            </p>
        </Content>
    );
}
