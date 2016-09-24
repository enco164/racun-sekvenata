/**
 * Created by enco on 20.9.16..
 */
import {Sequent} from "./Sequent";

export enum Rule { L_AND, L_OR, L_IMP, L_NOT, R_AND, R_OR, R_NOT, R_IMP, NONE }

export class SequentTreeNode {
    private _sequent: Sequent;
    private _parent: SequentTreeNode;
    private _children: SequentTreeNode[];
    private _rule: Rule;

    constructor(sequent?: Sequent, parent?: SequentTreeNode) {
        this._sequent = sequent;
        this._parent = parent;
        this._children = [];
        this._rule = Rule.NONE;
    }

    applyRule(rule: Rule, idx:number) {
        let sequents: Sequent[];

        this._rule = rule;

        switch (rule) {
            case Rule.L_AND:
                sequents = this._sequent.leftConjunction(idx);
                break;

            case Rule.L_OR:
                sequents = this._sequent.leftDisjunction(idx);
                break;

            case Rule.L_IMP:
                sequents = this._sequent.leftImplication(idx);
                break;

            case Rule.L_NOT:
                sequents = this._sequent.leftNegation(idx);
                break;

            case Rule.R_AND:
                sequents = this._sequent.rightConjunction(idx);
                break;

            case Rule.R_OR:
                sequents = this._sequent.rightDisjunction(idx);
                break;

            case Rule.R_IMP:
                sequents = this._sequent.rightImplication(idx);
                break;

            case Rule.R_NOT:
                sequents = this._sequent.rightNegation(idx);
                break;
        }

        for (var sequent of sequents) {
            this._children.push(new SequentTreeNode(sequent, this));
        }
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

    get parent():SequentTreeNode {
        return this._parent;
    }

    set parent(value:SequentTreeNode) {
        this._parent = value;
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
        return s + '}';
    }
}