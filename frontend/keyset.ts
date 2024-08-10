import { IKeyboard } from "./ikeyboard";


class Key {
    upperStr: string = "";
    middleStr: string = "";
    lowerStr: string = "";
    primaryStrIdx: number = 0;
    isSpecial: boolean = false;
    span: number = 1;
    onKeyDown: Function = () => { };
    onKeyUp: Function = () => { };
    onMouseDown: Function = () => { };
    onMouseUp: Function = () => { };
    states: object = {};

    constructor(
        upperStr: string = "",
        middleStr: string = "",
        lowerStr: string = "",
        primaryStrIdx: number = 0,
        isSpecial: boolean = false,
        span: number = 1,
        OnKeyDown: Function = () => { },
        OnKeyUp: Function = () => { },
        onMouseDown: Function = () => { },
        onMouseUp: Function = () => { },
    ) {
        this.upperStr = upperStr;
        this.middleStr = middleStr;
        this.lowerStr = lowerStr;
        this.primaryStrIdx = primaryStrIdx;
        this.isSpecial = isSpecial;
        this.span = span;
        this.onKeyDown = OnKeyDown;
        this.onKeyUp = OnKeyUp;
        this.onMouseDown = onMouseDown;
        this.onMouseUp = onMouseUp;
    }
}

class KeySet {
    languageName: string = "";
    protected containingKeyboard: IKeyboard;
    getKeys(): Key[][] {
        return [];
    }
    isLanguageRTL() {
        return false;
    }
}

export { Key, KeySet };
