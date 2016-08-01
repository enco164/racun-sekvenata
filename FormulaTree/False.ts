import {LogicalConstant} from './LogicalConstant'
import {FormulaType} from './Formula'
/**
 * False
 */
class False extends LogicalConstant{
    
    public getType(): FormulaType
    {
        return FormulaType.T_FALSE;
    }

    public evaluate(): boolean 
    {
        return false;
    }

    public toString = ():string => {
        return '⊥';
    }

    public print():string 
    {
        return this.toString();
    }
}