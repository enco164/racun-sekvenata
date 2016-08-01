import {Formula} from "./Formula";
import {AtomSet} from "./AtomSet";

export abstract class UnaryConjective extends Formula
{
    private _operand: Formula;
    constructor(operand: Formula) {
        super();
        this._operand = operand;
    }

    get operand():Formula {
        return this._operand;
    }

    equals(f: Formula):boolean {
        return f.getType() === this.getType() &&
            this._operand.equals((<UnaryConjective>f).operand);
    }

    getAtoms(atoms: AtomSet):void {
        this._operand.getAtoms(atoms);
    }
}