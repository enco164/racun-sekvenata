import {Formula} from "./Formula";
import {AtomSet} from "./AtomSet";
import {FormulaType} from "./Formula";

export abstract class BinaryConjective extends Formula {

    private _operand1: Formula;
    private _operand2: Formula;

    constructor(operand1:Formula, operand2:Formula) {
        super();
        this._operand1 = operand1;
        this._operand2 = operand2;
    }

    get operand1():Formula {
        return this._operand1;
    }
    get operand2():Formula {
        return this._operand2;
    }


    equals(f:Formula):boolean {
        return (f.getType() === this.getType() &&
            this._operand1.equals((f as BinaryConjective).operand1)&&
            this._operand2.equals((f as BinaryConjective).operand2));
    }

    getAtoms(atoms:AtomSet):void {
        this._operand1.getAtoms(atoms);
        this._operand2.getAtoms(atoms);
    }
}
