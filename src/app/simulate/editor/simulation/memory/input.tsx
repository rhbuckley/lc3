import { useMemo, useState } from "react";

interface MemoryInputProps {
    value: number;
    setValue?: (value: number) => void;
    readOnly?: boolean;
    className?: string;
}

export const MemoryInput: React.FC<MemoryInputProps> = ({
    value,
    setValue,
    readOnly,
    className,
}) => {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState("0x");

    const decimalRegex = /-?#[0-9]{1,5}/;
    const hexRegex = /^-?(?:0[xX])?[0-9a-fA-F]{1,4}$/;

    const formattedValue = useMemo(
        () =>
            "0x" +
            value.toString(16).padStart(4, "0").substring(0, 5).toUpperCase(),
        [value]
    );

    /**
     * This will execute when the input has been blurred (user has clicked away from the input)
     */
    const inputDone = (e: React.FocusEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value.startsWith("\\")) {
            value = value.slice(1);

            let newVal = value.charCodeAt(0).toString(16);

            if (value.length === 1) {
                newVal = "00" + newVal;
            } else {
                newVal += value.charCodeAt(1).toString(16);
            }

            value = newVal;
        }

        const isHex = value.match(hexRegex);
        const isDecimal = value.match(decimalRegex);
        const base = isHex ? 16 : isDecimal ? 10 : 0;

        const negative = value.startsWith("-") ? -Math.pow(2, 16) : 0;
        if (base > 0 && setValue) setValue(parseInt(value, base) + negative);

        setEditing(false);
        setEditValue("0x");
    };

    /**
     * This will execute when the div containing the input is clicked
     * This allows us to set the cursor position, etc
     */
    const inputStart = (e: React.MouseEvent<HTMLDivElement>) => {
        const input = e.currentTarget.querySelector("input");
        if (!input) return;

        input.focus();
        input.selectionStart = input.selectionEnd = input.value.length;
        if (input.value === "0x0000") input.value = "0x";
        setEditing(true);
    };

    /**
     * This will execute when the user enters a value (the input changes)
     */
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const str = e.target.value;

        // Shortcuts
        if (str.startsWith("\\")) setEditValue(str.slice(0, 3));
        if (["0", "x", "#", "0x"].includes(str)) setEditValue(str);
        else if (["0x#", "0#", "#"].includes(str)) setEditValue("#");
        else if (["0x\\", "0\\", "\\"].includes(str)) setEditValue("\\");
        else if (/^(?!-).*-.*/.test(str)) setEditValue("-");
        else if (hexRegex.test(str)) setEditValue(str.replace("X", "x"));
        else if (decimalRegex.test(str)) setEditValue(str);
    };

    /**
     * This will handle backspace and delete
     */
    const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && (e.ctrlKey || e.altKey || e.metaKey))
            setEditValue("0x");
        else if (e.key === "Backspace") setEditValue(editValue.slice(0, -1));
        else if (e.key === "Delete") setEditValue(editValue.slice(0, -1));
        else if (e.key === "Enter") e.currentTarget.blur();
        else if (e.key === "Escape") {
            setEditValue(value.toString(16));
            e.currentTarget.blur();
        }
    };

    return (
        <div
            data-tip={value > 0xf000 ? value - Math.pow(2, 16) : value}
            className="tooltip"
        >
            <div
                className={
                    (readOnly
                        ? ""
                        : "cursor-pointer pointer-events-auto transition-colors duration-150 ease-in-out hover:bg-white/10 ") +
                    "flex gap-2 rounded-lg  justify-center select-none px-2" +
                    (className ?? "")
                }
                {...(!readOnly && { onClick: inputStart })}
            >
                <input
                    className="bg-transparent outline-none w-14 text-white text-center pointer-events-none"
                    maxLength={editing ? 7 : 6}
                    value={editing ? editValue : formattedValue}
                    readOnly={readOnly}
                    {...(!readOnly && {
                        onChange: inputChange,
                        onKeyDown: inputKeyDown,
                        onBlur: inputDone,
                    })}
                />
            </div>
        </div>
    );
};
