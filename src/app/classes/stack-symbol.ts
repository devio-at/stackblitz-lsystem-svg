import { Symbol, SymbolType } from './symbol';
import { GraphState } from './graph-state';

export enum StackOperation { Push, Pop }

export class StackSymbol extends Symbol {

    operation: StackOperation;
    pushPosition: boolean;
    pushDirection: boolean;
    pushPen: boolean;

    public constructor(init?: Partial<Symbol>) {
        super(init);
        Object.assign(this, init);
        this.type = SymbolType.Stack;
    }

    normalize() {

        if (typeof this.operation === "string")
            this.operation = <StackOperation>parseInt(this.operation);
    }

    execAction(gs: GraphState) {

        switch (this.operation) {
            case StackOperation.Push:
                gs.push(this.pushPosition, this.pushDirection, this.pushPen);
                break;

            case StackOperation.Pop:
                gs.pop();
                break;
        }
    }
}
