import { DetailedHTMLProps, RefObject, useState } from "react";
import { useStore } from "@nanostores/react";

import { compile_asm } from "../lc3/compiler/core";
import { $lc3 } from "../lc3/@react";

export const EditorActions = ({
    editorRef,
}: {
    editorRef: RefObject<{ getValue: () => string }>;
}) => {
    const [error, setError] = useState("");
    const lc3 = useStore($lc3);

    const compile = async () => {
        if (!editorRef?.current) return;
        const value = editorRef.current.getValue();
        const lines: string[] = value.split("\n");

        try {
            const compiled = compile_asm(lines);

            console.log(
                "\n" +
                    [compiled.startAddress, ...compiled.program]
                        .map((b) => b.toString(2).padStart(16, "0"))
                        .join("\n")
            );

            setError("");
            lc3.loadProgram(compiled);
        } catch (e) {
            const error = e as Error;
            const msg = error.message;
            setError(msg);
            console.error(error);
        }
    };

    return (
        <div className="flex gap-4">
            <EditorButton
                data-tip="You must compile before running"
                onClick={compile}
            >
                Compile
            </EditorButton>

            {error && <p>{error}</p>}
        </div>
    );
};

interface EditorButtonProps
    extends DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    children: React.ReactNode;
}

const EditorButton: React.FC<EditorButtonProps> = ({ children, ...props }) => (
    <button
        className={
            "bg-white/20 dark:bg-white/20 text-white dark:text-white px-2 rounded-md transition-colors duration-150 ease-in-out " +
            (props.disabled
                ? "bg-red-400/80 text-white/80 tooltip tooltip-right"
                : "hover:bg-white/30 hover:text-white dark:hover:bg-white/10")
        }
        {...props}
    >
        {children}
    </button>
);
