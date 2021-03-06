/**
 * Created by enco on 25.9.16..
 */
import {SequentTreeNode} from "../SequentCalculus/SequentTreeNode";
import {SequentProver} from "../SequentCalculus/SequentProver";
import {FormulaType} from "../FormulaTree/Formula";
import {Rule} from "../SequentCalculus/SequentTreeNode";
import {Atom} from "../FormulaTree/Atom";
import {Sequent} from "../SequentCalculus/Sequent";

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
                            this.availableRules.push(Rule.WEAK);
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

    clearChilds() {
        this.sequentTreeNode.rule = Rule.NONE;
        this.sequentTreeNode.children = [];
    }

    onRule(rule) {
        let seq = this.sequentTreeNode.sequent;
        switch (rule) {
            case Rule.L_NOT:
                for (var i = 0; i < seq.left.length; i++) {
                    if (seq.left[i].getType() == FormulaType.T_NOT) {
                        this.sequentTreeNode.rule = Rule.L_NOT;
                        this.sequentTreeNode.children = [new SequentTreeNode(seq.leftNegation(i)[0], null, Rule.NONE)];
                        break;
                    }
                }
                break;
            case Rule.L_AND:
                for (var i = 0; i < seq.left.length; i++) {
                    if (seq.left[i].getType() == FormulaType.T_AND) {
                        this.sequentTreeNode.rule = Rule.L_AND;
                        this.sequentTreeNode.children = [new SequentTreeNode(seq.leftConjunction(i)[0], null, Rule.NONE)];
                        break;
                    }
                }
                break;
            case Rule.L_OR:
                for (var i = 0; i < seq.left.length; i++) {
                    if (seq.left[i].getType() == FormulaType.T_OR) {
                        this.sequentTreeNode.rule = Rule.L_OR;
                        this.sequentTreeNode.children = [new SequentTreeNode(seq.leftDisjunction(i)[0], null, Rule.NONE),
                                                        new SequentTreeNode(seq.leftDisjunction(i)[1], null, Rule.NONE)];
                        break;
                    }
                }
                break;
            case Rule.L_IMP:
                for (var i = 0; i < seq.left.length; i++) {
                    if (seq.left[i].getType() == FormulaType.T_IMP) {
                        this.sequentTreeNode.rule = Rule.L_IMP;
                        this.sequentTreeNode.children = [new SequentTreeNode(seq.leftImplication(i)[0], null, Rule.NONE),
                                                        new SequentTreeNode(seq.leftImplication(i)[0], null, Rule.NONE)];
                        break;
                    }
                }
                break;
            case Rule.R_NOT:
                for (var i = 0; i < seq.right.length; i++) {
                    if (seq.right[i].getType() == FormulaType.T_NOT) {
                        this.sequentTreeNode.rule = Rule.R_NOT;
                        this.sequentTreeNode.children = [new SequentTreeNode(seq.rightNegation(i)[0], null, Rule.NONE)];
                        break;
                    }
                }
                break;
            case Rule.R_AND:
                for (var i = 0; i < seq.right.length; i++) {
                    if (seq.right[i].getType() == FormulaType.T_AND) {
                        this.sequentTreeNode.rule = Rule.R_AND;
                        this.sequentTreeNode.children = [new SequentTreeNode(seq.rightConjunction(i)[0], null, Rule.NONE),
                                                        new SequentTreeNode(seq.rightConjunction(i)[1], null, Rule.NONE)];
                        break;
                    }
                }
                break;
            case Rule.R_OR:
                for (var i = 0; i < seq.right.length; i++) {
                    if (seq.right[i].getType() == FormulaType.T_OR) {
                        this.sequentTreeNode.rule = Rule.R_OR;
                        this.sequentTreeNode.children = [new SequentTreeNode(seq.rightDisjunction(i)[0], null, Rule.NONE)];
                        break;
                    }
                }
                break;
            case Rule.R_IMP:
                for (var i = 0; i < seq.right.length; i++) {
                    if (seq.right[i].getType() == FormulaType.T_IMP) {
                        this.sequentTreeNode.rule = Rule.R_IMP;
                        this.sequentTreeNode.children = [new SequentTreeNode(seq.rightImplication(i)[0], null, Rule.NONE)];
                        break;
                    }
                }
                break;
            case Rule.ASS:
                this.sequentTreeNode.rule = Rule.ASS;
                break;
            case Rule.WEAK:
                for (let i = 0; i < seq.left.length; i++) {
                    if (seq.left[i].getType() == FormulaType.T_ATOM) {
                        var name = (<Atom>seq.left[i]).varNum;
                        for (let j = 0; j < seq.right.length; j++) {
                            if (seq.right[j].getType() == FormulaType.T_ATOM && (<Atom>seq.right[j]).varNum == name) {
                                this.sequentTreeNode.rule = Rule.WEAK;
                                this.sequentTreeNode.children = [new SequentTreeNode(new Sequent([new Atom(name)], [new Atom(name)]), null, Rule.NONE)];
                                break;
                            }
                        }
                    }
                }
        }
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
            `

            <span ng-class="{'rule_none' : $ctrl.sequentTreeNode.rule == $ctrl.rules['ASS'] }">{{$ctrl.sequentTreeNode.niceOutput()}} &nbsp;&nbsp;&nbsp;&nbsp;
                <sup ng-if="$ctrl.sequentTreeNode.rule != $ctrl.rules['NONE']">{{$ctrl.rules[$ctrl.sequentTreeNode.rule]}}</sup>
                <button ng-if="$ctrl.rules[$ctrl.sequentTreeNode.rule] && $ctrl.sequentTreeNode.rule != $ctrl.rules['NONE']" ng-click="$ctrl.clearChilds()">&times;</button>
            </span>
            <ul>
            <li ng-if="$ctrl.sequentTreeNode.children.length > 0"><sequent-tree-node stn="$ctrl.sequentTreeNode.children[0]" ></sequent-tree-node></li>
            <li ng-if="$ctrl.sequentTreeNode.children.length == 2"><sequent-tree-node stn="$ctrl.sequentTreeNode.children[1]" ></sequent-tree-node></li>
            <li ng-if="$ctrl.sequentTreeNode.rule == $ctrl.rules['NONE']">
                <span>
                    <button ng-repeat="rule in $ctrl.rules" ng-if="$ctrl.availableRules.indexOf(rule) >= 0" ng-click="$ctrl.onRule(rule)">{{$ctrl.rules[rule]}}</button>
                    <button ng-if="$ctrl.availableRules.length > 0" ng-click="$ctrl.onAuto()">Auto</button>
                </span>
                <span ng-if="$ctrl.availableRules.length == 0" style="color: red; font-weight: 800">FAIL</span>
            </li>
            </ul>
        `;
    }

}