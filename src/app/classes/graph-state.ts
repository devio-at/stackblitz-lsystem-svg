import { Hdc } from './hdc';
import { GraphStack } from './graph-stack';
import { SymbolCollection } from './symbol-collection';
import { Symbol } from './symbol';

export class GraphState {

  private degree: number;  // { 0 = ost; 90 = nord }
  private x: number;
  private y: number;
  private minX: number;
  private minY: number;
  private maxX: number;
  private maxY: number;
  private stack: GraphStack;
  private hdcWindow: Hdc;
  private grammar: SymbolCollection;

  private currentPen: any;
  symbolProperties = {};
  private nullPen = new Object();

  public constructor(hdcWindow: Hdc, grammar: SymbolCollection) {
    this.hdcWindow = hdcWindow;
    this.grammar = grammar;
    this.stack = new GraphStack();
    this.resetAll();
  }

  public getViewBox(scale: number): string {
    console.log("getViewBox " + `${this.minX * scale} ${this.minY * scale} ${this.maxX * scale} ${this.maxY * scale}`);

    if (`${this.minX * scale}` == `${this.maxX * scale}`) {
      this.maxX = this.minX + (this.maxY - this.minY);
    }
    if (`${this.minY * scale}` == `${this.maxY * scale}`) {
      this.maxY = this.minY + (this.maxX - this.minX);
    }
    console.log("getViewBox " + `${this.minX * scale} ${this.minY * scale} ${(this.maxX - this.minX) * scale} ${(this.maxY - this.minY) * scale}`);
    return `${this.minX * scale} ${this.minY * scale} ${(this.maxX - this.minX) * scale} ${(this.maxY - this.minY) * scale}`;
  }

  public getMaxY(): number { return this.maxY; }

  private readonly PiBy180 = Math.PI / 180;

  private resetAll() {
    this.degree = 0;
    this.x = 0;
    this.y = 0;
    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.stack.freeAll();
  }

  turnRight(degrees: number) {
    if (!degrees) return;
    this.degree -= degrees;
    while (this.degree < 0)
      this.degree += 360;
  }
  turnLeft(degrees: number) {
    if (!degrees) return;
    this.degree += degrees;
    while (this.degree >= 360)
      this.degree -= 360;
  }

  go(dist: number) {
    this.hdcWindow.moveTo(this.x, this.y);

    this.x = this.x + dist * Math.cos(this.degree * this.PiBy180);
    this.y = this.y + dist * Math.sin(this.degree * this.PiBy180);

    if (this.x < this.minX) this.minX = this.x;
    if (this.x > this.maxX) this.maxX = this.x;
    if (this.y < this.minY) this.minY = this.y;
    if (this.y > this.maxY) this.maxY = this.y;

    this.hdcWindow.lineTo(this.x, this.y);
  }

  execActions(symbols: string) {
    if (!symbols) return;

    for (var s of symbols.split("")) {
      var symbol = this.grammar.getSymbol(s);
      if (symbol)
        symbol.execAction(this);
    }
  }

  public execSymbols(symbols: Symbol[]) {
    for (var s of symbols) {
      s.execAction(this);
    }
  }

  createPen(width: number, color: string, lineCap?: string): any {
    return this.hdcWindow.createPen(width, color, lineCap);
  }

  setPen(pen: any): any {
    this.currentPen = pen;
    return this.hdcWindow.setPen(pen);
  }

  push(pushPosition: boolean, pushDirection: boolean, pushPen: boolean) {

    this.stack.push(pushPosition ? this.x : null,
      pushPosition ? this.y : null,
      pushDirection ? this.degree : null, 
      pushPen && this.currentPen ? this.currentPen : this.nullPen);
  }

  pop() {

    var entry = this.stack.pop();
    if (!entry) return;

    if (entry.x !== null) this.x = entry.x;
    if (entry.y !== null) this.y = entry.y;
    if (entry.degree !== null) this.degree = entry.degree;
    if (entry.pen !== this.nullPen) this.currentPen = entry.pen;
  }
}
