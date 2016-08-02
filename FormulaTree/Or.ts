import {Formula} from "./Formula";
import {Valuation} from "./Valuation";
import {FormulaType} from "./Formula";
import {BinaryConjective} from "./BinaryConjective";
/**
 * Created by enco on 2.8.16..
 */
export class Or extends BinaryConjective {

    constructor(operand1:Formula, operand2:Formula) {
        super(operand1, operand2);
    }

    toString(): string{
        return '(' + this.operand1.toString() + '∨' + this.operand2.toString() + ')';
    }

    print():void {
        console.log(this.toString());
    }

    getType():FormulaType {
        return FormulaType.T_OR;
    }

    evaluate(v:Valuation):boolean {
        return this.operand1.evaluate(v) || this.operand2.evaluate(v);
    }

    substitution(a:Formula, b:Formula):Formula {
        if (this.equals(a)) {
            return b;
        }
        return new Or(this.operand1.substitution(a, b), this.operand2.substitution(a, b));
    }

}