import {AtomSet} from './AtomSet';
import * as Collections from 'typescript-collections';
import {Atom} from "./Atom";

export class Valuation {
    public value: Collections.Dictionary<number, boolean>;

    constructor(){
        this.value = new Collections.Dictionary<number, boolean>();
    }

    public init(atoms: AtomSet): void 
    {
        this.value = new Collections.Dictionary<number, boolean>();
        atoms.forEach((atom) => {this.value.setValue(atom, false)});
    }

    public nextValuation(): boolean  
    {
        let keys = this.value.keys().sort();
        for (let key of keys) {
            let oldValue = this.value.getValue(key);
            let newValue = !oldValue;
            this.value.setValue(key, newValue);
            if (newValue === true) {
                return true;
            }
        }
        return false;
    }

    public getValueOfAtom(a: number):boolean
    {
        return this.value.getValue(a);
    }

    public setValueOfAtom(a: number, b: boolean):void
    {
        this.value.setValue(a, b);
    }

    public toString(): string {
        let result: string = '';
        for (let key of this.value.keys().sort()) {
            result += this.value.getValue(key) + ' ';
        }
        return result;
    }

    public print(): void 
    {
        console.log(this.toString());
    }

}
