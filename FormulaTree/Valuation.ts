import {AtomSet} from './AtomSet';

export class Valuation {
    public value: {[key: number]: boolean} = {};

    constructor(){}

    public init(atoms: AtomSet): void 
    {
        this.value = {};

        for (let atom of atoms.getAtomSet()) {
            this.value[atom] = false;
        }
    }

    public nextValuation(): boolean  
    {
        for (var key in this.value) {
            let oldValue:boolean = this.value[key];
            let newValue:boolean = !oldValue;
            this.value[key] = newValue;
            if (newValue === true) {
                return true;
            }
        }
        return false;
    }

    public  getValueOfAtom(i: number):boolean
    {
        return this.value[i];
    }

    public setValueOfAtom(i: number, b: boolean):void
    {
        this.value[i] = b;
    }

    public toString = () : string => {
        let result: string = '';
        for (var key in this.value) {
            result += this.value[key] + ' ';
        }
        return result;
    }

    public print(): void 
    {
        console.log(this.toString());
    }

}
