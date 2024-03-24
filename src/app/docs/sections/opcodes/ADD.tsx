import {
    Content,
    Heading,
    BinaryInstruction,
    LC3Code,
    Code,
} from "~/components/DocComponents";

export default function AddInstruction() {
    return (
        <Content>
            <Heading level={3}>ADD Instruction</Heading>
            <p>
                The ADD instruction is used to add the contents of two
                registers, and store the result in a third register. The ADD
                instruction can has two modes: direct and indirect.
            </p>

            <Heading level={5}>Direct Mode</Heading>
            <p>
                In direct mode, the ADD instruction adds the contents of two
                registers, and stores the result in a third register. The ADD
                instruction is written as follows:
            </p>

            <BinaryInstruction
                opcode="0001"
                bits={[
                    { size: 3, value: "DR" },
                    { size: 3, value: "SR1" },
                    { size: 3, bits: [0, 0, 0] },
                    { size: 3, value: "SR2" },
                ]}
            />

            <LC3Code lines={["ADD DR SR1 SR2 ; This stores SR1 + SR2 in DR"]} />

            <p>
                Earlier, we mentioned that the ADD instruction has two modes.
                Direct, and indirect. How do we know which mode to use? The
                answer is determined by bit 5 of the instruction. If bit 5 is 0,
                then the instruction is in direct mode. If bit 5 is 1, then the
                instruction is in indirect mode.
            </p>
            <p>
                How do I remember this? Well, in indirect mode, you are able to
                add a value to a register. The value that you specify must be 5
                bits long, and it wouldn&apos;t make sense to place these bits
                out of order.
            </p>
            <p>
                Bits 4 and 3 are UNUSED in the direct ADD instruction. Please
                leave these bits as 0.
            </p>

            <Heading level={5}>Indirect Mode</Heading>
            <p>
                In indirect mode, the ADD instruction adds the contents of one
                register to a 5 bit immediate value, and stores the result in
                the destination register. Bit 5 must be 1.
            </p>

            <BinaryInstruction
                opcode="0001"
                bits={[
                    { size: 3, value: "DR" },
                    { size: 3, value: "SR" },
                    { size: 1, value: "1" },
                    { size: 5, value: "imm5" },
                ]}
            />

            <LC3Code lines={["ADD DR SR #15 ; This stores SR + #15 in DR"]} />

            <p>
                Important: With all things LC3, the <Code>imm5</Code>, or
                immediate 5 bit value, can be negative. The LC3 language uses
                two&apos;s complement to represent negative numbers. This means
                that the first bit of the immediate value is the sign bit, and
                the remaining bits are the magnitude of the number.
            </p>
            <p>
                What is the range of numbers that imm5 can represent? The
                maximum value that can be represented is <Code>2^(n-1)-1</Code>,
                or in this case <Code>15</Code>. The lower bound is{" "}
                <Code>-2^(n-1)</Code>, and is <Code>-16</Code>. Imm5 cannot be
                outside of this range!
            </p>
        </Content>
    );
}
