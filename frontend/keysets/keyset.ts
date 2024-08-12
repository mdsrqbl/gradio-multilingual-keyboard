import { IKeyboard } from "../ikeyboard";


class Key {
    upperText: string = "";
    middleText: string = "";
    lowerText: string = "";
    primaryStrIdx: number = 0;
    isSpecial: boolean = false;
    span: number = 1;
    onKeyDown: Function = () => { };
    onKeyUp: Function = () => { };
    onMouseDown: Function = () => { };
    onMouseUp: Function = () => { };
    states: object = {};

    constructor(
        upperText: string = "",
        middleText: string = "",
        lowerText: string = "",
        primaryStrIdx: number = 0,
        isSpecial: boolean = false,
        span: number = 1,
        OnKeyDown: Function = () => { },
        OnKeyUp: Function = () => { },
        onMouseDown: Function = () => { },
        onMouseUp: Function = () => { },
    ) {
        this.upperText = upperText;
        this.middleText = middleText;
        this.lowerText = lowerText;
        this.primaryStrIdx = primaryStrIdx;
        this.isSpecial = isSpecial;
        this.span = span;
        this.onKeyDown = OnKeyDown;
        this.onKeyUp = OnKeyUp;
        this.onMouseDown = onMouseDown;
        this.onMouseUp = onMouseUp;
    }
}

interface KeySet {
    languageName: string;
    containingKeyboard: IKeyboard;
    getKeys(): Key[][];
    isLanguageRTL();
}

export { Key, KeySet };
