/**
 * Created by enco on 20.9.16..
 */
import {Formula} from '../FormulaTree/Formula';
import {And} from "../FormulaTree/And";
import {Or} from "../FormulaTree/Or";
import {Imp} from "../FormulaTree/Imp";
import {Not} from "../FormulaTree/Not";

export class Sequent {
    private _antecedents: Formula[];
    private _consequents: Formula[];

    constructor(antecedents: Formula[], consequents: Formula[]){
        this._antecedents = antecedents;
        this._consequents = consequents;
    }

    leftConjunction(idx: number): Sequent[] {
        let c: And = (<And>this._antecedents[idx]);
        let cloneObj = new (<any>this.constructor());
        cloneObj.antecedents().push(c.operand1, c.operand2);
        cloneObj.antecedents().splice(idx, 1);
        return [cloneObj];
    }

    rightConjunction(idx: number): Sequent[] {
        let c: And = (<And>this._consequents[idx]);
        let cloneObj1 = new (<any>this.constructor());
        let cloneObj2 = new (<any>this.constructor());

        let consequents1 = cloneObj1.consequents();
        consequents1.push(c.operand1);
        consequents1.splice(idx, 1);
        cloneObj1.consequents(consequents1);

        let consequents2 = cloneObj2.consequents();
        consequents2.push(c.operand2);
        consequents2.splice(idx, 1);
        cloneObj1.consequents(consequents2);

        return [cloneObj1, cloneObj2];
    }

    leftDisjunction(idx: number): Sequent[] {
        let d: Or = (<Or>this._antecedents[idx]);
        let cloneObj1 = new (<any>this.constructor());
        let cloneObj2 = new (<any>this.constructor());

        let antecedents1 = cloneObj1.antecedents();
        antecedents1.push(d.operand1);
        antecedents1.splice(idx, 1);
        cloneObj1.antecedents(antecedents1);

        let antecedents2 = cloneObj2.antecedents();
        antecedents2.push(d.operand2);
        antecedents2.splice(idx, 1);
        cloneObj2.antecedents(antecedents2);

        return [cloneObj1, cloneObj2];
    }

    rightDisjunction(idx: number): Sequent[] {
        let d: Or = (<Or>this._antecedents[idx]);
        let cloneObj = new (<any>this.constructor());

        let consequents = cloneObj.consequents();
        consequents.push(d.operand1);
        consequents.push(d.operand2);
        consequents.splice(idx, 1);
        cloneObj.consequents(consequents);

        return [cloneObj];
    }

    leftImplication(idx: number): Sequent[] {
        let i: Imp = (<Imp>this._antecedents[idx]);
        let cloneObj1 = new (<any>this.constructor());
        let cloneObj2 = new (<any>this.constructor());

        let antecedents1 = cloneObj1.antecedents();
        antecedents1.splice(idx, 1);
        let consequents1 = cloneObj1.consequents();
        consequents1.push(i.operand1);
        cloneObj1.antecedents(antecedents1);
        cloneObj1.consequents(consequents1);

        let antecedents2 = cloneObj2.antecedents();
        antecedents2.push(i.operand2);
        antecedents2.splice(idx, 1);
        cloneObj2.antecedents(antecedents2);

        return [cloneObj1, cloneObj2];
    }

    rightImplication(idx: number): Sequent[] {
        let i: Imp = (<Imp>this._consequents[idx]);
        let cloneObj = new (<any>this.constructor());

        let antecedents = cloneObj.antecedents();
        antecedents.push(i.operand1);

        let consequents = cloneObj.consequents();
        consequents.push(i.operand2);
        consequents.splice(idx, 1);

        cloneObj.antecedents(antecedents);
        cloneObj.consequents(consequents);

        return [cloneObj];
    }

    leftNegation(idx: number): Sequent[] {
        let n: Not = (<Not>this._antecedents[idx]);
        let cloneObj = new (<any>this.constructor());

        let consequents = cloneObj.consequents();
        consequents.push(n.operand);
        let antecedents = cloneObj.antecedents();
        antecedents.splice(idx, 1);
        cloneObj.antecedents(antecedents);
        cloneObj.consequents(consequents);

        return [cloneObj];
    }


    rightNegation(idx: number): Sequent[] {
        let n: Not = (<Not>this._consequents[idx]);
        let cloneObj = new (<any>this.constructor());

        let antecedents = cloneObj.antecedents();
        antecedents.push(n.operand);
        let consequents = cloneObj.consequents();
        consequents.splice(idx, 1);
        cloneObj.antecedents(antecedents);
        cloneObj.consequents(consequents);

        return [cloneObj];
    }

    get antecedents():Formula[] {
        return this._antecedents;
    }

    set antecedents(value:Formula[]) {
        this._antecedents = value;
    }

    get consequents():Formula[] {
        return this._consequents;
    }

    set consequents(value:Formula[]) {
        this._consequents = value;
    }
}