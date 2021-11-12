import { GraphState } from './graph-state';

export enum SymbolType {
    Line,
    Angle,
    Stack,
    String
}

export class Symbol {
    symbol: string;
    derivation: string;
    derivationFreq: number; // { * 100}
    type: SymbolType;

    get displayName(): string { return SymbolType[this.type] + " " + this.symbol; }

    constructor(init?: Partial<Symbol>) {
        Object.assign(this, init);
    }

    normalize() {
    }

    execAction(gs: GraphState) {
    }
}
