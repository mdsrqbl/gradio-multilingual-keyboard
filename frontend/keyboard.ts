import { KeySet, Key } from "./keysets/keyset";
import { IKeyboard } from "./ikeyboard";


export class Keyboard implements IKeyboard {

    states: object = {};
    targetElement: HTMLElement;
    transliteration: HTMLParagraphElement;
    container: boolean = true;
    expanded: boolean = true;
    onEnter: Function | null = null;

    private languageToKeysetMap: object = {};
    selectedLanguage: string = "";

    /**
     * 
     * @param languageKeySets - List of Keysets to add to keyboard
     * @param onEnter - Function to execute when the "Enter" key is pressed. Defaults to null which means add a new line.
     */
    constructor(languageKeySets: KeySet[], onEnter: Function | null = null) {

        this.onEnter = onEnter;

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

    isCurrentLanguageRTL() {
        return this.languageToKeysetMap[this.selectedLanguage].isLanguageRTL();
    }

    getAllLanguageNames(): string[] {
        return Object.keys(this.languageToKeysetMap);
    }
}