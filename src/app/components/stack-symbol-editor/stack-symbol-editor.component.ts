import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { StackSymbol, StackOperation } from "../../classes/stack-symbol";

@Component({
  selector: "app-stack-symbol-editor",
  templateUrl: "./stack-symbol-editor.component.html",
  styleUrls: ["./stack-symbol-editor.component.scss"]
})
export class StackSymbolEditorComponent implements OnInit {
  @Input() symbol: StackSymbol;
  @Output() modelChanged = new EventEmitter();

  readonly stackOperation: typeof StackOperation = StackOperation;

  constructor() {}

  ngOnInit(): void {}

  onModelChanged() {
    console.log("StackSymbolEditorComponent onModelChanged ");
    this.modelChanged.emit();
  }
}
