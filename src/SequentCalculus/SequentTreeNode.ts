/**
 * Created by enco on 20.9.16..
 */
import {Sequent} from "./Sequent";

export enum Rule { L_AND, L_OR, L_IMP, L_NOT, R_AND, R_OR, R_NOT, R_IMP, ASS, AXIOM, NONE }

export class SequentTreeNode {
    private _sequent: Sequent;
    private _children: SequentTreeNode[];
    private _rule: Rule;

    constructor(sequent?: Sequent, children?: SequentTreeNode[], rule?: Rule) {
        this._sequent = sequent;
        this._children = children;
        this._rule = rule;
    }

    get rule():Rule {
        return this._rule;
    }

    set rule(value:Rule) {
        this._rule = value;
    }

    get sequent():Sequent {
        return this._sequent;
    }

    set sequent(value:Sequent) {
        this._sequent = value;
    }

    get children():SequentTreeNode[] {
        return this._children;
    }

    set children(value:SequentTreeNode[]) {
        this._children = value;
    }

    public toString = ():string => {
        let s = 'SequentTreeNode{';
        s += this._sequent.toString();
        if (this._children) {
            s+= '; children: [';
            s += this._children.toString() + '] ';

        }
        return s + ', rule: + ' + this._rule + '}';
    }
}