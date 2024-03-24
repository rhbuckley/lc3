import { useStore } from "@nanostores/react";
import { Dispatch, SetStateAction, useState } from "react";
import { $input, $lc3 } from "~/app/simulate/lc3/@react";

export const InputBuffer: React.FC = () => {
    const lc3 = useStore($lc3);
    // const bufferRef = useInputFocusRef();
    const [inputEnterAscii, setInputEnterAscii] = useState(0x0a);

    // Handle Input for the input buffer
    // const [buffer, setBuffer] = useInputBuffer(lc3);
    const buffer = useStore($input);

    const displayCharOrHex = (key: number) => {
        const ok = /^[ A-Za-z0-9_@./!#&+-]*$/.test(String.fromCharCode(key));
        return ok
            ? String.fromCharCode(key)
            : key.toString(16).padStart(2, "0");
    };

    const shouldIgnore = (e: React.KeyboardEvent<HTMLDivElement>) => {
        return (
            e.metaKey ||
            e.ctrlKey ||
            e.altKey ||
            (e.shiftKey && e.key === "Shift") ||
            e.key.length > 1
        );
    };

    const onInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // Handle backspace, since we locked the input
        if (e.key === "Backspace") {
            $input.set($input.get().slice(0, -1));
            return;
        }

        // Discard if it's a modifier key, or a non-ASCII character
        if (shouldIgnore(e)) return;
        e.preventDefault();

        // I want to ensure that I am reading an ASCII character, and
        // not a fancy unicode character (I really don't want to deal with that)
        const ascii = e.key.charCodeAt(0);

        // Check if this is an enter type that we may need to change
        if ([0x0a, 0x0d].includes(ascii)) {
            $input.set($input.get() + String.fromCharCode(inputEnterAscii));
            return;
        }

        $input.set($input.get() + e.key);
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                tabIndex={0}
                className="h-20 p-2 rounded-md bg-white bg-opacity-10 backdrop-blur-sm filter relative focus:outline-offset-2 focus:outline-2 focus:outline outline-green-500 group scroll-m-7"
                onKeyDown={(e) =>
                    document.activeElement === e.target && onInput(e)
                }
            >
                <p className="group-focus:scale-75 transition-all duration-200 ease-in-out origin-top-left">
                    Input
                </p>
                <button
                    className="absolute right-2 top-2 font-monsterrate text-xs rounded-lg text-white bg-white/20 p-1 px-2 hover:bg-white/10 transition-colors duration-150 ease-in-out"
                    onClick={() => $input.set("")}
                >
                    Clear Buffer
                </button>
                <div className="flex gap-2 overflow-x-scroll">
                    {buffer.split("").map((key, i) => (
                        <span
                            key={i}
                            className="bg-white bg-opacity-20 px-1 rounded-md"
                        >
                            {displayCharOrHex(key.charCodeAt(0))}
                        </span>
                    ))}
                </div>
            </div>

            <InputBufferOptions
                option={inputEnterAscii}
                setOption={setInputEnterAscii}
            />
        </div>
    );
};

interface InputBufferOptsProps {
    option: number;
    setOption: Dispatch<SetStateAction<number>>;
}
const InputBufferOptions: React.FC<InputBufferOptsProps> = ({
    option,
    setOption,
}) => {
    return (
        <div className="flex items-center gap-8 text-white">
            <p>Enter should be</p>

            <div className="flex items-center h-max">
                <input
                    id="0x0a-btn"
                    type="radio"
                    name="0x0a-btn"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    checked={option === 0x0a}
                    onChange={() => setOption(0x0a)}
                />
                <label
                    htmlFor="0x0a-btn"
                    className="w-full ms-2 text-sm font-medium text-white dark:text-gray-300"
                >
                    0x0A
                </label>
            </div>

            <div className="flex items-center h-max">
                <input
                    type="radio"
                    name="0x0d-btn"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="hs-checked-radio"
                    checked={option === 0x0d}
                    onChange={() => setOption(0x0d)}
                />

                <label
                    htmlFor="0x0d-btn"
                    className="w-full ms-2 text-sm font-medium text-white dark:text-gray-300"
                >
                    0x0D
                </label>
            </div>
        </div>
    );
};
