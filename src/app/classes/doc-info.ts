import { SymbolCollection } from './symbol-collection';

export class DocInfo {
    grammar = new SymbolCollection();

    constructor(init?: Partial<DocInfo>) {
        // Object.assign(this, init);
        if (init?.grammar)
            this.grammar = new SymbolCollection(init?.grammar);
    }
}

export class Documents {
    documents: DocInfo[] = [];

    private readonly storageKey = "lsystems";

    constructor() {
        if (window && window.localStorage) {
            var jsonDocs = window.localStorage.getItem(this.storageKey);
            console.log("documents in local storage\n" + jsonDocs);

            if (jsonDocs) {
                var docs = JSON.parse(jsonDocs);

                if (docs && docs.documents) {
                    for (var di of docs.documents) {
                        this.documents.push(new DocInfo(di));
                    }
                    return;
                }
            }

            console.log("no documents");
            return;
        }
        console.log("no window or no local storage");
    }

    save() {
        if (window && window.localStorage) {
            window.localStorage.setItem(this.storageKey, JSON.stringify(this));
        }
    }

    delete(g: SymbolCollection) {
        for(var i=0; i<this.documents.length; i++) {
            if (this.documents[i].grammar === g) {
                this.documents.splice(i, 1);
                break;
            }
        }
    }

    hasName(name: string): Boolean {
        for(var d of this.documents) {
            if (d.grammar.name === name) return true;
        }
        return false;
    }
}