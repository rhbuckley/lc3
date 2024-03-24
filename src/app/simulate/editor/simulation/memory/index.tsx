import { useState } from "react";
import { MemoryData } from "./memoryView";
import { useStore } from "@nanostores/react";
import { $lc3, $memDisplayWindow, $memory } from "~/app/simulate/lc3/@react";
import { IconMinusSm, IconPlusSm } from "~/components/icons/operators";

export const MemoryWatcher = () => {
    const lc3 = useStore($lc3);
    const memory = useStore($memory);
    const [windowSize, addr] = useStore($memDisplayWindow);

    const [editing, setEditing] = useState(false);
    const [editingVal, setEditingVal] = useState("0x");

    const decimalRegex = /-?#[0-9]{1,5}/;
    const hexRegex = /^-?(?:0[xX])?[0-9a-fA-F]{1,4}$/;

    /**
     * This will execute when the input has been blurred (user has clicked away from the input)
     */
    const addrDone = (e: React.FocusEvent<HTMLInputElement>) => {
        let value = e.target.value;

        const isHex = value.match(hexRegex);
        const isDecimal = value.match(decimalRegex);
        const base = isHex ? 16 : isDecimal ? 10 : 0;

        if (base > 0)
            $memDisplayWindow.set([windowSize, parseInt(value, base)]);

        setEditing(false);
        setEditingVal("0x");
    };

    /**
     * This will execute when the user enters a value (the input changes)
     */
    const addrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const str = e.target.value;

        // Shortcuts
        if (["0", "x", "#", "0x"].includes(str)) setEditingVal(str);
        else if (["0x#", "0#", "#"].includes(str)) setEditingVal("#");
        else if (hexRegex.test(str)) setEditingVal(str.replace("X", "x"));
        else if (decimalRegex.test(str)) setEditingVal(str);
    };

    /**
     * This will handle backspace and delete
     */
    const addrKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && (e.ctrlKey || e.altKey || e.metaKey))
            setEditingVal("0x");
        else if (e.key === "Backspace") setEditingVal(editingVal.slice(0, -1));
        else if (e.key === "Delete") setEditingVal(editingVal.slice(0, -1));
        else if (e.key === "Enter") e.currentTarget.blur();
        else if (e.key === "Escape") {
            setEditingVal(addr.toString(16));
            e.currentTarget.blur();
        }
    };

    return (
        <div className="flex flex-col pb-8">
            <p className="font-monsterrat text-md font-bold">Memory</p>

            <div className="flex gap-8">
                <div className="py-8 flex flex-col justify-between">
                    <label htmlFor="memory-search">Jump to Address</label>
                    <input
                        type="text"
                        name="memory-search"
                        value={
                            editing
                                ? editingVal
                                : "0x" + addr.toString(16).padStart(4, "0")
                        }
                        onFocus={() => setEditing(true)}
                        onChange={addrChange}
                        onKeyDown={addrKeyDown}
                        onBlur={addrDone}
                        maxLength={6}
                        className="bg-white bg-opacity-10 backdrop-blur-sm filter px-2 max-w-32 rounded-md outline-none"
                    />
                </div>

                <div className="py-8 flex flex-col justify-between">
                    <label htmlFor="window-size">Window Size</label>
                    <div className="flex gap-4 items-center">
                        <button
                            className="bg-white/20 rounded-sm min-w-6 h-[80%] aspect-square grid place-items-center"
                            onClick={() =>
                                $memDisplayWindow.set([
                                    Math.max(5, windowSize - 5),
                                    addr,
                                ])
                            }
                        >
                            <IconMinusSm className="fill-white" />
                        </button>
                        <p className="text-white">{windowSize}</p>
                        <button
                            className="bg-white/20 rounded-sm min-w-6 h-[80%] aspect-square grid place-items-center"
                            onClick={() =>
                                $memDisplayWindow.set([
                                    Math.min(windowSize + 5, 50),
                                    addr,
                                ])
                            }
                        >
                            <IconPlusSm className="fill-white" />
                        </button>
                    </div>
                </div>
            </div>
            <MemoryData windowSize={windowSize} addr={addr} />
        </div>
    );
};
