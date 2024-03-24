import {
    Content,
    Section,
    Heading,
    Code,
    LC3Code,
} from "~/components/DocComponents";
import type { SectionProps } from "..";

export default function LabelsSection({ title, href }: SectionProps) {
    return (
        <Section>
            <Heading level={2} id={href}>
                {title}
            </Heading>

            <Content>
                <p>
                    Labels are very important in developing LC-3 code. Labels
                    help manage memory locations, and allow for the storage of
                    data. Labels are used to identify memory locations and to
                    specify the target of branch and jump instructions.
                </p>

                <Heading level={3}>Assembler Directives</Heading>
                <p>
                    Assembler directives are also very important, as they tell
                    the compiler to allocate memory, where the program starts,
                    and even allows the definition of strings.
                </p>

                <p>
                    We can input information into the LC-3 system in three ways.
                    Binary, Decimal and Hex. To input in binary, simply type the
                    binary number. To input in decimal, type # followed by the
                    number. To input in hex, type x followed by the number. For
                    example, #5 is 5 in decimal, and x5 is 5 in hex.
                </p>

                <p>
                    It is important that you note the maximum number that can be
                    stored in a memory location. We know that a word in LC-3 is
                    16 bits, and so the maximum number that can be stored in a
                    memory location is
                    <Code>(2^(16-1)-1)</Code>, <Code>(-2^(16-1))</Code>
                </p>

                <ul className="flex flex-col gap-5 mt-5">
                    <li>
                        <Code>.ORIG x3000</Code> - this initializes a program
                        (all code underneath will be assigned a memory location
                        after x3000), and sets the program counter (PC) to x3000
                    </li>

                    <li>
                        <Code>.END</Code> - this marks the end of a program. It
                        should be used, but may not always have an effect.{" "}
                        <span className="text-red-600">
                            Do not forget to call HALT
                        </span>
                    </li>

                    <li>
                        <Code>.BLKW #4</Code> - this allocates 4 words of
                        memory. This is very helpful for defining arrays and
                        other data structures.
                    </li>

                    <li>
                        <Code>.FILL x13</Code> - this fills a word (memory
                        location) with the value x13. This is very helpful for
                        initializing memory locations.
                    </li>

                    <li>
                        <Code>.STRINGZ &quot;hello world&quot;</Code> - this
                        creates a null-terminated string in memory. When we say
                        string, it is important that we remember that the string
                        is actually an array of characters. This is very
                        helpful, but is equivalent to using <Code>.FILL</Code>{" "}
                        to allocate memory for each character in the string.
                    </li>
                </ul>

                <Heading level={3}>Label Syntax</Heading>
                <p>
                    To define a label in LC-3 assembly language, you simply
                    write the label name followed by a colon (<Code>:</Code>) at
                    the beginning of a line. The label name must be unique and
                    cannot be a reserved word or an instruction mnemonic.
                </p>

                <LC3Code
                    lines={[
                        "START: ; Define a label for the start of the program",
                    ]}
                />
                <p>
                    Depending upon the compiler, this may originate in a blank
                    line in your code, if you add a label with no instruction
                    after it, so be careful.
                </p>

                <Heading level={3}>The Symbol Table</Heading>
                <p>
                    When assembling a program, the assembler needs to do two
                    passes over the code. Since the assembler cannot directly
                    resolve the value of a label, it first needs to figure out
                    the address of each label. This is done in the first pass.
                    The assembler then uses the symbol table to resolve the
                    addresses of labels in the second pass. This can also be
                    thought of as a linker table.
                </p>
            </Content>
        </Section>
    );
}
