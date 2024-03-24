import { Code, Content, Heading, LC3Code } from "~/components/DocComponents";
import type { SectionProps } from "..";

export default function UsingLabelsSection({ title, href }: SectionProps) {
    return (
        <Content>
            <Heading level={2} id={href}>
                {title}
            </Heading>

            <Content>
                <p>
                    What are labels? Well, you may have seen then in other
                    higher level languages, such as <Code>GOTO</Code> statements
                    in C++. When these <Code>GOTO</Code> statements are
                    executed, they jump to a sepecific line in the code, a
                    certain address in the memory.
                </p>

                <Heading level={3}>Defining Labels</Heading>
                <p>
                    Labels do not have to be used, but they will certainly make
                    your life a lot easier. To define a label, you simply write
                    a alphanumeric word, that is not a reserved word, or a
                    number, followed by a colon. For example:
                </p>
                <LC3Code lines={["myLabel: TRAP x21"]} />

                <p>
                    Doing this allows us to more easily reference this line of
                    code.
                </p>

                <Heading level={3}>Using Labels</Heading>
                <p>
                    To use a label, you simply write the label name. For
                    example, let&apos;s load the value stored at the address
                    pointed to by the label <Code>myLabel</Code> into register
                    0:
                </p>
                <LC3Code lines={["LD R0, myLabel"]} />

                <Heading level={3}>Flow Control</Heading>
                <p>
                    With labels, we can also jump to other lines of code. It is
                    important to note though, however, we must still ensure that
                    our labels are within the allowed range of the{" "}
                    <Code>BR</Code> instruction.
                </p>
                <LC3Code
                    lines={["BRnzp myLabel ; This jumps to the label myLabel"]}
                />

                <Heading level={3}>Symbol Table / Caveats</Heading>
                <p>
                    Labels are here to help us, but they DO NOT EXIST in the
                    compiled code. Labels cannot be used in binary or hex, and
                    exist for the sole purpose of making our lives easier.
                </p>
                <p>
                    In the process of compiling assembly language code to LC-3
                    code, a symbol table is created. Inside the symbol table,
                    the address of the label is stored, and all instances of the
                    label are replaced with the appropriate address or offset.
                </p>
            </Content>
        </Content>
    );
}
