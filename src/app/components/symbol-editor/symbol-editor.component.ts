import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  Output,
  EventEmitter
} from "@angular/core";
import { Symbol, SymbolType } from "../../classes/symbol";
import { FormGroup, FormBuilder } from "@angular/forms";
import { LineSymbol } from "../../classes/line-symbol";
import { StackSymbol } from "../../classes/stack-symbol";
import { AngleSymbol } from "../../classes/angle-symbol";
import { StringSymbol } from "../../classes/string-symbol";

@Component({
  selector: "app-symbol-editor",
  templateUrl: "./symbol-editor.component.html",
  styleUrls: ["./symbol-editor.component.scss"]
})
export class SymbolEditorComponent implements OnInit, OnChanges {
  //viewModel: Symbol = new Symbol({});

  readonly symbolType: typeof SymbolType = SymbolType;

  /*form: FormGroup = this.formBuilder.group({
    type: [null],
    symbol: [null],
  });  */

  /*
  symbol: string;
      derivation: string;
      derivationFreq: number; // { * 100}
      type: SymbolType;
      */

  @Input() symbol: Symbol;
  /*angleSymbol: AngleSymbol;
  lineSymbol: LineSymbol;
  stackSymbol: StackSymbol;
  stringSymbol: StringSymbol;*/

  @Output() modelChanged = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    /*const log: string[] = [];
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
    this.changeLog.push(log.join(', '));*/

    console.log("symbol: " + JSON.stringify(this.symbol));
    //console.log("lineSymbol: " + JSON.stringify(this.lineSymbol));
  }

  onModelChanged() {
    console.log("SymbolEditorComponent onModelChanged");
    this.modelChanged.emit();
  }
}
