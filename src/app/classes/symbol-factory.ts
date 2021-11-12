import { Symbol, SymbolType } from './symbol';
import { LineSymbol } from './line-symbol';
import { AngleSymbol } from './angle-symbol';
import { StackSymbol } from './stack-symbol';
import { StringSymbol } from './string-symbol';

export class SymbolFactory {
    static createFrom(source: Partial<Symbol>): Symbol {
        switch (source?.type as SymbolType) {
            case SymbolType.Line:
                return new LineSymbol(source);
                break;
            case SymbolType.Angle:
                return new AngleSymbol(source);
                break;
            case SymbolType.Stack:
                return new StackSymbol(source);
                break;
            case SymbolType.String:
                return new StringSymbol(source);
                break;
        }
        return null;
    }
}