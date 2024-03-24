"use client";

import { useStore } from "@nanostores/react";
import { computed } from "nanostores";
import { DetailedHTMLProps } from "react";
import { $lc3, $memory, $halted } from "~/app/simulate/lc3/@react";

export const ActionButtons = () => {
    const lc3 = useStore($lc3);
    const memory = useStore($memory);
    const halted = useStore($halted);

    const pc = computed($lc3, (lc3) => lc3.getPC());

    const run = () => lc3.run();
    const pause = () => $halted.set(true);
    const stepOver = () => lc3.stepOver();
    const stepInto = () => lc3.step();
    const reset = () => lc3.reset();

    return (
        <div className="flex gap-4">
            <ActionButton
                onClick={halted ? run : pause}
                disabled={memory[pc.get()] === 0xf025}
                data-tip="Your program is Halted"
            >
                {halted ? "Run" : "Pause"}
            </ActionButton>
            <ActionButton onClick={stepOver}>Step Over</ActionButton>
            <ActionButton onClick={stepInto}>Step</ActionButton>
            <ActionButton onClick={reset}>Reset</ActionButton>
        </div>
    );
};

interface ActionButtonProps
    extends DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, ...props }) => (
    <button
        className={
            "bg-white dark:bg-white/20 text-black dark:text-white px-2 rounded-md transition-colors duration-150 ease-in-out " +
            (props.disabled
                ? "bg-red-400/80 text-white/80 tooltip tooltip-right"
                : "hover:bg-slate-300/20 hover:text-white dark:hover:bg-white/10")
        }
        {...props}
    >
        {children}
    </button>
);
