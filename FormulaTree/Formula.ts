import {AtomSet} from "./AtomSet";
import {Valuation} from "./Valuation";

export enum FormulaType { T_TRUE, T_FALSE, T_ATOM, T_NOT, T_AND, T_OR, T_IMP, T_IFF }

export abstract class Formula {
    abstract print(): void;
    abstract getType(): FormulaType;
    abstract equals(f: Formula): boolean;
    abstract getAtoms(atoms: AtomSet): void;
    abstract evaluate(v: Valuation): boolean;
    abstract substitution(a: Formula, b: Formula): Formula;

    public LogicConsequence(f: Formula): boolean {
        let v: Valuation;
        let atoms: AtomSet;

        v = new Valuation();
        atoms = new AtomSet();

        this.getAtoms(atoms);
        f.getAtoms(atoms);
        v.init(atoms);

        do {
            if (this.evaluate(v) && !f.evaluate(v))
                return false;
        }
        while (v.nextValuation());

        return true;
    }

    public LogicEquivalence(f: Formula): boolean {
        let v: Valuation;
        let atoms: AtomSet;

        v = new Valuation();

        atoms = new AtomSet();

        this.getAtoms(atoms);
        f.getAtoms(atoms);
        v.init(atoms);

        do {
            if (this.evaluate(v) != f.evaluate(v))
                return false;
        }
        while (v.nextValuation());

        return true;
    }
}
