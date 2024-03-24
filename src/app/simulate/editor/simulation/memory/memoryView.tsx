import { useMemo } from "react";
import { interpert_bin } from "~/app/simulate/lc3/compiler/interpert";
import { MemoryInput } from "./input";
import { useStore } from "@nanostores/react";
import { $lc3 } from "~/app/simulate/lc3/@react";

interface MemoryDataProps {
    windowSize: number;
    addr: number;
}

export const MemoryData: React.FC<MemoryDataProps> = ({ windowSize, addr }) => {
    const lc3 = useStore($lc3);

    const memory = useMemo(() => {
        const size = windowSize + addr < 0x10000 ? windowSize : 0x10000 - addr;
        return Array.from({ length: size }).map((_, i) => ({
            address: addr + i,
            value: lc3.readMemory(addr + i),
        }));
    }, [windowSize, addr, lc3]);

    const instructions = useMemo(() => {
        let hasSeenHalt = false;
        const instructions = memory.map(({ address, value }) => {
            const asm = interpert_bin(value, hasSeenHalt, address);
            if (asm === "HALT") hasSeenHalt = true;
            return asm;
        });

        return instructions;
    }, [memory]);

    const toHexString = (value: number) =>
        `0x${value.toString(16).padStart(4, "0")}`;

    return (
        <div>
            <div className="grid grid-cols-4 gap-5">
                <p>Address</p>
                <p>Value</p>
                <p>Operation</p>
            </div>

            <div className="flex flex-col gap-2">
                {memory.map(({ address, value }, i) => (
                    <div key={address} className="grid grid-cols-4 gap-5">
                        <p className="opacity-80">{toHexString(address)}</p>
                        <div className="tooltip" data-tip={value}>
                            <MemoryInput
                                value={value}
                                setValue={(v) => lc3.writeMemory(address, v)}
                            />
                        </div>
                        <p className="col-span-2 whitespace-pre">
                            {instructions[i]}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
