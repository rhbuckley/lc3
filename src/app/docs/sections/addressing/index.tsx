import { Content, Section, Heading, Code } from "~/components/DocComponents";
import type { SectionProps } from "..";

export default function AddresssingSection({ title, href }: SectionProps) {
    return (
        <Section>
            <Heading level={2} id={href}>
                {title}
            </Heading>

            <Content>
                <p>
                    This was largely discussed above, but there are a few more
                    important things to note about addressing in a LC-3 program.
                    One large issue in assembly language is that in large
                    programs, it can become very complicated to manage the
                    control flow. That is, to try to jump to a line that has a
                    PC offset of a value greater than the maximum offset that
                    can be stored in a 9-bit signed integer. This is where the{" "}
                    <Code>JSR</Code> and <Code>JSRR</Code> instructions come in
                    handy.
                </p>
                <p>
                    To solve this problem, the best idea is to store the address
                    of the location that needs to be jumped to n a word (memory
                    location). If you are familiar with C, this is a pointer. We
                    are making a pointer in assembly. This is where the{" "}
                    <Code>LEA</Code> and <Code>ST</Code> instructions come into
                    play.
                </p>
                <p>
                    This is one approach to this problem, but there are other
                    ways to solve this problem. For example, you could use a
                    register to store the address of the location that needs to
                    be jumped to. This is where the <Code>JSRR</Code>{" "}
                    instruction comes in.
                </p>

                <Heading level={3}>Addressing Modes</Heading>
                <p>
                    Addressing modes are a way to specify the operand of an
                    instruction. There are 2 addressing modes in LC-3 that we
                    have discussed above. They are:
                </p>

                <ul className="flex flex-col gap-5">
                    <li>
                        <Code>direct</Code> - with the direct addressing mode,
                        we use only registers to perform an operation
                    </li>
                    <li>
                        <Code>indirect</Code> - with the indirect addressing
                        mode, we use a register that contains the address of the
                        memory location that contains the address of the memory
                        location that contains the data that we want to use.
                    </li>
                </ul>
            </Content>
        </Section>
    );
}
