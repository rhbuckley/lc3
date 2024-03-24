interface HeadingProps {
    children: React.ReactNode;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    id?: string;
}

export function Heading({ children, level, id }: HeadingProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    const size = {
        1: "text-4xl",
        2: "text-3xl",
        3: "text-2xl",
        4: "text-xl",
        5: "text-lg",
        6: "text-base",
    }[level];

    const contentTag = {
        1: "before:content-['#'] before:px-2 before:opacity-20 dark:before:opacity-40",
        2: "before:content-['##'] before:px-2 before:opacity-20 dark:before:opacity-40",
        3: "before:content-['###'] before:px-2 before:opacity-20 dark:before:opacity-40",
        4: "before:content-['####'] before:px-2 before:opacity-20 dark:before:opacity-40",
        5: "before:content-['#####'] before:px-2 before:opacity-20 dark:before:opacity-40",
        6: "before:content-['######'] before:px-2 before:opacity-20 dark:before:opacity-40",
    }[level];

    return (
        <Tag
            className={`font-mono font-bold py-2 mt-4 ${contentTag} ${size} ${
                id ? "scroll-my-40" : ""
            }`}
            id={id}
        >
            {children}
        </Tag>
    );
}

interface ContentProps {
    children: React.ReactNode;
    className?: string;
}

export function Content({ children, className }: ContentProps) {
    return (
        <div
            className={`${
                className ?? ""
            } text-sm text-black/70 dark:text-light-200 sm:max-w-[50vw] pt-2 leading-loose flex-col flex gap-5`}
        >
            {children}
        </div>
    );
}

interface CodeProps {
    children: React.ReactNode;
    className?: string;
}

export function Code({ children, className }: CodeProps) {
    return (
        <code
            className={`${
                className ?? ""
            } bg-light-300/20 dark:bg-light-800 rounded-md p-1 px-2 mx-1`}
        >
            {children}
        </code>
    );
}

interface LC3CodeProps {
    lines: string[];
    className?: string;
}

export function LC3Code({ lines, className }: LC3CodeProps) {
    return (
        <Code>
            {lines.map((line, i) => (
                <div key={i}>
                    {line.split(";").map((txt, i) => (
                        <span key={i} className={i === 0 ? "" : "opacity-75"}>
                            {i === 1 ? " ; " : ""} {txt}
                        </span>
                    ))}
                </div>
            ))}
        </Code>
    );
}

export function CodeComment({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-light-600/60 dark:text-light-100/40 italic">
            {" ; "}
            {children}
        </span>
    );
}

interface SectionProps {
    children: React.ReactNode;
}

export function Section({ children }: SectionProps) {
    return <section className="pt-20">{children}</section>;
}

interface BinaryInstructionProps {
    opcode: string;
    bits: { size: number; value?: string; bits?: number[] }[];
}

export function BinaryInstruction({ opcode, bits }: BinaryInstructionProps) {
    const totalBits = bits.reduce((acc, bit) => acc + bit.size, 0);
    if (totalBits !== 16 - 4) {
        throw new Error(
            `The total number of bits in the instruction should be 16, but it is ${totalBits}`
        );
    }

    return (
        <div className="dark:bg-light-800 rounded-xl dark:py-1">
            <div className="grid grid-cols-[repeat(16,_minmax(0,_1fr))] divide-x-2 py-1 divide-dashed dark:bg-transparent dark:divide-opacity-0 divide-light-600/80 dark:border-none border-b-2 border-black">
                {Array.from({ length: 16 }).map((_, i) => (
                    <span
                        className="text-center text-light-600/80 dark:text-light-200/40 leading-none"
                        key={i}
                    >
                        {15 - i}
                    </span>
                ))}
            </div>
            <div className="grid grid-cols-[repeat(16,_minmax(0,_1fr))] spy-1 bg-light-300/20 dark:bg-transparent rounded-b-xl divide-x-2 divide-black/40 dark:divide-light/40">
                {/* The opcode */}
                <div className="col-span-4 text-center flex justify-between pl-3 pr-4">
                    {Array.from(opcode).map((l, i) => (
                        <span key={i}>{l}</span>
                    ))}
                </div>

                {/* And the rest */}
                {bits.map((bit, i) => (
                    <span
                        key={i}
                        className={`text-center justify-between`}
                        style={
                            bit.bits
                                ? {
                                      gridColumn: `span ${bit.size} / span ${bit.size}`,
                                      display: bit.bits ? "grid" : "block",
                                      gridTemplateColumns: `repeat(${bit.size}, 1fr)`,
                                  }
                                : {
                                      gridColumn: `span ${bit.size} / span ${bit.size}`,
                                  }
                        }
                    >
                        {bit.bits
                            ? bit.bits.map((b, i) => <span key={i}>{b}</span>)
                            : bit.value}
                    </span>
                ))}
            </div>
        </div>
    );
}
