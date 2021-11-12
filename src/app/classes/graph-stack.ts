export class GraphStack {
    private stack: GraphStackEntry[] = [];

    push(x?: number, y?: number, degree?: number, pen?: any) {

        var data = new GraphStackEntry({
            x, y, degree, pen
        });
        //console.log("push " + JSON.stringify(data));

        this.stack.push(data);
    }

    pop(): GraphStackEntry {

        if (this.stack.length === 0) return null;

        var result = this.stack.pop();
        //console.log("pop " + JSON.stringify(result));

        return result;
    }

    freeAll(): void {
        this.stack.length = 0;
    }
}


export class GraphStackEntry {
    x?: number;
    y?: number;
    degree?: number;
    pen?: any;

    public constructor(init?: Partial<GraphStackEntry>) {
        Object.assign(this, init);
    }
}