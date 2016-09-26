/**
 * Created by enco on 24.9.16..
 */

import {FormulaType} from "../FormulaTree/Formula";
import {SequentTreeNode} from './SequentTreeNode';
import {Sequent} from "./Sequent";
import {Atom} from "../FormulaTree/Atom";
import {Rule} from "./SequentTreeNode";

export class SequentProver {
    static prove(sequent: Sequent): SequentTreeNode {
        var left = sequent.left.slice();
        var right = sequent.right.slice();

        for (var i = 0; i < left.length; i++) {
            var formula = left[i];
            var type = formula.getType();
            if (type == FormulaType.T_FALSE) {
                return new SequentTreeNode(sequent, null, Rule.ASS);
            }
        }

        for (var i = 0; i < right.length; i++) {
            var formula = right[i];
            var type = formula.getType();
            if (type == FormulaType.T_TRUE) {
                return new SequentTreeNode(sequent, null, Rule.ASS);
            }
        }

                // Trazimo varijablu s obe strane i pokusavamo da izvedemo aksiomu
        for (var i = 0; i < left.length; i++) {
            if (left[i].getType() == FormulaType.T_ATOM) {
                var name = (<Atom>left[i]).varNum;
                for (var j = 0; j < right.length; j++) {
                    if (right[j].getType() == FormulaType.T_ATOM && (<Atom>right[j]).varNum == name) {
                        if (left.length > 1 || right.length > 1) {
                            var axiom = new SequentTreeNode(new Sequent([new Atom(name)], [new Atom(name)]), null, Rule.ASS);
                            return new SequentTreeNode(sequent, [axiom], Rule.AXIOM);
                        } else  // X |= X
                            return new SequentTreeNode(sequent, null, Rule.ASS);
                    }
                }
            }
        }

        // Primena implikacije
        for (var i = 0; i < right.length; i++) {
            var formula = right[i];
            var type = formula.getType();
            if (type == FormulaType.T_IMP) {
                var seq = sequent.rightImplication(i);
                return new SequentTreeNode(sequent, [this.prove(seq[0])], Rule.R_IMP);
            }
        }

        // Operatori koji vracaju jedno dete
        for (var i = 0; i < left.length; i++) {
            var formula = left[i];
            var type = formula.getType();
            if (type == FormulaType.T_NOT) {
                var seq = sequent.leftNegation(i);
                return new SequentTreeNode(sequent, [this.prove(seq[0])], Rule.L_NOT);
            } else if (type == FormulaType.T_AND) {
                var seq = sequent.leftConjunction(i);
                return new SequentTreeNode(sequent, [this.prove(seq[0])], Rule.L_AND);
            }
        }
        for (var i = 0; i < right.length; i++) {
            var formula = right[i];
            var type = formula.getType();
            if (type == FormulaType.T_NOT) {
                var seq = sequent.rightNegation(i);
                return new SequentTreeNode(sequent, [this.prove(seq[0])], Rule.R_NOT);
            } else if (type == FormulaType.T_OR) {
                var seq = sequent.rightDisjunction(i);
                return new SequentTreeNode(sequent, [this.prove(seq[0])], Rule.R_OR);
            }
        }

        // Operatori koji vracaju dva deteta
        for (var i = 0; i < left.length; i++) {
            var formula = left[i];
            var type = formula.getType();
            if (type == FormulaType.T_OR) {
                var seq = sequent.leftDisjunction(i);
                return new SequentTreeNode(sequent, [this.prove(seq[0]), this.prove(seq[1])], Rule.L_OR);
            } else if (type == FormulaType.T_IMP) {
                var seq = sequent.leftImplication(i);
                return new SequentTreeNode(sequent, [this.prove(seq[0]), this.prove(seq[1])], Rule.L_IMP);
            }
        }

        for (var i = 0; i < right.length; i++) {
            var formula = right[i];
            if (formula.getType() == FormulaType.T_AND) {
                var seq = sequent.rightConjunction(i);
                return new SequentTreeNode(sequent, [this.prove(seq[0]), this.prove(seq[1])], Rule.R_AND);
            }
        }

        // nema preostalih operatora i nije aksioma
        return new SequentTreeNode(sequent, [new SequentTreeNode(new Sequent([new Atom("FAIL")], null), null, null)], null);
    }
}
