export class AtomSet {
    public value: number[];

    constructor() {
        this.value = [];
    }

    public getAtomSet(): number[] {
        return this.value;
    }

    public setAtomSet(v: number[]): void {
        this.value = v;
    }
}
