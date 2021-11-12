import { Symbol, SymbolType } from './symbol';
import { GraphState } from './graph-state';

export class LineSymbol extends Symbol {
    width?: number;
    color?: string;
    lineCap: string;

    public constructor(init?: Partial<Symbol>) {
        super(init);
        Object.assign(this, init);
        this.type = SymbolType.Line;
    }

    execAction(gs: GraphState) {

        var pen = gs.symbolProperties[this.symbol];

        if ((!pen && (this.width || this.color))
            || (pen && (this.width != pen.width || this.color != pen.color))) {
            pen = gs.createPen(this.width, this.color, this.lineCap);
            gs.symbolProperties[this.symbol] = pen;
        }

        var savePen = gs.setPen(pen);
        gs.go(1);
        gs.setPen(savePen);
    }
}
