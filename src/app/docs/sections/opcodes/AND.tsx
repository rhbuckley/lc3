import {
    Content,
    Heading,
    BinaryInstruction,
    LC3Code,
    Code,
} from "~/components/DocComponents";

export default function AndInstruction() {
    return (
        <Content>
            <Heading level={3}>AND Instruction</Heading>
            <p>
                The AND instruction is used to perform a bitwise AND operation
                between the contents of two registers, storing the result in a
                third register. The AND instruction supports both direct and
                indirect modes.
            </p>

            <Heading level={5}>Direct Mode</Heading>
            <p>
                In direct mode, the AND instruction performs a bitwise AND
                operation between the contents of two source registers and
                stores the result in a destination register. To use the AND
                instruction in direct mode:
            </p>

            <BinaryInstruction
                opcode="0101"
                bits={[
                    { size: 3, value: "DR" },
                    { size: 3, value: "SR1" },
                    { size: 3, bits: [0, 0, 0] },
                    { size: 3, value: "SR2" },
                ]}
            />

            <LC3Code
                lines={[
                    "AND R1 R2 R3 ; This performs the AND operation between the contents of registers R2 and R3, storing the result in register R1.",
                ]}
            />

            <p>
                Bit 5 of the instruction determines the mode. If bit 5 is 0, the
                instruction is in direct mode.
            </p>
            <p>
                Bits 4 and 3 are unused in the direct AND instruction. Ensure
                these bits are set to 0.
            </p>

            <Heading level={5}>Indirect Mode</Heading>
            <p>
                In indirect mode, the AND instruction performs a bitwise AND
                operation between the contents of a source register and a 5-bit
                immediate value, storing the result in a destination register.
                To use the AND instruction in indirect mode:
            </p>

            <BinaryInstruction
                opcode="0101"
                bits={[
                    { size: 3, value: "DR" },
                    { size: 3, value: "SR" },
                    { size: 1, value: "1" },
                    { size: 5, value: "imm5" },
                ]}
            />

            <LC3Code
                lines={[
                    "AND R1 R2 #15 ; This performs the AND operation between the contents of register R2 and the immediate value 15, storing the result in register R1.",
                ]}
            />

            <p>Bit 5 of the instruction must be 1 to indicate indirect mode.</p>
            <p>
                The immediate value (<Code>imm5</Code>) can be negative and is
                represented using two&apos;s complement notation. The first bit
                of the immediate value is the sign bit.
            </p>
            <p>
                The range of numbers that <Code>imm5</Code> can represent is
                from -16 to 15.
            </p>
        </Content>
    );
}
