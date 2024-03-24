export interface SectionProps {
    href: string;
    title: string;
}

export type SectionType = SectionProps & {
    Component: ({ title, href }: SectionProps) => React.ReactNode;
};
