/**
 * Created by enco on 20.9.16..
 */
import {Formula} from '../FormulaTree/Formula';
import {And} from "../FormulaTree/And";
import {Or} from "../FormulaTree/Or";
import {Imp} from "../FormulaTree/Imp";
import {Not} from "../FormulaTree/Not";

export class Sequent {
    private _left: Formula[];
    private _right: Formula[];

    constructor(left: Formula[], right: Formula[]){
        this._left = [];
        if (left) {
            for (let i = 0; i < left.length; i++) {
                this._left.push(left[i]);
            }
        }

        this._right = [];
        if (right) {
            for (let i = 0; i < right.length; i++) {
                this._right.push(right[i]);
            }
        }
    }

    leftConjunction(idx: number): Sequent[] {
        let c: And = (<And>this._left[idx]);
        let cloneObj = new (<any>this).constructor(this._left, this._right);
        cloneObj.left.splice(idx, 1, c.operand1, c.operand2);
        return [cloneObj];
    }

    rightConjunction(idx: number): Sequent[] {
        let c: And = (<And>this._right[idx]);
        let cloneObj1 = new (<any>this).constructor(this._left, this._right);
        let cloneObj2 = new (<any>this).constructor(this._left, this._right);

        let right1 = cloneObj1.right;
        right1.splice(idx, 1,c.operand1);
        cloneObj1.right = right1;

        let right2 = cloneObj2.right;
        right2.splice(idx, 1, c.operand2);
        cloneObj2.right = right2;

        return [cloneObj1, cloneObj2];
    }

    leftDisjunction(idx: number): Sequent[] {
        let d: Or = (<Or>this._left[idx]);
        let cloneObj1 = new (<any>this).constructor(this._left, this._right);
        let cloneObj2 = new (<any>this).constructor(this._left, this._right);

        let left1 = cloneObj1.left;
        left1.splice(idx, 1, d.operand1);
        cloneObj1.left = left1;

        let left2 = cloneObj2.left;
        left2.splice(idx, 1, d.operand2);
        cloneObj2.left = left2;

        return [cloneObj1, cloneObj2];
    }

    rightDisjunction(idx: number): Sequent[] {
        let d: Or = (<Or>this._right[idx]);
        let cloneObj = new (<any>this).constructor(this._left, this._right);

        let right = cloneObj.right;
        right.splice(idx, 1, d.operand1, d.operand2);
        cloneObj.right = right;

        return [cloneObj];
    }

    leftImplication(idx: number): Sequent[] {
        let i: Imp = (<Imp>this._left[idx]);
        let cloneObj1 = new (<any>this).constructor(this._left, this._right);
        let cloneObj2 = new (<any>this).constructor(this._left, this._right);

        let left1 = cloneObj1.left;
        left1.splice(idx, 1);
        let right1 = cloneObj1.right;
        right1.push(i.operand1);
        cloneObj1.left = left1;
        cloneObj1.right = right1;

        let left2 = cloneObj2.left;
        left2.splice(idx, 1, i.operand2);
        cloneObj2.left = left2;

        return [cloneObj1, cloneObj2];
    }

    rightImplication(idx: number): Sequent[] {
        let i: Imp = (<Imp>this._right[idx]);
        let cloneObj = new (<any>this).constructor(this._left, this._right);

        let left = cloneObj.left;
        left.push(i.operand1);

        let right = cloneObj.right;
        right.splice(idx, 1, i.operand2);

        cloneObj.left = left;
        cloneObj.right = right;

        return [cloneObj];
    }

    leftNegation(idx: number): Sequent[] {
        let n: Not = (<Not>this._left[idx]);
        let cloneObj = new (<any>this).constructor(this._left, this._right);

        let right = cloneObj.right;
        right.push(n.operand);
        let left = cloneObj.left;
        left.splice(idx, 1);
        cloneObj.left = left;
        cloneObj.right = right;

        return [cloneObj];
    }


    rightNegation(idx: number): Sequent[] {
        let n: Not = (<Not>this._right[idx]);
        let cloneObj = new (<any>this).constructor(this._left, this._right);

        let left = cloneObj.left;
        left.push(n.operand);
        let right = cloneObj.right;
        right.splice(idx, 1);
        cloneObj.left = left;
        cloneObj.right = right;

        return [cloneObj];
    }
    
    leftWeakening(idx: number): Sequent[] {
        let cloneObj = new (<any>this.constructor(this._left, this._right));

        let left = cloneObj.left;
        left.splice(idx, 1);
        cloneObj.left = left;

        return [cloneObj];
    }

    rightWeakening(idx: number): Sequent[] {
        let cloneObj = new (<any>this.constructor(this._left, this._right));

        let right = cloneObj.right;
        right.splice(idx, 1);
        cloneObj.right = right;

        return [cloneObj];
    }

    get left():Formula[] {
        return this._left;
    }

    set left(value:Formula[]) {
        this._left = value;
    }

    get right():Formula[] {
        return this._right;
    }

    set right(value:Formula[]) {
        this._right = value;
    }

    public toString = ():string => {
        var s = 'Sequent{';

        if (this._left) {
            s += 'left: [';
            s += this._left.toString() + '],';
        }

        if (this._right) {
            s+=  'right: [';
                s += this._right.toString() + ']';
        }

        s += '}';
        return s;
    };

    public  niceOutput = ():string => {
        var s = '';
        s += this._left.toString();
        s += " ⊦ ";
        s += this.right.toString();

        return s;
    }
}