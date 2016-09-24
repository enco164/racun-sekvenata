import {UnaryConjective} from "./UnaryConjective";
import {FormulaType} from "./Formula";
import {Valuation} from "./Valuation";
import {Formula} from "./Formula";
export class Not extends UnaryConjective {

    constructor(operand:Formula) {
        super(operand);
    }

    getType():FormulaType {
        return FormulaType.T_NOT;
    }

    evaluate(v:Valuation):boolean {
        return !this.operand.evaluate(v);
    }

    substitution(a:Formula, b:Formula):Formula {
        if (this.equals(a)) {
            return b;
        } else {
            return new Not(this.operand.substitution(a, b));
        }
    }


    public toString = ():string => {
        return '(¬' + this.operand.toString() + ')';
    };

    print():void {
        console.log(this.toString());
    }
}
