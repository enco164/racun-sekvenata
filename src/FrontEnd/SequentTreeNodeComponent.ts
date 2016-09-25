/**
 * Created by enco on 25.9.16..
 */
import {SequentTreeNode} from "../SequentCalculus/SequentTreeNode";
import {SequentProver} from "../SequentCalculus/SequentProver";

export class SequentTreeNodeController {
    public sequentTreeNode: SequentTreeNode;

    constructor() {}

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

                <p class="text-center" style="margin: 24px; border-top: 3px solid #5c5c5c;">{{$ctrl.sequentTreeNode.niceOutput()}}</p>
                <div><button ng-click="$ctrl.onAuto()">Auto</button></div>
            </div>
        `;
    }

}