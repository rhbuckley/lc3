"use client";

import { RegisterInput } from "./input";
import { useStore } from "@nanostores/react";
import { $halted, $lc3, $registers } from "~/app/simulate/lc3/@react";

export const RegisterView = () => {
    const lc3 = useStore($lc3);
    const halted = useStore($halted);
    const registers = useStore($registers);

    return (
        <div>
            <div
                className="tooltip tooltip-right"
                data-tip="Start decimal with #. Start hex with 0x. Negative numbers are supported. (PRO: \ for UNICODE/ASCII)"
            >
                <p className="font-monsterrat text-md font-bold">Registers</p>
            </div>
            <div className="grid grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <RegisterInput
                        key={i}
                        label={`R${i}`}
                        value={registers[i]}
                        setValue={(value) => lc3.writeRegister(i, value)}
                    />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
                <RegisterInput
                    label={halted ? "HALTED" : "PC"}
                    // We can call getPC, but that is not stateful.
                    value={halted ? registers[8] : registers[8]}
                    setValue={(value) => lc3.setPC(value)}
                    className={halted ? "bg-red-500" : ""}
                />
                <RegisterInput
                    label="COND"
                    value={registers[9]}
                    className={
                        registers[9] === 1
                            ? "bg-green-500/50"
                            : registers[9] === 0
                            ? ""
                            : "bg-red-500/50"
                    }
                    readOnly
                />
            </div>
        </div>
    );
};
