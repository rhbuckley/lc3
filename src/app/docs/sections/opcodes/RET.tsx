import {
    Heading,
    Content,
    BinaryInstruction,
} from "~/components/DocComponents";

export default function RETInstruction() {
    return (
        <Content>
            <Heading level={4}>RET Instruction</Heading>
            <p>
                In LC-3 assembly language, the RET (Return) instruction is not a
                valid instruction, it is just an alias for JMP R7.
            </p>

            <Heading level={5}>Usage</Heading>
            <p>To return from a subroutine (implementing RET):</p>
            <ol>
                <li>
                    During the subroutine&apos;s execution, the JSR (Jump to
                    Subroutine) instruction is used to call the subroutine,
                    which automatically stores the return address (address of
                    the next instruction) in the link register (R7).
                </li>
                <li>
                    When it&apos; time to return from the subroutine:
                    <ol type="a">
                        <li>
                            Load the contents of the link register (R7) into the
                            program counter (PC) using a BR (Branch)
                            instruction, effectively directing the program
                            execution back to the instruction following the
                            subroutine call.
                        </li>
                    </ol>
                </li>
            </ol>

            <BinaryInstruction
                opcode="1100"
                bits={[
                    { size: 3, bits: [0, 0, 0] },
                    { size: 3, bits: [1, 1, 1] },
                    { size: 6, bits: [0, 0, 0, 0, 0, 0] },
                ]}
            />

            <p>
                By loading the link register (R7) into the program counter (PC),
                the program resumes execution from the point where the
                subroutine was called, effectively achieving the functionality
                of a RET instruction.
            </p>
        </Content>
    );
}
