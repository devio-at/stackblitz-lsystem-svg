import {
  Component,
  OnInit,
  SimpleChange,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { SymbolCollection } from "../../classes/symbol-collection";
import { Symbol, SymbolType } from "../../classes/symbol";
import { LineSymbol } from "../../classes/line-symbol";
import { AngleSymbol } from "../../classes/angle-symbol";
import { StackSymbol } from "../../classes/stack-symbol";
import { StringSymbol } from "../../classes/string-symbol";
import { FileSaverService } from "ngx-filesaver";
import {
  ConfirmDialogModel,
  ConfirmDialogComponent
} from "../confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { GrammarSelectionService } from "../../grammar-selection.service";

@Component({
  selector: "app-grammar-editor",
  templateUrl: "./grammar-editor.component.html",
  styleUrls: ["./grammar-editor.component.scss"]
})
export class GrammarEditorComponent implements OnInit {
  @Input("grammar") viewModel: SymbolCollection;
  @Output() modelChanged = new EventEmitter<SymbolCollection>();
  @Output() copyGrammar = new EventEmitter<SymbolCollection>();

  grammarDescription: string;

  newSymbol: string;
  currentSymbol: Symbol;

  types: string[];
  type: string;

  readonly symbolType: typeof SymbolType = SymbolType;

  constructor(
    private fileSaverService: FileSaverService,
    public dialog: MatDialog,
    private gss: GrammarSelectionService
  ) {
    this.types = [];
    for (var v in SymbolType) {
      if (typeof SymbolType[v] === "number") this.types.push(v);
    }
  }

  ngOnInit(): void {}

  isValidNewSymbol = false;

  calcIsValidNewSymbol(value): void {
    console.log("calcIsValidNewSymbol " + value);
    var newsym = value || "";
    this.isValidNewSymbol =
      newsym.length > 0 &&
      this.viewModel &&
      this.viewModel.symbols &&
      this.viewModel.symbols.filter((s, i) => s.symbol === newsym).length == 0;
  }

  createNewSymbol(): void {
    var s: Symbol = null;

    switch (this.type) {
      case SymbolType[SymbolType.Line]:
        s = new LineSymbol({ symbol: this.newSymbol });
        break;
      case SymbolType[SymbolType.Angle]:
        s = new AngleSymbol({ symbol: this.newSymbol });
        break;
      case SymbolType[SymbolType.Stack]:
        s = new StackSymbol({ symbol: this.newSymbol });
        break;
      case SymbolType[SymbolType.String]:
        s = new StringSymbol({ symbol: this.newSymbol });
        break;
    }
    console.log("createNewSymbol " + JSON.stringify(s));
    this.viewModel.symbols.push(s);
    this.currentSymbol = s;
    this.newSymbol = "";
    this.isValidNewSymbol = false;
    this.onModelChanged();
  }

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
    console.log("GrammarEditorComponent ngOnChanges " + log.join(", "));
  }

  logAll() {
    console.log(JSON.stringify(this.viewModel));
  }

  onModelChanged() {
    console.log("GrammarEditorComponent onModelChanged");
    this.modelChanged.emit(this.viewModel);

    setTimeout(() => {
      this.grammarDescription = JSON.stringify(this.viewModel, null, 2);
    }, 0);
  }

  btnDownload() {
    const fileName = this.viewModel.name + ".json";
    const fileType = this.fileSaverService.genType(fileName);
    const txtBlob = new Blob([JSON.stringify(this.viewModel)], {
      type: fileType
    });
    this.fileSaverService.save(txtBlob, fileName);
  }

  btnCopy() {
    this.copyGrammar.emit(this.viewModel);
  }

  btnDeleteGrammar() {
    const message = `Are you sure you want to delete grammar "${
      this.viewModel.name
    }"?`;

    const dialogData = new ConfirmDialogModel("Delete Grammar", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.gss.deleteGrammar(this.viewModel);
      }
    });
  }

  btnDeleteSymbol() {
    const message = `Are you sure you want to delete symbol "${
      this.currentSymbol.displayName
    }"?`;

    const dialogData = new ConfirmDialogModel("Delete Symbol", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.viewModel.delete(this.currentSymbol);
        this.currentSymbol = null;
        this.onModelChanged();
      }
    });
  }
}
