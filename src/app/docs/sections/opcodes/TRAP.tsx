import {
    BinaryInstruction,
    Code,
    Content,
    Heading,
    LC3Code,
} from "~/components/DocComponents";

export default function TRAPInstruction() {
    return (
        <Content>
            <Heading level={3}>TRAP Instruction</Heading>
            <p>
                The TRAP instruction is used for calling operating system
                services or handling software interrupts in LC-3 assembly
                language.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the TRAP instruction is as follows:</p>

            <BinaryInstruction
                opcode="1111"
                bits={[
                    {
                        size: 4,
                        bits: [0, 0, 0, 0],
                    },
                    {
                        size: 8,
                        value: "trapvect8",
                    },
                ]}
            />

            <p>Where:</p>
            <ul className="flex flex-col gap-4">
                <li>
                    <Code>trapvect8</Code>: Specifies the 8-bit vector
                    indicating the trap routine to be executed. It represents
                    one of the possible trap routines provided by the operating
                    system or software.
                </li>
            </ul>

            <LC3Code
                lines={[
                    "TRAP trapvect8 ; This instruction calls the specified trap routine identified by the 8-bit vector.",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the TRAP instruction:</p>
            <ol>
                <li>
                    Load the 8-bit vector representing the desired trap routine
                    into the program counter (PC).
                </li>
                <li>Execute the TRAP instruction.</li>
                <li>
                    The processor transfers control to the corresponding trap
                    routine provided by the operating system or software.
                </li>
            </ol>

            <p>
                The TRAP instruction is fundamental for invoking system services
                and handling software interrupts in LC-3 assembly language.
            </p>

            <Heading level={4}>TRAP Routines</Heading>
            <p>
                The LC-3 architecture provides a set of standard TRAP routines,
                each identified by an 8-bit vector. These routines include:
            </p>

            <ul>
                <li>
                    <Code>x20</Code> - Reads a single character from the
                    console. Does not echo character to console. (You will not
                    see what you type). This has an assembler directive,{" "}
                    <Code>GETC</Code>
                </li>

                <li>
                    <Code>x21</Code> - Outputs a single character to the
                    console. This has an assembler directive, <Code>OUT</Code>
                </li>

                <li>
                    <Code>x22</Code> - Outputs a string of characters to the
                    console. This has an assembler directive, <Code>PUTS</Code>
                </li>

                <li>
                    <Code>x23</Code> - Prints a string of characters to the
                    console, and gets (and echoes) a character input from the
                    console
                    <Code>IN</Code>
                </li>

                <li>
                    <Code>x25</Code> - Halts the program execution. This has an
                    assembler directive,
                    <Code>HALT</Code>
                </li>
            </ul>
        </Content>
    );
}
