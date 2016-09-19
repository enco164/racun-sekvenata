 import {Formula, FormulaType} from './Formula'
 import {AtomicFormula} from './AtomicFormula'
 import {Valuation} from './Valuation'
 import {AtomSet} from "./AtomSet";
 /**
 * Atom
 */
export class Atom extends AtomicFormula {
    private _varNum : string;
    constructor(num: string) {
        super();
        this._varNum = num;
    }

    public get varNum() : string {
        return this._varNum;
    }
    public set varNum(v : string) {
        this._varNum = v;
    }
    
    public equals(f: Formula): boolean
    {
        return f.getType() === FormulaType.T_ATOM && 
            (<Atom>f).varNum === this.varNum;
    }
    
    public getType(): FormulaType 
    {
        return FormulaType.T_ATOM;
    }


    public getAtoms(atoms: AtomSet): void
    {
        atoms.add(this._varNum);
    }

    public evaluate(v: Valuation): boolean
    {
        return v.getValueOfAtom(this._varNum);
    }

    public toString = ():string => {
        return this._varNum;
    };

    public print():void
    {
        console.log(this.toString());
    }
}