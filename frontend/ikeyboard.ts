import { Key } from "./keysets/keyset";


export interface IKeyboard {

    states: object;
    targetElement: string | HTMLElement;
    transliterationText: string;
    container: boolean;
    expanded: boolean;

    selectedLanguage: string;

    onEnter: Function | null;

    toggle(): void;
    getKeys(): Key[][];
    isCurrentLanguageRTL(): boolean;
    getAllLanguageNames(): string[];
}
