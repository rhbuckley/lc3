import { Content, Section, Heading } from "~/components/DocComponents";
import type { SectionProps } from "..";

export default function StackSection({ title, href }: SectionProps) {
    return (
        <Section>
            <Heading level={2} id={href}>
                {title}
            </Heading>

            <Content>
                <p>
                    Why is the stack so important? Well, for one, the LC-3
                    language uses it for many things, such as storing local
                    variables, managing function calls, and facilitating
                    parameter passing and return addresses.
                </p>

                <p>Outside of LC-3 the stack has many other uses including:</p>
                <ol className="flex flex-col gap-5 list-decimal pl-6">
                    <li>
                        Memory Management: The stack can be used for dynamic
                        memory allocation, allowing programs to allocate memory
                        as needed during runtime.
                    </li>
                    <li>
                        Function Calls: Just like in LC-3, the stack is crucial
                        for managing function calls in many programming
                        languages. It allows for the passing of arguments,
                        storing return addresses, and managing local variables.
                    </li>
                    <li>
                        Expression Evaluation: In many programming languages,
                        especially those with postfix or reverse Polish notation
                        (RPN), the stack is utilized for evaluating expressions
                        efficiently.
                    </li>
                    <li>
                        Recursion: The stack is essential for implementing
                        recursive algorithms, where each recursive call pushes
                        information onto the stack until the base case is
                        reached.
                    </li>
                    <li>
                        Interrupt Handling: Operating systems use the stack to
                        save the context of a process when an interrupt occurs,
                        allowing for seamless switching between processes.
                    </li>
                    <li>
                        Buffer Management: Stacks are often used for managing
                        buffers in networking and file I/O operations, providing
                        a Last-In-First-Out (LIFO) data structure for efficient
                        data handling.
                    </li>
                    <li>
                        Parsing and Evaluation: In compilers and interpreters,
                        stacks are commonly used for parsing and evaluating
                        expressions, managing the execution of control
                        structures, and maintaining program state.
                    </li>
                    <li>
                        Undo/Redo Operations: Stacks can be employed to
                        implement undo and redo functionalities in applications,
                        allowing users to revert changes or redo previously
                        undone actions.
                    </li>
                    <li>
                        Thread Management: Stacks are used to manage the
                        execution context of threads in multi-threaded
                        applications, including storing thread-specific data and
                        managing thread execution flow.
                    </li>
                    <li>
                        Security: In security applications, such as preventing
                        buffer overflow attacks, the stack is utilized to
                        enforce memory protection and stack canaries to detect
                        and prevent exploits.
                    </li>
                </ol>
                <p>
                    Besides the uses listed above, the stack also has many other
                    uses. In fact, the stack is used in pretty much everything,
                    from the operating system to the application layer.
                </p>

                <p className="bg-green-800/80 rounded-xl p-4 text-white/80  leading-normal">
                    <span className="font-semibold">
                        Congradulations on finishing this guide.
                    </span>
                    <br />
                    <br />
                    <span className="italic">
                        That was a lot. For you, and me (this file is ~2000
                        lines). I hope this has taught you something, and for
                        the record, I am still a student, so even though I
                        double checked everything, there may be some mistakes.
                        If you find any, please let me know. Good luck with your
                        studies!
                    </span>
                </p>
            </Content>
        </Section>
    );
}
