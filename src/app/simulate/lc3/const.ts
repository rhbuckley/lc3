/*
 * Number of locations in LC3. Think of this as 0xffff + 1
 */
export const MEMORY_SIZE = 0x10000;

/*
 * Each word has 16 bits...
 */
export const WORD_BITS = 16;
export const WORD_MASK = 0xffff;

/*
 * Addresses >= to this are reserved for the system. I
 * am borrowing this from another LC3 simulator, as
 * this was not fully covered in my class.
 */
export const MAX_STANDARD_MEMORY = 0xfe00;

export const HARDWARE_ADDRESSES = {
    KBSR: 0xfe00,
    KBDR: 0xfe02,
    DSR: 0xfe04,
    DDR: 0xfe06,
    MCR: 0xfffe,
};
