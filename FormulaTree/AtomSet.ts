import * as Collections from "typescript-collections";
import {Atom} from "./Atom";

export class AtomSet extends Collections.Set<number>{

    constructor() {
        super((atom) => {
            return '' + atom + ' ';
        });
    }
}
