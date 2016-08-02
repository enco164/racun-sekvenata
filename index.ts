import {Not} from "./FormulaTree/Not";
import {True} from "./FormulaTree/True";
import {False} from "./FormulaTree/False";
import {Iff} from "./FormulaTree/Iff";
import {Imp} from "./FormulaTree/Imp";
import {Atom} from "./FormulaTree/Atom";
import {And} from "./FormulaTree/And";
import {Or} from "./FormulaTree/Or";
import {Formula} from "./FormulaTree/Formula";
import {AtomSet} from "./FormulaTree/AtomSet";
import {Valuation} from "./FormulaTree/Valuation";

let p1 = new Atom(1);
let p2 = new Atom(2);
let p3 = new Atom(7);

let formula = new Iff(new Imp(new And(new False(), p1), new Or(p2, p3)), new Not(new True()));
console.log('Formula: ' + formula.toString());

let atoms = new AtomSet();
formula.getAtoms(atoms);
console.log(atoms.toArray());

let valuation = new Valuation();
valuation.init(atoms);
do {valuation.print();} while (valuation.nextValuation());