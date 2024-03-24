import { atom, map } from "nanostores";
import { memory } from "./computer/os";
import { LittleComputer3 } from "./computer";

export const $input = atom("");
export const $output = atom("");
export const $halted = atom(true);
export const $memDisplayWindow = atom([10, 0x3000]);

export const $memory = map<{ [k: number]: number }>();
for (const [address, value] of Object.entries(memory)) {
    $memory.setKey(parseInt(address, 16), value);
}

export const $registers = map<{ [k: string]: number }>();

export const $lc3 = atom(new LittleComputer3());
new Array(10).fill(0).forEach((_, i) => {
    $registers.setKey(i, $lc3.get().readRegister(i));
});

/**
 * SAMPLE Program
 */
const program = {
    program: [
        0b1110000000000010,
        0b1111000000100010,
        0b1111000000100101,
        ..."i (definitely) love physics".split("").map((c) => c.charCodeAt(0)),
        0b0000000000000000,
    ],
    startAddress: 0x3000,
    symbolTable: new Map([["mylabel", 0x3003]]),
};

$lc3.get().loadProgram(program);

/**
 * END SAMPLE Program
 */
