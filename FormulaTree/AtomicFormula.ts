import {Formula} from './Formula';

/**
 * AtomicFormula
 */
export abstract class AtomicFormula extends Formula{
    
    substitution(a: Formula, b: Formula): Formula 
    {
        return this.equals(a) ? b : this;
    }
}