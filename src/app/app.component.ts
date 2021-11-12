import { Component, ViewChild, ElementRef } from '@angular/core';
import { SymbolCollection } from './classes/symbol-collection';
import { DocInfo, Documents } from './classes/doc-info';
import { SymbolGraphComponent } from './components/symbol-graph/symbol-graph.component';
import { MatSelectionList, MatSelectionListChange, MatListOption } from '@angular/material/list';
import { GrammarSelectionService } from './grammar-selection.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lsystem';

  documents = new Documents();
  selectedTabIndex = 0;

  docInfo: DocInfo;         // selected from list
  grammar: SymbolCollection;// from current DocInfo

  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  @ViewChild(MatSelectionList, { static: true })
  documentList: MatSelectionList;

  @ViewChild(SymbolGraphComponent, { static: false })
  private symbolGraph: SymbolGraphComponent;

  @ViewChild("btnOpenFile", { static: true })
  private btnOpenFile: ElementRef;

  public constructor(private grammarSelectionService: GrammarSelectionService) {

    this.uploader = new FileUploader({
      //url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        console.log("uploader.formatDataFunction " + JSON.stringify(item));

        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.grammarSelectionService.deleteGrammar$.subscribe(
      g => {
        this.documents.delete(g);
        this.docInfo = null;
        this.grammar = null;
        this.grammarSelectionService.grammarSelected(this.grammar);
      }
    )
  }

  ngOnInit() {
    // from https://stackblitz.com/edit/angular-i3pfu2-6n5cnt
    this.documentList.selectionChange.subscribe((s: MatSelectionListChange) => {

      console.log("documentList.selectionChange() " + JSON.stringify(s.option.value));

      this.docInfo = s.option.value;
      this.grammar = this.docInfo.grammar;
      this.grammarSelectionService.grammarSelected(this.grammar);
      this.selectedTabIndex = 1;
    });
  }

  onModelChanged(g: SymbolCollection) {
    console.log("AppComponent onModelChanged");

    if (this.symbolGraph)
      this.symbolGraph.update();
      else
      console.log("symbolGraph is null")
  }

  onCopyGrammar(g: SymbolCollection) {
    var gcopy = new SymbolCollection(g);
    gcopy.name = gcopy.name + " " + (new Date()).toISOString();
    var doc = new DocInfo({ grammar: gcopy });
    this.documents.documents.push(doc);
    this.onDocumentSelected(doc);
  }

  onNewGrammar() {
    var doc = new DocInfo();
    doc.grammar.name = "created " + (new Date()).toISOString();

    this.documents.documents.push(doc);
    this.onDocumentSelected(doc);
  }

  onDocumentSelected(doc: DocInfo) {
    this.docInfo = doc;
    this.grammar = doc.grammar;
    this.grammarSelectionService.grammarSelected(this.grammar);
  }

  onSaveAll() {
    this.documents.save();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  async onFileDrop(e: FileList) {

    console.log("onFileDrop " + JSON.stringify(e));

    if (e.length > 0) {

      var log: string[] = [];
      var docs = this.documents;

      for (var i = 0; i < e.length; i++) {
        var f = e.item(i);
        console.log(i + " .. " + f.name + ": " + f.type + " " + f.size);

        if (f.type === "application/json") {

          try {
            var fileText = await this.readUploadedFileAsText(f);

            //var reader = new FileReader();
            //reader.onload = function () {
            try {
              var json = JSON.parse(fileText);
              if (json["name"] && json["symbols"]) {
                var g = new SymbolCollection(json);
                if (docs.hasName(g.name))
                  g.name = g.name + " " + (new Date()).toISOString();
                var doc = new DocInfo({ grammar: g });
                docs.documents.push(doc);
                log.push("File " + f.name + " added Grammar '" + g.name + "'");
              } else {
                log.push("File " + f.name + " is not a Grammar, missing properties 'name' and 'symbols'")
              }
            }
            catch (exc) {
              log.push("File " + f.name + " is not a valid JSON file: " + exc.message);
            }
          }
          catch (exc) {
            //reader.onerror = function () {
            log.push("File " + f.name + " could not be read: " + exc.message);
            //}
            //reader.readAsText(f);
          }
        } else {
          log.push("File " + f.name + " is not a .json file");
        }
      }
      alert(log.join("\n"));
    }
  }

  // https://codepen.io/Anveio/pen/XzYBzX
  readUploadedFileAsText(inputFile: File): Promise<string> {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result as string);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  openFileDialog() {
    this.btnOpenFile.nativeElement.click();
  }
}