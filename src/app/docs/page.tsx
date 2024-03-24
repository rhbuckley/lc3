import { Content, Heading, Section } from "~/components/DocComponents";
import { DocsNavigation } from "~/components/Navigation";

// sections
import OpcodesSection from "./sections/opcodes";
import GettingStartedSection from "./sections/getting-started";
import LabelsSection from "./sections/labels";
import StackSection from "./sections/stack";
import AddresssingSection from "./sections/addressing";
import type { SectionType } from "./sections";

export default function Page() {
    const sections: SectionType[] = [
        {
            title: "Get Started",
            href: "#get-started",
            Component: GettingStartedSection,
        },

        {
            title: "Opcodes",
            href: "#opcodes",
            Component: OpcodesSection,
        },

        {
            title: "Labels & Directives",
            href: "#labels",
            Component: LabelsSection,
        },

        {
            title: "Addressing",
            href: "#addressing",
            Component: AddresssingSection,
        },

        {
            title: "The Stack",
            href: "#stack",
            Component: StackSection,
        },
    ];

    return (
        <main className="pt-40 px-4 sm:px-12 relative pb-40">
            <DocsNavigation
                anchors={sections.map((v) => ({
                    text: v.title,
                    href: v.href,
                }))}
            />

            <div className="flex flex-col gap-12 sm:gap-8 px-2">
                <Section>
                    <Heading id="docs" level={1}>
                        Docs
                    </Heading>
                    <Content>
                        <p>
                            Learn about opcodes, instructions, labels, as well
                            as understanding some key concepts of the LC-3
                            Assembly Language.
                        </p>
                    </Content>
                </Section>

                {sections.map(({ Component, ...rest }, i) => (
                    <Component key={i} {...rest} />
                ))}
            </div>
        </main>
    );
}
