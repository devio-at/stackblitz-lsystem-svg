import { Component, OnInit, Input, SimpleChange } from "@angular/core";
import { SymbolCollection } from "../../classes/symbol-collection";
import { Symbol, SymbolType } from "../../classes/symbol";
import { SvgHdc } from "../../classes/svg-hdc";
import { GraphState } from "../../classes/graph-state";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { GrammarSelectionService } from "../../grammar-selection.service";

@Component({
  selector: "app-symbol-graph",
  templateUrl: "./symbol-graph.component.html",
  styleUrls: ["./symbol-graph.component.scss"]
})
export class SymbolGraphComponent implements OnInit {
  @Input()
  grammar: SymbolCollection;

  viewBox = "0 0 100 100";

  level: number = 0;

  symbolCount: number;
  symbolString: string;
  symbolSvg: SafeHtml;

  private symbols: Symbol[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private grammarSelectionService: GrammarSelectionService
  ) {
    grammarSelectionService.grammarSelected$.subscribe(g => {
      this.reset();
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    console.log("SymbolGraphComponent ngOnChanges " + log.join(", "));

    this.calcGraph();
  }

  private calcGraph() {
    var s = this.grammar.getStart();
    console.log("start = " + JSON.stringify(s) + " level = " + this.level);

    if (s) this.symbols = this.grammar.deriveMulti(this.level, [s]);
    else this.symbols = [];

    this.symbolCount = this.symbols.length;
    this.symbolString = this.symbols.map(s => s.symbol).join("");

    this.executeSymbols();
  }

  onLevelChanged() {
    console.log("onLevelChanged");
    this.calcGraph();
  }

  update() {
    console.log("update");
    this.calcGraph();
  }

  private reset() {
    console.log("reset");
    this.viewBox = "0 0 100 100";
    this.level = 1;
    this.calcGraph();
  }

  executeSymbols() {
    var hdc = new SvgHdc();
    var gsCalc = new GraphState(hdc, this.grammar);
    gsCalc.execSymbols(this.symbols);

    /*for (var s of this.symbols) {
      s.execAction(hdc, gsCalc);
    }*/

    console.log(gsCalc.getViewBox(1));

    const scale = 100;

    this.viewBox = gsCalc.getViewBox(scale);

    hdc = new SvgHdc();
    hdc.scale = scale; // calc from gsCalc!
    var gs = new GraphState(hdc, this.grammar);
    gs.execSymbols(this.symbols);

    /*for (var s of this.symbols) {
      s.execAction(hdc, gs);
    }*/

    this.symbolSvg = hdc.toString();

    /*
    var svg = hdc.toString();
    svg = `<g transform="translate(0,${gs.getMaxY() * scale})">
    <g transform="scale(1,-1)">
    ${svg}</g></g>`;
    this.symbolSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
    */
    //console.log(svg);
  }
}
