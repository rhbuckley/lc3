import { Content, Section, Heading, Code } from "~/components/DocComponents";
import type { SectionProps } from "..";

export default function GettingStartedSection({ title, href }: SectionProps) {
    return (
        <Section>
            <Heading level={2} id={href}>
                {title}
            </Heading>
            <Content>
                <p>
                    The LC-3 Assembly Language is a low-level programming
                    language, that focuses on teaching students how assembly
                    works. It is a good idea to have some experience with
                    programming before learning the LC-3 Assembly Language.
                </p>
                <p>
                    If you are new to programming, it is recommended to start
                    with a higher-level language such as Python or JavaScript,
                    but no experience is required.
                </p>
                <p>
                    Well, let&apos;s get started. The first thing that you need
                    to understand is that unlike high-level languages, LC-3
                    Language is a low-level language. This means that there are
                    no <Code>if</Code> statements, <Code>for</Code> loops, or{" "}
                    <Code>while</Code> loops. Instead, you will work directly
                    with memory, and registers, which are used to store data.
                </p>
                <p>
                    So what are registers? Well, a simple google search (I did
                    it for you) tells us that a register is a a type of computer
                    memory built directly into the processor or CPU (Central
                    Processing Unit) that is used to store and manipulate data
                    during the execution of instructions.
                </p>

                <Heading level={3}>Instructions</Heading>
                <p>
                    In higher level languages, you use a given syntax to easily
                    perform tasks. In LC-3, you give the computer operations
                    (instructions) to complete. These instructions are limited
                    in number. In the next section, we will see opcodes, which
                    represent these instructions.
                </p>
                <p>
                    A good analogy for the LC-3 language is trying to use a
                    four-function calculator to solve a complicated algebraic
                    problem. It is possible, however it is not as easy as using
                    a graphing calculator.
                </p>
                <p>
                    Assembly languages directly interface (communicate) with
                    hardware, which means that all the instructions that you
                    provide will be stored in registers, and memory. For
                    example, a multiplexer (MUX) may be used to select the
                    appropriate task to be performed based on the opcode.
                </p>
            </Content>
        </Section>
    );
}
