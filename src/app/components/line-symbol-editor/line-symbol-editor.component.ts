import {
  Component,
  OnInit,
  Input,
  SimpleChange,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { LineSymbol } from "../../classes/line-symbol";

@Component({
  selector: "app-line-symbol-editor",
  templateUrl: "./line-symbol-editor.component.html",
  styleUrls: ["./line-symbol-editor.component.scss"]
})
export class LineSymbolEditorComponent implements OnInit, OnChanges {
  @Input() symbol: LineSymbol;
  @Output() modelChanged = new EventEmitter();

  constructor() {}

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
    console.log("LineSymbolEditorComponent ngOnChanges " + log.join(", "));

    console.log(
      "LineSymbolEditorComponent lineSymbol: " + JSON.stringify(this.symbol)
    );
    //console.log("lineSymbol: " + JSON.stringify(this.lineSymbol));

    this.modelChanged.emit();
  }

  onModelChanged() {
    console.log("LineSymbolEditorComponent onModelChanged ");
    this.modelChanged.emit();
  }
}
