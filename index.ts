import {Not} from "./FormulaTree/Not";
import {True} from "./FormulaTree/True";
console.log((new Not(new True())).toString());
