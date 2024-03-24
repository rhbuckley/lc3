import { Code, Content, Heading, LC3Code } from "~/components/DocComponents";
import type { SectionProps } from "..";
import JSRInstruction from "~/app/docs/sections/opcodes/JSR";

export default function RoutinesSection({ title, href }: SectionProps) {
    return (
        <Content>
            <Heading level={2} id={href}>
                {title}
            </Heading>

            <Content>
                <p>
                    To call a function, we use the <code>JSR</code> instruction.
                    This instruction jumps to the address of the function, and
                    stores the address of the next instruction in register 7.
                </p>
                <p>
                    To return from a function, we use the <code>RET</code>{" "}
                    instruction. This instruction jumps to the address stored in
                    register 7.
                </p>

                <p>Below, you can find the JSR instruction description:</p>
                <JSRInstruction />

                <Heading level={3}>Example</Heading>
                <p>
                    Below is an example of calling a function using the{" "}
                    <code>JSR</code> instruction.
                </p>

                <LC3Code
                    lines={[
                        "JSR myFunction ; Call the function myFunction",
                        "HALT",
                    ]}
                />

                <p>
                    Upon running this function, the PC will jump current to
                    myFunction back to current when <Code>RET</Code> is called
                </p>

                <p className="bg-red-500/20 p-4 rounded-xl border-red-500 border-2">
                    <strong>Warning: </strong> You can call JSR from a
                    subroutine, but you must store the return address in R7
                    before calling JSR. Otherwise, the return address will be
                    lost, and your program will not be able to return to the
                    correct location.
                </p>
            </Content>
        </Content>
    );
}
