import { Symbol, SymbolType } from './symbol';
import { GraphState } from './graph-state';

export class StringSymbol extends Symbol {

    interpretation: string;

    public constructor(init?: Partial<Symbol>) {
        super(init);
        Object.assign(this, init);
        this.type = SymbolType.String;
    }

    execAction(gs: GraphState) {
        gs.execActions(this.interpretation);
    }
}
