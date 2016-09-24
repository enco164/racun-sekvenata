import {LogicalConstant} from './LogicalConstant'
import {FormulaType} from './Formula'
/**
 * True
 */
export class True extends LogicalConstant{
    
    public getType(): FormulaType
    {
        return FormulaType.T_TRUE;
    }

    public evaluate(): boolean 
    {
        return true;
    }

    public toString(): string {
        return 'T';
    }

    public print():string 
    {
        return this.toString();
    }
}