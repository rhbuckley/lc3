"use client";

import { useMemo, useState } from "react";
import { AsciiConverter } from "./AsciiConverter";
import { Code, Heading } from "~/components/DocComponents";

export function AsciiExample() {
    const [example, setExample] = useState("hello");

    const twosComplement = useMemo(() => {
        // - get length of example
        const length = example.length + 1;

        // - convert the length to an example
        const binary = length.toString(2).padStart(9, "0");

        // - invert the bits
        return Array.from(binary)
            .map((bit) => (bit === "0" ? "1" : "0"))
            .join("");
    }, [example]);

    return (
        <>
            <AsciiConverter example={example} setState={setExample} />
            <p>
                Look{" "}
                <a
                    href="https://www.asciitable.com/"
                    target="_blank"
                    className="underline text-blue-500"
                >
                    here
                </a>{" "}
                to see the ascii codes for <Code>NULL</Code>,{" "}
                <Code>RETURN</Code> and more.
            </p>
            <Code className="flex flex-col leading-5 py-2">
                {Array.from(example).map((char, i) => (
                    <span key={i}>
                        {char
                            .charCodeAt(0)
                            .toString(2)
                            .padStart(16, "0")
                            .split("")
                            .reduce((acc, char, i) => {
                                if (i % 4 === 0) {
                                    acc = acc + " ";
                                }
                                acc = acc + char;
                                return acc;
                            }) +
                            " ; " +
                            char}
                    </span>
                ))}
                <span>
                    0000 0000 0000 0000 ; NULL to show that the string is ended
                </span>
            </Code>

            <p>
                Believe it or not, we can even write this in hex (and it may or
                not be more readable), but just for understanding, here it is:
            </p>

            <Code className="flex flex-col leading-5 py-2">
                {Array.from(example).map((char, i) => (
                    <span key={i}>
                        x
                        {char
                            .charCodeAt(0)
                            .toString(16)
                            .padStart(4, "0")
                            .toUpperCase() +
                            " ; " +
                            char}
                    </span>
                ))}
                <span>
                    x0000 ; NULL character to show that the string is ended
                </span>
            </Code>

            <p>
                Now that we have the string that we need to print loaded into
                memory, let&apos;s call the TRAP instruction to print it to the
                console. Notice that the string contains a NULL character at the
                end. This is important because the TRAP instruction will stop
                printing characters when it encounters a NULL character.
            </p>

            <p>
                How do we start? Well, we first need to find the memory location
                of the first character that we wish to print. Let&apos;s use the
                LEA instruction to store the memory location of the string in
                R0. Notice that the string is 7 characters long, so we will need
                to offset our PC by -7 - 1 (because PC has already incremented)
                = -8 to get the memory location of the first character.
            </p>

            <Code className="flex flex-col leading-5 py-2">
                <span>
                    1110 000 {twosComplement} ; Load the address of the `h` into
                    R0
                </span>
                <span>1111 0000 00100010 ; Call TRAP x22 (print string)</span>
                <span>1111 0000 00100101 ; Call TRAP x25 (HALT)</span>
            </Code>

            <p>
                But wait. Before we continue. Where is the PC starting at? We
                need to tell the assembler where to start executing the program.
                We do this by using the .ORIG directive in the assembler, but
                how about when we are wrting in binary? Well, we just need to
                write where we want the program to start on the first line.
            </p>

            <p>
                See the finished program below in both binary and hexadecimal.
            </p>

            <Code className="flex flex-col leading-5 py-2">
                <span>
                    {" "}
                    0011 0000 0000 0000 ; Initialize the program to start at
                    x3000
                </span>
                {Array.from(example).map((char, i) => (
                    <span key={i}>
                        {char
                            .charCodeAt(0)
                            .toString(2)
                            .padStart(16, "0")
                            .split("")
                            .reduce((acc, char, i) => {
                                if (i % 4 === 0) {
                                    acc = acc + " ";
                                }
                                acc = acc + char;
                                return acc;
                            }) +
                            " ; " +
                            char}
                    </span>
                ))}
                <span>
                    0000 0000 0000 0000 ; NULL character to show that the string
                    is ended
                </span>

                <span className="pt-4">
                    1110 000 {twosComplement} ; Load the address of the `h` into
                    R0
                </span>
                <span>1111 0000 00100010 ; Call TRAP x22 (print string)</span>
                <span>1111 0000 00100101 ; Call TRAP x25 (HALT)</span>
            </Code>

            <div className="p-2 bg-red-400/20 border-2 border-red-400 rounded-lg">
                <strong>Key Idea:</strong>
                <p>
                    The code that we just wrote works, but is terribly
                    inefficent. Why could this be? Well, notice that the program
                    is starting at x3000. This means that the first instruction
                    is at x3000, the second at x3001, and so on.{" "}
                    <strong>
                        This means that the characters being stored at the
                        beginning of the file are being executed as
                        instructions!!!
                    </strong>{" "}
                    We do not want this, as this has the potential to cause a
                    crash. We can either switch to a routine-like structure,
                    where we JUMP over the data, or store our labels at the end
                    of the file.
                </p>

                <p className="italic pt-4">
                    If you copy & paste this to submit for your homework, you
                    may (will probably) lose points.
                </p>
            </div>

            <Heading level={3}>Assembly Language Implementation</Heading>

            <p>
                Well, that was painful right? Here, I am going to illustrate how
                much easier the assembly language makes things, and I just want
                you to know, that I suffered too.
            </p>

            <Code className="flex flex-col leading-5 py-2">
                <span>.ORIG x3000</span>
                <span>LEA R0, #3</span>
                <span>PUTS</span>
                <span>HALT</span>
                <span>.STRINGZ &quot;{example}&quot;</span>
                <span>.END</span>
            </Code>

            <p>
                And that is it! Compared to the monstrosity above, I am sure
                that you can tell that using the assembly language is much
                easier. This is the difference between the levels of abstraction
                that we are working at. For example, this complicated task can
                be accomplished in one line in most good programming languages
                (yes, I do not like java).
            </p>
        </>
    );
}
