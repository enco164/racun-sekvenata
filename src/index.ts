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
import Parser from './Parser/Parser';
import {Sequent} from './SequentCalculus/Sequent'
import {SequentTreeNode} from './SequentCalculus/SequentTreeNode'
import {Rule} from "./SequentCalculus/SequentTreeNode";
import {SequentProver} from "./SequentCalculus/SequentProver"

import angular = require('angular');
import {SeqCalcComponent} from './FrontEnd/SeqCalc';
import {SequentTreeNodeComponent} from "./FrontEnd/SequentTreeNodeComponent";
import {SequentTreeNodeController} from "./FrontEnd/SequentTreeNodeComponent";
angular.module('SequentCalculus', []);

angular.module('SequentCalculus').component('seqCalc', new SeqCalcComponent());
angular.module('SequentCalculus').component('sequentTreeNode', new SequentTreeNodeComponent());
angular.module('SequentCalculus').controller('SequentTreeNodeController', SequentTreeNodeController);
// TEST Stabla
//let p1 = new Atom('p1');
//let p2 = new Atom('p2');
//let p3 = new Atom('p3');
//let p4 = new Atom('p4');
//
//let formula = new Iff(new Imp(new And(new False(), p1), new Or(p2, p3)), new Not(new And(p4,new True())));
//console.log('Formula: ' + formula.toString());
//
//let atoms = new AtomSet();
//formula.getAtoms(atoms);
//console.log(atoms.toArray());
//
//let valuation = new Valuation();
//valuation.init(atoms);
//do {valuation.print();} while (valuation.nextValuation());
//
//// TEST Parsera
//var parser = new Parser();
//let formula2 = parser.parse('(((F->p1)->(p2\\/p3))\\/(~(p4/\\T)))');
//atoms = new AtomSet();
//formula2.getAtoms(atoms);
//valuation = new Valuation();
//valuation.init(atoms);
//do {valuation.print();} while (valuation.nextValuation());
//console.log(formula2.toString());
//
//let seq = new Sequent([parser.parse('A/\\C'), parser.parse('F')], [parser.parse('B\\/C')]);
//let stn: SequentTreeNode = SequentProver.prove(seq);
//console.log(stn.toString());
//console.log(stn.niceOutput());

