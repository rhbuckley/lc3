import { useStore } from "@nanostores/react";
import { $output } from "~/app/simulate/lc3/@react";

export const OutputBuffer = () => {
    const output = useStore($output);

    return (
        <div>
            <p className="font-monsterrat text-md font-bold">Console</p>
            <div className="min-h-20 p-2 rounded-md bg-white bg-opacity-10 backdrop-blur-sm filter relative">
                <p className="whitespace-break-spaces">Output</p>
                <pre className="text-white/80">{output}</pre>
                <button
                    onClick={() => $output.set("")}
                    className="absolute right-2 top-2 font-monsterrate text-xs rounded-lg text-white bg-white/20 p-1 px-2 hover:bg-white/10 transition-colors duration-150 ease-in-out"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};
