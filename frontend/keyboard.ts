import type { Gradio } from "@gradio/utils";

import { KeySet, Key } from "./keysets/keyset";
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

    private languageToKeysetMap: object = {};
    selectedLanguage: string = "";

    constructor(languageKeySets: KeySet[]) {
        languageKeySets.forEach((keyset) => {
            this.languageToKeysetMap[keyset.languageName] = keyset;
            this.languageToKeysetMap[keyset.languageName].containingKeyboard = this;
        });

        this.selectedLanguage = Object.keys(this.languageToKeysetMap)[0];
    }

    toggle(): void {
        this.expanded = !this.expanded;
    }

    getKeys(): Key[][] {
        return this.languageToKeysetMap[this.selectedLanguage].getKeys();
    }

    isCurLanguageRTL() {
        return this.languageToKeysetMap[this.selectedLanguage].isLanguageRTL();
    }

    getAllLanguageNames(): string[] {
        return Object.keys(this.languageToKeysetMap);
    }
}