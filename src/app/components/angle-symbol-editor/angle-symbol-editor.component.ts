import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AngleSymbol, DirectionType } from "../../classes/angle-symbol";

@Component({
  selector: "app-angle-symbol-editor",
  templateUrl: "./angle-symbol-editor.component.html",
  styleUrls: ["./angle-symbol-editor.component.scss"]
})
export class AngleSymbolEditorComponent implements OnInit {
  @Input() symbol: AngleSymbol;
  @Output() modelChanged = new EventEmitter();

  readonly directionType: typeof DirectionType = DirectionType;

  constructor() {}

  ngOnInit(): void {}

  onModelChanged() {
    console.log("AngleSymbolEditorComponent onModelChanged ");
    this.modelChanged.emit();
  }
}
