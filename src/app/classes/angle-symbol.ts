import { Symbol, SymbolType } from './symbol';
import { GraphState } from './graph-state';

export enum DirectionType { Left, Right };

export class AngleSymbol extends Symbol {

    degrees: number;
    direction: DirectionType;

    public constructor(init?: Partial<Symbol>) {
        super(init);
        Object.assign(this, init);
        this.type = SymbolType.Angle;
    }

    normalize() {
        if (typeof this.direction === "string")
            this.direction = <DirectionType>parseInt(this.direction);
    }

    execAction(gs: GraphState) {

        if (this.direction == DirectionType.Left)
            gs.turnLeft(this.degrees);
        else
            gs.turnRight(this.degrees);
    }
}
