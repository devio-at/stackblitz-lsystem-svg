import { Symbol } from './symbol';
import { SymbolFactory } from './symbol-factory';

export class SymbolCollection {
    name: string;
    startSymbol: string;
    startDegree: number = 0;
    backColor: string = "white";
    symbols: Symbol[] = [];

    constructor(init?: Partial<SymbolCollection>) {
        Object.assign(this, init);
        this.symbols = [];
        if (init?.symbols) {
            for (var s of init?.symbols) {
                var symbol = SymbolFactory.createFrom(s);
                if (symbol) {
                    symbol.normalize();
                    this.symbols.push(symbol);
                }
            }
        }
    }

    delete(s: Symbol) {
        if (this.startSymbol == s.symbol)
            this.startSymbol = null;

        for (var i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i] === s) {
                this.symbols.splice(i, 1);
                break;
            }
        }
    }

    getStart(): Symbol {
        return this.getSymbol(this.startSymbol);
    }

    getSymbol(symbol: string): Symbol {
        return this.symbols.find(s => s.symbol == symbol);
    }

    normalizeSymbols() {
        for (var s of this.symbols) s.normalize();
    }

    deriveMulti(count: number, sequence: Symbol[]): Symbol[] {
        var s = sequence;
        while (count > 0) {
            s = this.derive(s);
            count--;
        }
        return s;
    }

    derive(sequence: Symbol[]): Symbol[] {
        var result: Symbol[] = [];
        sequence.forEach(symbol => {
            if (symbol.derivation) {
                for (var c of symbol.derivation.split("")) {
                    var sd = this.getSymbol(c);
                    if (sd) {
                        result.push(sd);
                    }
                }
            }
        });
        return result;
    }
}
