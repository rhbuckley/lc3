import type { SectionProps } from "..";
import { Code, Content, Heading } from "~/components/DocComponents";
import { AsciiExample } from "./AsciiExample";

export default function HelloWorldSection({ title, href }: SectionProps) {
    return (
        <Content>
            <Heading level={2} id={href}>
                {title}
            </Heading>

            <Content>
                <p>
                    This page will show you how to get started with the language
                    and how to write your first program. To begin, let&apos;s
                    start with a simple hello world program. First, we will be
                    doing this in binary, and then we will look at the assembly
                    equivalent.
                </p>

                <Heading level={3}>Binary Implementation</Heading>
                <p>
                    The following is the binary implementation of the hello
                    world program. To complete this, we will need to use the
                    following instructions:
                </p>
                <ol>
                    <li className="py-2">
                        <Code>TRAP x21</Code> - Output character stored in R0 to
                        console.
                    </li>
                </ol>
                <p className="py-4">
                    The first step is using an ASCII table to find the
                    corresponding character codes. Because I am an absolute
                    saint (kidding), I am leaving you an ASCII conversion tool
                    here:
                </p>

                {/* AsciiExample is dynamic and allows the user to change the state */}
                <AsciiExample />
            </Content>
        </Content>
    );
}
