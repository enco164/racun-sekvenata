 import {Formula, FormulaType} from './Formula'
 import {AtomicFormula} from './AtomicFormula'
 import {Valuation} from './Valuation'
 /**
 * Atom
 */
export class Atom extends AtomicFormula {
    private _varNum : number;
    constructor(num: number) {
        super();
        this._varNum = num;
    }

    public get varNum() : number {
        return this._varNum;
    }
    public set varNum(v : number) {
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

// TODO: ovo proveriti da li moze kao u C++ da se uradi??? 
    public getAtoms(): number
    {
        return this._varNum;
    }

    public evaluate(v: Valuation): boolean
    {
        return v[this._varNum];
    }

    public toString = ():string => {
        return 'P'+this._varNum;
    };

    public print():void
    {
        console.log(this.toString());
    }
}