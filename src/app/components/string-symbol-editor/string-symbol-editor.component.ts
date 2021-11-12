import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { StringSymbol } from "../../classes/string-symbol";

@Component({
  selector: "app-string-symbol-editor",
  templateUrl: "./string-symbol-editor.component.html",
  styleUrls: ["./string-symbol-editor.component.scss"]
})
export class StringSymbolEditorComponent implements OnInit {
  @Input() symbol: StringSymbol;
  @Output() modelChanged = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onModelChanged() {
    console.log("StringSymbolEditorComponent onModelChanged ");
    this.modelChanged.emit();
  }
}
