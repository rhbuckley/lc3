import { MEMORY_SIZE } from "../const";

import { memory } from "./os";

type OnReadCallback = () => void;
type OnWriteCallback = (value: number) => void;
type OnAnyCallback = (address: number, value: number, set: boolean) => void;

export class LC3Memory {
    private memory: number[];
    private r_callbacks: Map<number, OnReadCallback[]>;
    private w_callbacks: Map<number, OnWriteCallback[]>;
    private callbacks: Array<OnAnyCallback>;

    constructor() {
        /**
         * We don't want to fill this with 0s, as that
         * would stop it from being sparse. Instead, we
         * need to check if the value is undefined, and
         * if it is, return 0.
         */
        this.memory = new Array(MEMORY_SIZE);
        this.r_callbacks = new Map();
        this.w_callbacks = new Map();
        this.callbacks = [];

        /**
         * We also want to load the OS into memmory. If
         * you look at the ./os file, you will see that
         * the OS is stored in a Record<number,number>
         */
        this.loadOS();
    }

    /**
     * This gets a value from memory. If the value is
     * undefined, it returns 0.
     * @param address {number}
     * @returns
     */
    public get(address: number) {
        this.check_bounds(address);
        this.executeCallbacks(address);
        return this.memory[address] ?? 0;
    }

    /**
     * This sets a value in memory.
     * @param address {number}
     * @param value {number}
     */
    public set(address: number, value: number | ((value: number) => number)) {
        this.check_bounds(address);

        if (typeof value === "function") {
            value = value(this.get(address));
        }

        this.memory[address] = value;
        this.executeCallbacks(address, value);
    }

    /**
     * This sets a value in memory,
     * with no callback execution.
     * @param address {number}
     * @param value {number}
     */
    public setSilent(address: number, value: number) {
        this.check_bounds(address);
        this.memory[address] = value;
    }

    /**
     * This loads a program into memory.
     * @param program {number[]}
     * @param startAddress {number}
     */
    public load(program: number[], startAddress: number) {
        for (let i = 0; i < program.length; i++) {
            this.set(startAddress + i, program[i]);
        }

        this.loadOS();
    }

    /**
     * Clears the memory.
     */
    public clear() {
        this.memory = new Array(MEMORY_SIZE);
        this.loadOS();
    }

    /**
     * Validates that the address is within the bounds of
     * the memory length.
     * @param address {number}
     */
    private check_bounds(address: number) {
        if (0 > address || address >= MEMORY_SIZE) {
            const addrStr = "0x" + address.toString(16);
            throw new Error("Memory out of bounds @ address " + addrStr);
        }
    }

    /**
     * Helper function to execute a callback when a memory
     * address is read or written to.
     */
    private executeCallbacks(addr: number, value?: number) {
        // Execute the onRead/onWrite callbacks
        if (value) this.w_callbacks.get(addr)?.forEach((cb) => cb(value));
        else this.r_callbacks.get(addr)?.forEach((cb) => cb());

        // Execute the onAccess callbacks
        this.callbacks.forEach((cb) => cb(addr, value ?? -1, !!value));
    }

    /**
     * Watch an address for reads. When the address is read,
     * the callback will be called with the value.
     */
    public onRead(address: number, callback: () => void) {
        const cb = this.r_callbacks.get(address) || [];
        this.r_callbacks.set(address, [...cb, callback]);

        return () => {
            const callbacks = this.r_callbacks.get(address) || [];
            const no_cb = callbacks.filter((a) => a !== callback);
            this.r_callbacks.set(address, no_cb);
        };
    }

    /**
     * Watch an address for changes. When the address changes,
     * the callback will be called with the new value.
     */
    public onWrite(address: number, callback: (value: number) => void) {
        const cb = this.w_callbacks.get(address) || [];
        this.w_callbacks.set(address, [...cb, callback]);

        return () => {
            const callbacks = this.w_callbacks.get(address) || [];
            const no_cb = callbacks.filter((a) => a !== callback);
            this.w_callbacks.set(address, no_cb);
        };
    }

    /**
     * Watch all memory writes. When any address is written to,
     * the callback will be called.
     */
    public onAccess(callback: OnAnyCallback) {
        return this.callbacks.push(callback);
    }

    /**
     * Load the OS into memory.
     */
    private loadOS() {
        /**
         * We also want to load the OS into memmory. If
         * you look at the ./os file, you will see that
         * the OS is stored in a Record<number,number>
         */
        for (const [address, value] of Object.entries(memory)) {
            this.memory[parseInt(address, 10)] = value;
        }
    }
}
