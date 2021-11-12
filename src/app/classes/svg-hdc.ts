import { Hdc } from './hdc';

export class SvgHdc extends Hdc {

    private lines: string[] = [];
    private x: number;
    private y: number;

    private readonly defaultColor = "white";
    private readonly defaultWidth = 2;

    scale: number = 1;

    toString(): string { return this.lines.join("\r\n");}

    moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    lineTo(x: number, y: number) {
        var styles: string[] = [];
        styles.push(`stroke:${this.pen?.color ?? this.defaultColor}`);
        styles.push(`stroke-width:${this.pen?.width ?? this.defaultWidth}`);
        if (this.pen?.lineCap)
            styles.push(`stroke-linecap:${this.pen?.lineCap}`);

        this.lines.push(`<line x1="${this.x * this.scale}" y1="${this.y * this.scale}" x2="${x * this.scale}" y2="${y * this.scale}" style="${styles.join(";")}" />`);
        this.x = x;
        this.y = y;
    }

    private pen: SvgPen;

    createPen(width: number, color: string, lineCap?: string): any {
        return new SvgPen({width, color, lineCap});
    }
    setPen(pen: any): any {
        var p = this.pen;
        this.pen = new SvgPen(pen);
        return p;
    }
}

class SvgPen {
    width: number;
    color: string;
    lineCap: string;

    public constructor(init?: Partial<SvgPen>) {
        Object.assign(this, init);
    }
}