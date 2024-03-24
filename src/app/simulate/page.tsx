import { Content, Heading } from "~/components/DocComponents";
import LC3Editor from "./editor";
import { OpcodeReference } from "./opcode_reference";

export default function Page() {
    return (
        <div className="grid sm:grid-cols-2 w-full min-h-screen dark:bg-[#010101] bg-light-50 divide-x-2 divide-gray-400">
            <div className="pt-32 px-12">
                <Heading level={1}>Simulate</Heading>

                <Content>
                    <p className="pt-4">
                        Here, you can write and simulate LC-3 assembly code. The
                        editor on the right is pre-configured with syntax
                        highlighting and autocomplete for LC-3 assembly. You can
                        write your code and run it to see the output.
                    </p>

                    <p>
                        Everytime you run the program, I will be clearing all
                        registers. This is to ensure that the program runs in a
                        clean environment, however, this may not accurately
                        reflect the behavior of the LC-3 machine.
                    </p>

                    <Heading level={2}>Opcode Reference</Heading>
                    <OpcodeReference />
                </Content>
            </div>
            <LC3Editor />
        </div>
    );
}
