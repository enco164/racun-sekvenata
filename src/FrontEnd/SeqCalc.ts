/**
 * Created by enco on 25.9.16..
 */
import Parser from '../Parser/Parser';
import {Formula} from "../FormulaTree/Formula";
import {SequentTreeNode, Rule} from "../SequentCalculus/SequentTreeNode";
import {Sequent} from "../SequentCalculus/Sequent";

class SeqCalcController implements angular.IComponentController {
    public leftList: string[];
    public rightList: string[];
    public parser: Parser;
    public leftFormulas: Formula[];
    public rightFormulas: Formula[];
    public showFirstScreen: boolean;
    public sequentTreeNode;

    constructor() {
        this.parser = new Parser();
        this.leftList = ['~(A/\\B)'];
        this.rightList = ['~A \\/ ~B'];
        this.leftFormulas = [];
        this.rightFormulas = [];
        this.showFirstScreen = true;
        this.sequentTreeNode = null;
    }

    parseFormulas() {
        this.leftFormulas = [];
        this.rightFormulas = [];

        for (let i = 0; i < this.leftList.length; i++){
            this.leftFormulas.push(this.parser.parse(this.leftList[i]));
        }

        for (let i = 0; i < this.rightList.length; i++) {
            this.rightFormulas.push(this.parser.parse(this.rightList[i]));
        }

        this.sequentTreeNode = new SequentTreeNode(new Sequent(this.leftFormulas, this.rightFormulas), null, Rule.NONE);
        this.showFirstScreen = false;
    }
}

export class SeqCalcComponent implements angular.IComponentOptions {
    public controller;
    public template;

    constructor() {
        this.controller = SeqCalcController;
        this.template =
            `<div class="container" style="margin-top: 36px; margin-bottom: 36px;" ng-show="$ctrl.showFirstScreen">
    <div class="jumbotron">
      <h2>Interaktivni dokazivač u računu sekvenata</h2>
      <p class="lead">Sintaksa:</p>
      <pre>
             "F"        ⊥
             "T"        T
             \\w+       VAR
             "("        (
             ")"        )
             "~"        ¬
             "/\\"       ∧
             "\\/"       ∨
             "->"       →
             "<->"      ↔</pre>
      <p>Formule odvajati novim redom</p>
    </div>
    <div class="row">
        <div class="col-md-6">
            <h3>Leve formule</h3>
            <textarea class="form-control"  rows="6" ng-model="$ctrl.leftList" ng-list="&#10;" ng-trim="false"></textarea>
        </div>
        <div class="col-md-6">
            <h3>Desne formule</h3>
            <textarea class="form-control" rows="6" ng-model="$ctrl.rightList" ng-list="&#10;" ng-trim="false"></textarea>
        </div>
        <div class="col-md-12 text-right" style="margin-top: 8px"><button class="btn btn-primary" ng-click="$ctrl.parseFormulas()">GO!</button></div>
        <div>{{$ctrl.leftFormulas}}</div>
        <div>{{$ctrl.rightFormulas}}</div>
    </div>
</div>
<div ng-if="!$ctrl.showFirstScreen">
<button class="btn btn-default" ng-click="$ctrl.showFirstScreen = !$ctrl.showFirstScreen">Close</button>

    <sequent-tree-node stn="$ctrl.sequentTreeNode"></sequent-tree-node>

</div>`

    }
}
