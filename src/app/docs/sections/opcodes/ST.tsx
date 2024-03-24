import {
    Heading,
    Content,
    BinaryInstruction,
    LC3Code,
    Code,
} from "~/components/DocComponents";

export default function STInstruction() {
    return (
        <Content>
            <Heading level={3}>ST Instruction</Heading>
            <p>
                The ST (Store) instruction is used to store the contents of a
                register into a memory location specified by an offset from a
                base register.
            </p>

            <Heading level={4}>Format</Heading>
            <p>The format of the ST instruction is as follows:</p>

            <BinaryInstruction
                opcode="0011"
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
                    address where the data will be stored.
                </li>
            </ul>

            <LC3Code
                lines={[
                    "ST SR, BaseR, Offset6 ; This instruction stores the contents of the source register (SR) into memory at the address calculated by adding the base register's value (BaseR) and the offset value (Offset6).",
                ]}
            />

            <Heading level={4}>Usage</Heading>
            <p>To use the ST instruction:</p>
            <ol>
                <li>
                    Load the base register (BaseR) with the base address where
                    you want to store the data in memory.
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
                <li>Execute the ST instruction.</li>
                <li>
                    The contents of the source register (SR) will be stored in
                    memory at the calculated address.
                </li>
            </ol>

            <p>
                The ST instruction is commonly used for storing data into memory
                locations in LC-3 assembly language.
            </p>
        </Content>
    );
}
