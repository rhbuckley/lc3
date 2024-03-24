import { Code, Content, Heading, LC3Code } from "~/components/DocComponents";
import type { SectionProps } from "..";
import { LC3Conditionals } from "./conditionals";

export default function RecipesSection({ title, href }: SectionProps) {
    return (
        <Content>
            <Heading level={2} id={href}>
                {title}
            </Heading>

            <Heading level={3}>Declaring Constants</Heading>
            <p>
                To declare a constant, we directly write the value in memory.
                However, if you are writing assembly, there are two ways to do
                the following.
            </p>

            <ol className="pl-4 flex flex-col gap-4">
                <li>
                    <Code>.BLKW</Code> instruction. Use this direction to
                    initialize an array (reserve a block of memory), or to
                    initialize a value to 0 (<Code>.BLKW 1</Code>, do keep in
                    mind however, that this 1 is a hexadecimal value).
                </li>
                <li>
                    <Code>.FILL</Code> instruction. Use this to either
                    initialize a constant, or to initialize a constant to an
                    address of another constant (pointer). For example,{" "}
                    <Code>.FILL #15</Code> will place the decimal value 15 in
                    memory.
                </li>
            </ol>

            <Heading level={3}>Variable Manipulation</Heading>
            <p>
                Let&apos;s say that you know have the value of <Code>#164</Code>{" "}
                stored in memory location <Code>NumOfX</Code>. How could we add
                1 to this value and store it in register <Code>R1</Code>?
            </p>
            <LC3Code
                lines={[
                    "LD R1, NumOfX ; Loads value stored in memory location NumOfX",
                    "ADD R1, R1, #1 ; Adds 1 to the value in R1",
                ]}
            />

            <p>
                What if we want to store this updated value back in{" "}
                <Code>NumOfX</Code>?
            </p>
            <LC3Code
                lines={[
                    "ST R1, NumOfX ; Stores the value in R1 back to NumOfX",
                ]}
            />

            <p className="p-4 bg-red-500/20 border-2 border-red-500 rounded-xl">
                <strong>Warning:</strong> Be careful when using the{" "}
                <Code>LD</Code> and <Code>ST</Code> instructions as the LC-3
                expects a value to be +255 or -256. If the value is outside of
                this range, the LC-3 will not be able to access the memory. (You
                will need to use a pointer)
            </p>

            <Heading level={4}>Using Pointers</Heading>
            <p>
                To continue from the previous example, let&apos;s use pointers
                to load and store the value stored in <Code>NumOfX</Code>. To do
                this, let&apos; say that we placed a pointer to{" "}
                <Code>NumOfX</Code> in the code, called <Code>PtrNumOfX</Code>
            </p>

            <LC3Code
                lines={[
                    "LD R0, PtrNumOfX ; Loads the address of NumOfX into R0",
                    "LDI R1, R0, #0 ; Loads the value stored in memory location R0 into R1",
                    "ADD R1, R1, #1 ; Adds 1 to the value in R1",
                    "STI R1, R0, #0 ; Stores the value in R1 back to the address stored in R0",
                ]}
            />
            <LC3Conditionals />
        </Content>
    );
}
