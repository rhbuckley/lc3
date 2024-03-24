export interface SectionProps {
    title: string;
    href: string;
}

export type SectionType = SectionProps & {
    Component: ({ title, href }: SectionProps) => React.ReactNode;
};
