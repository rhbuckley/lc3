import { WORD_BITS, WORD_MASK } from "./const";

/**
 * This formats a number as a hexadecimal string. Two's complement is
 * applied here for negative numbers.
 * @param num {signed number}
 * @returns
 */
export function asHexString(num: number): string {
    num = num > 0 ? num : ~Math.abs(num) + 1;
    return "x" + num.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * This formats a number as a signed decimal string. Two's complement is
 * appleid here for negative numbers.
 * @param num {signed number}
 * @returns
 */
export function asNumberString(num: number): string {
    num = num > 0 ? num : ~Math.abs(num) + 1;
    return num.toString();
}

/**
 * This sign extends a number to N bits. This is useful
 * for when you want to extend a number to a larger bit
 * size.
 */
export function signExtend(num: number, bits: number = 9) {
    // - Is the number negative?
    if (num & (1 << (bits - 1))) {
        // - Yes, sign extend
        num |= ~((1 << bits) - 1);
    }

    return num & (Math.pow(2, bits) - 1);
}

/**
 * This formats a number to be a signed 16-bit number.
 * Yes, this will still return a number, but it helps if you
 * conceptually think of it as binary or hex. The MSB can
 * either be 0 or 1, and uses two's complement for negative
 * numbers.
 * @param num {number}
 * @returns {number}
 */
export function asInt16(num: number): number {
    if (num < 0) return asInt16(Math.abs(~num) + 1);
    return num & WORD_MASK;
}

/**
 * This formats a number to be an unsigned 16-bit number.
 * This is useful for when you want to get the value of a
 * number without the sign bit. The MSB will always be 0.
 * @param num {number}
 * @returns {number}
 */
export function asUInt16(num: number): number {
    return asInt16(num) & (WORD_MASK >>> 1);
}

/**
 * This gets a bit from a number at a specific index.
 * The index is 0-based, so the LSB is at index 0.
 * @param num {number}
 * @param index {number}
 */
export function getBit(num: number, index: number): number {
    return (num >> index) & 1;
}

/**
 * This parses a number from a input. The input is
 * typically a slice of another binary number.
 * @param num {number}
 */
export function parseInt16(num: number) {
    const msb = getBit(num, 15);
    return msb ? asInt16(num - Math.pow(2, WORD_BITS)) : asInt16(num);
}

/**
 * This parses a number from a input. The input is
 * typically a slice of another binary number.
 * @param num {number}
 * @param bits {number}
 */
export function parseIntN(num: number, bits: number) {
    const msb = getBit(num, bits - 1);
    return msb ? num - Math.pow(2, bits) : num;
}

/**
 * This parses a number from a string input. The
 * input can be a decimal, or hexadecimal number.
 * @param num {string}
 */
export function parseStrInt(num: string, bits = WORD_BITS) {
    let res = 0;

    const nonNegative = num.replace("-", "");
    if (num.startsWith("0x")) {
        res = parseInt16(parseInt(nonNegative, 16));
    } else if (num.startsWith("#")) {
        res = parseInt16(parseInt(nonNegative.slice(1), 10));
    }

    if (isNaN(res)) throw new Error("Invalid number : Could not parse " + num);
    if (num.includes("-")) -Math.pow(2, bits) + res;
    return res;
}

/**
 * This parses a register from a string input. The
 * input must be a string starting with "R" followed
 * by a number.
 */
export function parseRegister(register: string) {
    if (!register.match(/^R[0-7]/i))
        throw new Error("Invalid register: " + register);

    return parseInt(register.slice(1));
}
