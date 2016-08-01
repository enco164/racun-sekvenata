import {AtomicFormula} from './AtomicFormula';
import {AtomSet} from './AtomSet';
import {Formula, FormulaType} from './Formula';

/**
 * LogicalConstant
 */
export abstract class LogicalConstant extends AtomicFormula{

    public getAtoms(atoms: AtomSet): void 
    {
        return ;
    }

    public equals(f: Formula):boolean
    {
        return this.getType() == f.getType();
    }
}