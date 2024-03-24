type OnAnyCallback = (register: number, value: number, set: boolean) => void;
type OnReadCallback = () => void;
type OnWriteCallback = (value: number) => void;

export class LC3Registers {
    private registers: number[];
    private callbacks: Array<OnAnyCallback>;
    private r_callbacks: Map<number, OnReadCallback[]>;
    private w_callbacks: Map<number, OnWriteCallback[]>;

    constructor() {
        this.registers = new Array(10).fill(0);
        this.callbacks = [];
        this.registers[8] = 0x3000; // PC
        this.r_callbacks = new Map();
        this.w_callbacks = new Map();
    }

    /**
     * This gets a register value.
     * @param register {number}
     * @returns
     */
    public get(register: number) {
        this.check_bounds(register);
        this.executeCallbacks(register);
        return this.registers[register];
    }

    /**
     * This sets a register to a value.
     * @param register {number}
     * @param value {number}
     */
    public set(register: number, value: number | ((value: number) => number)) {
        this.check_bounds(register);

        if (typeof value === "function") {
            value = value(this.get(register));
        }

        this.registers[register] = value;
        this.executeCallbacks(register, value);
    }

    /**
     * This gets the program counter register.
     * @returns {number}
     */
    get PC() {
        return this.get(8);
    }

    /**
     * This sets the program counter register.
     * @param value {number}
     */
    set PC(value: number) {
        this.set(8, value);
    }

    /**
     * This gets the condition code register.
     * @returns {number}
     */
    get CC() {
        return this.get(9);
    }

    /**
     * This sets the condition code register.
     * @param value {number}
     */
    set CC(value: number) {
        this.set(9, value);
    }

    /**
     * This resets all the registers to 0.
     */
    public reset() {
        for (let i = 0; i < 10; i++) {
            this.set(i, 0);
        }
    }

    /**
     * Ensures that the register is within bounds... the
     * LC3 only has 10 registers, 0-9, and some of them
     * system reserved.
     * @param register {number}
     */
    private check_bounds(register: number) {
        if (register >= 10) {
            throw new Error("LC3 only has 10 registers");
        }
    }

    /**
     * Executes all the callbacks for a register.
     * @param register {number}
     * @param value {number?} Only set if it was a write.
     */
    private executeCallbacks(register: number, value?: number) {
        // write/read callbacks
        if (value) this.r_callbacks.get(register)?.forEach((cb) => cb());
        this.w_callbacks.get(register)?.forEach((cb) => cb(value!));

        // any callbacks
        this.callbacks.forEach((cb) =>
            cb(register, value ?? -1, value !== undefined)
        );
    }

    /**
     * Adds a callback for a register.
     * @param register {number}
     * @param callback {OnAnyCallback}
     */
    public onAny(callback: OnAnyCallback) {
        this.callbacks.push(callback);
    }

    /**
     * Adds a callback for a register on read.
     * @param register {number}
     * @param callback {OnReadCallback}
     */
    public onRead(register: number, callback: OnReadCallback) {
        const cbs = this.r_callbacks.get(register) || [];
        this.r_callbacks.set(register, [...cbs, callback]);

        return () => {
            const cbs = this.r_callbacks.get(register) || [];
            this.r_callbacks.set(
                register,
                cbs.filter((cb) => cb !== callback)
            );
        };
    }

    /**
     * Adds a callback for a register on write.
     * @param register {number}
     * @param callback {OnWriteCallback}
     */
    public onWrite(register: number, callback: OnWriteCallback) {
        const cbs = this.w_callbacks.get(register) || [];
        this.w_callbacks.set(register, [...cbs, callback]);

        return () => {
            const cbs = this.w_callbacks.get(register) || [];
            this.w_callbacks.set(
                register,
                cbs.filter((cb) => cb !== callback)
            );
        };
    }
}
