import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app.component';
import { GrammarEditorComponent } from './components/grammar-editor/grammar-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SymbolEditorComponent } from './components/symbol-editor/symbol-editor.component';
import { LineSymbolEditorComponent } from './components/line-symbol-editor/line-symbol-editor.component';
import { AngleSymbolEditorComponent } from './components/angle-symbol-editor/angle-symbol-editor.component';
import { StackSymbolEditorComponent } from './components/stack-symbol-editor/stack-symbol-editor.component';
import { StringSymbolEditorComponent } from './components/string-symbol-editor/string-symbol-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { SymbolGraphComponent } from './components/symbol-graph/symbol-graph.component';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from "@angular/material/icon";
import { SvgComponent } from './components/svg/svg.component';
import { GrammarSelectionService } from './grammar-selection.service';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';
import { FileUploadModule } from 'ng2-file-upload';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    GrammarEditorComponent,
    SymbolEditorComponent,
    LineSymbolEditorComponent,
    AngleSymbolEditorComponent,
    StackSymbolEditorComponent,
    StringSymbolEditorComponent,
    SymbolGraphComponent,
    SvgComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    FileSaverModule,
    FileUploadModule,
    MatDialogModule
  ],
  providers: [GrammarSelectionService, FileSaverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
