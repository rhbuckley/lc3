import {
    Heading,
    Content,
    BinaryInstruction,
    LC3Code,
    Code,
} from "~/components/DocComponents";

export default function STIInstruction() {
    return (
        <Content>
            <Heading level={3}>STI Instruction</Heading>
            <p>
                The STI (Store Indirect) instruction is used to store the
                contents of a register into a memory location specified
                indirectly by the address stored in another register.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the STI instruction is as follows:</p>

            <BinaryInstruction
                opcode="1011"
                bits={[
                    { size: 3, value: "SR" },
                    { size: 3, value: "BaseR" },
                    { size: 6, value: "Offset6" },
                ]}
            />

            <p>Where:</p>
            <ul className="flex flex-col gap-4">
                <li>
                    <Code>SR</Code>: Specifies the source register whose
                    contents will be stored in memory. It is a 3-bit field
                    representing one of the eight general-purpose registers
                    (R0-R7).
                </li>
                <li>
                    <Code>BaseR</Code>: Specifies the base register, which holds
                    the base address for memory storage. It is a 3-bit field
                    representing one of the eight general-purpose registers
                    (R0-R7).
                </li>
                <li>
                    <Code>Offset6</Code>: Specifies the offset value, which is a
                    6-bit signed integer indicating the offset from the base
                    address where the address of the memory location is stored.
                </li>
            </ul>

            <LC3Code
                lines={[
                    "STI SR, BaseR, Offset6 ; This instruction stores the contents of the source register (SR) into memory at the address specified indirectly by the sum of the base register's value (BaseR) and the offset value (Offset6).",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the STI instruction:</p>
            <ol>
                <li>
                    Load the base register (BaseR) with the base address where
                    the address of the memory location to store the data is
                    stored.
                </li>
                <li>
                    Load the source register (SR) with the data you want to
                    store.
                </li>
                <li>
                    Calculate the memory address by adding the base
                    register&apos;s value (BaseR) and the offset value
                    (Offset6).
                </li>
                <li>
                    The memory location pointed to by the calculated address
                    will contain the address where the data will be stored.
                </li>
                <li>Execute the STI instruction.</li>
                <li>
                    The contents of the source register (SR) will be stored in
                    memory at the address specified indirectly by the calculated
                    address.
                </li>
            </ol>

            <p>
                The STI instruction is useful for storing data into memory
                locations specified indirectly by another memory location in
                LC-3 assembly language.
            </p>
        </Content>
    );
}
