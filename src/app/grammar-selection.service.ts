import { SymbolCollection } from './classes/symbol-collection';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GrammarSelectionService {

    private grammarSelectedSource = new Subject<SymbolCollection>();
    private deleteGrammarSource = new Subject<SymbolCollection>();

    grammarSelected$ = this.grammarSelectedSource.asObservable();
    deleteGrammar$ = this.deleteGrammarSource.asObservable();

    grammarSelected(g: SymbolCollection) {
        this.grammarSelectedSource.next(g);
    }
    deleteGrammar(g: SymbolCollection) {
        this.deleteGrammarSource.next(g);
    }
}
