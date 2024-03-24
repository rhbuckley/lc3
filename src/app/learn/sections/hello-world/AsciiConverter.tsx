"use client";

import { useEffect, useMemo, useState } from "react";

interface AsciiConverterProps {
    example?: string;
    setState?: (state: string) => void;
}

export function AsciiConverter({ example, setState }: AsciiConverterProps) {
    const [inputText, setInputText] = useState(example || "hello");

    const asciiText = useMemo(() => {
        return inputText
            .split("")
            .map((char) => "x" + char.charCodeAt(0).toString(16))
            .join(" ");
    }, [inputText]);

    useEffect(() => setState && setState(inputText), [inputText, setState]);

    return (
        <div className="flex flex-col gap-4 p-4 pb-8 border-green-400 bg-green-400/10 border-2 rounded-xl">
            <div className="flex flex-col">
                <label className="italic opacity-90" htmlFor="ascii-input">
                    Input:
                </label>
                <input
                    type="text"
                    id="ascii-input"
                    placeholder="Enter a string"
                    defaultValue={example || "Hello, World!"}
                    className="bg-light-100/80 rounded-lg px-2 py-1 dark:text-black dark:bg-light-100/80"
                    onChange={(e) => setInputText(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label className="italic opacity-90" htmlFor="ascii-output">
                    Output: (Hexadecimal)
                </label>
                <input
                    type="text"
                    readOnly
                    value={asciiText}
                    id="ascii-output"
                    className="bg-light-100/80 rounded-lg px-2 py-1 dark:text-black dark:bg-light-100/80"
                />
            </div>
        </div>
    );
}
