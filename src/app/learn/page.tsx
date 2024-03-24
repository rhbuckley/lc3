import { DocsNavigation } from "~/components/Navigation";

// sections
import type { SectionType } from "./sections";
import HelloWorldSection from "./sections/hello-world";
import UsingLabelsSection from "./sections/using-labels";
import RoutinesSection from "./sections/calling-function";
import RecipesSection from "./sections/recipes";

const sections: SectionType[] = [
    {
        title: "Hello World",
        href: "#hello-world",
        Component: HelloWorldSection,
    },
    {
        title: "Using Labels",
        href: "#labels",
        Component: UsingLabelsSection,
    },
    {
        title: "Calling a Function",
        href: "#routine",
        Component: RoutinesSection,
    },
    {
        title: "Recipes",
        href: "#recipes",
        Component: RecipesSection,
    },
];

export default function Page() {
    return (
        <main className="pt-40 px-4 sm:px-12 relative pb-40">
            <DocsNavigation
                anchors={sections.map(({ href, title }) => ({
                    href,
                    text: title,
                }))}
            />
            {sections.map(({ Component, ...props }, i) => (
                <Component key={i} {...props} />
            ))}
        </main>
    );
}
