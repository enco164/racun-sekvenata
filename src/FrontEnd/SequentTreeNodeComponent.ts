/**
 * Created by enco on 25.9.16..
 */
import {SequentTreeNode} from "../SequentCalculus/SequentTreeNode";
import {SequentProver} from "../SequentCalculus/SequentProver";
import {FormulaType} from "../FormulaTree/Formula";
import {Rule} from "../SequentCalculus/SequentTreeNode";
import {Atom} from "../FormulaTree/Atom";

export class SequentTreeNodeController {
    public sequentTreeNode: SequentTreeNode;
    public availableRules = [];
    public rules = Rule;

    constructor() {}

    $onInit() {
        let seq = this.sequentTreeNode.sequent;
        for (let f of seq.left) {
            switch (f.getType()) {
                case FormulaType.T_AND:
                    this.availableRules.push(Rule.L_AND);
                    break;
                case FormulaType.T_FALSE:
                    this.availableRules.push(Rule.ASS);
                    break;
                case FormulaType.T_IMP:
                    this.availableRules.push(Rule.L_IMP);
                    break;
                case FormulaType.T_NOT:
                    this.availableRules.push(Rule.L_NOT);
                    break;
                case FormulaType.T_OR:
                    this.availableRules.push(Rule.L_OR);
                    break;
            }
        }

        for (let f of seq.right) {
            switch (f.getType()) {
                case FormulaType.T_AND:
                    this.availableRules.push(Rule.R_AND);
                    break;
                case FormulaType.T_TRUE:
                    this.availableRules.push(Rule.ASS);
                    break;
                case FormulaType.T_IMP:
                    this.availableRules.push(Rule.R_IMP);
                    break;
                case FormulaType.T_NOT:
                    this.availableRules.push(Rule.R_NOT);
                    break;
                case FormulaType.T_OR:
                    this.availableRules.push(Rule.R_OR);
                    break;
            }
        }

        for (var i = 0; i < seq.left.length; i++) {
            if (seq.left[i].getType() == FormulaType.T_ATOM) {
                var name = (<Atom>seq.left[i]).varNum;
                for (var j = 0; j < seq.right.length; j++) {
                    if (seq.right[j].getType() == FormulaType.T_ATOM && (<Atom>seq.right[j]).varNum == name) {
                        if (seq.left.length > 1 || seq.right.length > 1) {
                            this.availableRules.push(Rule.AXIOM);
                        } else {
                            this.availableRules.push(Rule.ASS);
                        }
                    }
                }
            }
        }
    }

    onAuto() {
        this.sequentTreeNode = SequentProver.prove(this.sequentTreeNode.sequent);
        console.log(this.sequentTreeNode);
    }
}

export class SequentTreeNodeComponent implements angular.IComponentOptions {
    public controller;
    public bindings: any;
    public template;

    constructor() {
        this.controller = SequentTreeNodeController;
        this.bindings = {
            sequentTreeNode : '<stn'
        };
        this.template =
            `<div class="container-fluid">

                <div class="row">
                    <div class="col-sm-12" ng-if="$ctrl.sequentTreeNode.children.length == 1">
                            <sequent-tree-node stn="$ctrl.sequentTreeNode.children[0]" ></sequent-tree-node>
                    </div>

                    <div ng-if="$ctrl.sequentTreeNode.children.length == 2">
                        <div class="col-sm-6">
                            <sequent-tree-node stn="$ctrl.sequentTreeNode.children[0]" ></sequent-tree-node>
                        </div>
                        <div class="col-sm-6">
                            <sequent-tree-node stn="$ctrl.sequentTreeNode.children[1]" ></sequent-tree-node>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <span style="margin: 16px; border-top: 3px solid #5c5c5c;">{{$ctrl.sequentTreeNode.niceOutput()}}</span>
                </div>
                <div>
                    <button ng-repeat="rule in $ctrl.rules" ng-if="$ctrl.availableRules.indexOf(rule) >= 0"></button>
                    <button ng-click="$ctrl.onAuto()">Auto</button>
                </div>
            </div>
        `;
    }

}