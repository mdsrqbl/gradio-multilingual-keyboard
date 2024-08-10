import { Key } from "./keyset";

export interface IKeyboard {

    states: object;
    targetElement: string | HTMLElement;
    container: boolean;
    expanded: boolean;

    selectedLanguage: string;

    toggle(): void;
    getKeys(): Key[][];
    isCurLanguageRTL(): boolean;
    getAllLanguageNames(): string[];
}