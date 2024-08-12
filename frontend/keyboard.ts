import type { Gradio } from "@gradio/utils";

import { KeySet, Key } from "./keyset";
import { IKeyboard } from "./ikeyboard";


export let gradio: Gradio<{
    change: never;
    submit: never;
    input: never;
}>;

export class Keyboard implements IKeyboard {

    states: object = {};
    targetElement: HTMLElement;
    transliteration: HTMLParagraphElement;
    container: boolean = true;
    expanded: boolean = true;

    private langToKeysetMap: object = {};
    selectedLanguage: string = "";

    constructor(languageKeySets: KeySet[]) {
        languageKeySets.forEach((keyset) => {
            this.langToKeysetMap[keyset.languageName] = keyset;
            this.langToKeysetMap[keyset.languageName].containingKeyboard = this;
        });

        this.selectedLanguage = Object.keys(this.langToKeysetMap)[0];
    }

    toggle(): void {
        this.expanded = !this.expanded;
    }

    getKeys(): Key[][] {
        return this.langToKeysetMap[this.selectedLanguage].getKeys();
    }

    isCurLanguageRTL() {
        return this.langToKeysetMap[this.selectedLanguage].isLanguageRTL();
    }

    getAllLanguageNames(): string[] {
        return Object.keys(this.langToKeysetMap);
    }
}