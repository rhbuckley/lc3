import { parseStrInt, signExtend } from "../utils";

type FutureInstructionType = {
    addr: number;
    instruction: (labelValue: number) => number;
}[];

export class ASMManager {
    private origin?: number;
    private memory: number[];
    private seenEnd: boolean;
    private labels: Map<string, number>;
    private futureInstructions: Map<string, FutureInstructionType>;

    constructor() {
        this.memory = [];
        this.seenEnd = false;
        this.origin = undefined;
        this.labels = new Map();
        this.futureInstructions = new Map();
    }

    /**
     * If there are any unresolved labels.
     * @returns {boolean} whether there are any unresolved labels
     */
    public hasUnresolvedLabels(): boolean {
        return this.futureInstructions.size > 0;
    }

    /**
     * Set the end of the program. This will prevent any more
     * instructions from being added.
     */
    public setEnd() {
        this.seenEnd = true;
    }

    /**
     * Set the origin of the program.
     * @param origin {number} the origin of the program
     */
    public setOrigin(origin: number) {
        this.origin = origin;
    }

    /**
     * Add an instruction to the program.
     * @param instruction {number} the instruction to add
     */
    public addInstruction(instruction: number) {
        if (!this.origin) {
            throw new Error("Origin not set");
        }

        if (this.seenEnd) {
            throw new Error("Trying to add instruction after .END");
        }

        this.memory.push(instruction);
    }

    /**
     * Is the token a label?
     * @param token {string} the token to check
     */
    private isNumber(token: string) {
        const re = /((-?0?x[A-Fa-f0-9]{4})|((#)|(-#)|(#-)?[0-9]{1,5}))/gi;
        return token.match(re) !== null;
    }

    /**
     * Add an instruction with an immediate value.
     * @param instruction {number} the instruction to add
     * @param immediate {number | string} the label/immediate to add
     * @param bits {number} the number of bits in the immediate
     */
    public addImmediateInstruction(
        instruction: number,
        immediate: number | string,
        bits: number
    ) {
        /**
         * Is the immediate a string, that needs to be converted
         * to a number?
         */
        if (typeof immediate === "number") {
            this.addInstruction(instruction | signExtend(immediate, bits));
            return;
        }

        if (this.isNumber(immediate)) {
            immediate = parseStrInt(immediate, bits);
            this.addInstruction(instruction | signExtend(immediate, bits));
            return;
        }

        /**
         * Is the immediate a string, that is a label, which needs
         * to be resolved? If we are here, we know that the immediate
         * is not a number.
         */

        if (this.labels.has(immediate)) {
            instruction |= signExtend(this.labels.get(immediate)!, bits);
            this.addInstruction(instruction);
            return;
        }

        /**
         * Is the immediate a label, which has yet to be resolved?
         * We need to create a future instruction, which will be resolved
         * when the label is added.
         */
        const obj = {
            addr: this.memory.length,
            instruction: (val: number) =>
                (instruction |= signExtend(val, bits)),
        };

        /**
         * Add a placeholder to the memory, so that we can
         * resolve the instruction later.
         */
        this.memory.push(0);

        const future = this.futureInstructions.get(immediate) ?? [];
        this.futureInstructions.set(immediate, [...future, obj]);
    }

    /**
     * Add an instruction with an offset value.
     * @param instruction {number} the instruction to add
     * @param offset {number | string} the label/offset to add
     * @param bits {number} the number of bits in the offset
     * @returns
     */
    public addOffsetInstruction(
        instruction: number,
        offset: number | string,
        bits: number
    ) {
        /**
         * Is the offset a string, that needs to be converted
         * to a number?
         */
        if (typeof offset === "number") {
            this.addInstruction(instruction | signExtend(offset, bits));
            return;
        }

        if (this.isNumber(offset)) {
            offset = parseStrInt(offset, bits);
            this.addInstruction(instruction | signExtend(offset, bits));
            return;
        }

        /**
         * If we are here, we know that the offset is a label.
         * We need to check if the label has been resolved.
         */
        if (this.labels.has(offset)) {
            // This is in the past, so we need to calculate the offset
            // minus one to overcome the PC increment
            let offsetAddr = this.labels.get(offset)! - this.memory.length - 1;
            instruction |= signExtend(offsetAddr, bits);
            this.addInstruction(instruction);
            return;
        }

        /**
         * If we are here, we know that the offset is a label,
         * which has yet to be resolved. We need to create a
         * future instruction, which will be resolved when the
         * label is added.
         */

        const obj = {
            addr: this.memory.length,
            instruction: (labelValue: number) => {
                // Again, the PC increment is the issue here
                let offsetAddr = labelValue - this.memory.length + 1;
                return (instruction |= signExtend(offsetAddr, bits));
            },
        };

        this.memory.push(0); // placeholder

        const future = this.futureInstructions.get(offset) ?? [];
        this.futureInstructions.set(offset, [...future, obj]);
    }

    /**
     * This adds a label to the program. This will allow
     * us to resolve past instructions, which are waiting
     * for the label to be added.
     * @param label {string}
     * @param emptyLine {boolean} marks if the label is on an empty line
     */
    public addLabel(label: string, emptyLine: boolean = false) {
        // We need to add one to the length, as the label
        // is being added before the corresponding instruction
        // is
        this.labels.set(label, this.memory.length + (emptyLine ? 0 : 1));

        if (this.futureInstructions.has(label)) {
            this.futureInstructions.get(label)!.forEach((obj) => {
                this.memory[obj.addr] = obj.instruction(
                    this.labels.get(label)!
                );
            });

            this.futureInstructions.delete(label);
        }
    }

    /**
     * Get the memory of the program.
     * @returns {number[]} the memory of the program
     */
    public getMemory(): number[] {
        if (!this.origin) {
            throw new Error("Origin not set");
        }

        return this.memory;
    }

    /**
     * Returns the origin of the program.
     * @returns {number} the origin of the program
     */
    public getOrigin(): number {
        if (!this.origin) {
            throw new Error("Origin not set");
        }

        return this.origin;
    }

    /**
     * Gets the symbol table of the program.
     * @returns {Map<string, number>} the labels of the program
     */
    public getSymbolTable(): Map<string, number> {
        return this.labels;
    }
}
