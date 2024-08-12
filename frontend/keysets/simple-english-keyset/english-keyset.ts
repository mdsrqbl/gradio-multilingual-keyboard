import { IKeyboard } from "../../ikeyboard";
import { Key, KeySet } from "../keyset";
import { shiftedKeysLayout, unshiftedKeysLayout } from "./simple-english-keys-layout";
import { charToCodesMapping } from "../../char-codes";


function getModifiedValueOnKeyPress(curValue: string, key_str: string, states: object): string {

    const shift = Boolean(states["shift"]);

    if (key_str.length === 1) {
        curValue += shift ? key_str.toUpperCase() : key_str.toLowerCase();
    } else if (key_str === "Space") {
        curValue += " ";
    } else if (key_str === "Delete") {
        curValue = curValue.slice(0, -1);
    } else if (key_str === "Enter") {
        curValue += "\n";
    }

    return curValue;

}


export class EnglishKeySet implements KeySet {

    private shiftedKeys: Key[][] = [];
    private unShiftedKeys: Key[][] = [];
    languageName: string = "English";
    containingKeyboard: IKeyboard;

    constructor() {

        this.unShiftedKeys = unshiftedKeysLayout.map((row) => {
            let keys: Key[] = [];
            row.forEach((key_str) => {
                let span = this.getKeySpan(key_str);
                let is_special = this.isSpecialKey(key_str);
                let onDownFunction = this.getKeyDownFunction(key_str);
                let onUpFunction = this.getKeyUpFunction(key_str);
                let onMouseDownFunction = this.getMouseDownFunction(key_str);
                let onMouseUpFunction = this.getMouseUpFunction(key_str);

                keys.push(
                    new Key(
                        "",
                        key_str,
                        "",
                        1,
                        is_special,
                        span,
                        onDownFunction,
                        onUpFunction,
                        onMouseDownFunction,
                        onMouseUpFunction,
                    ),
                );
            });
            return keys;
        });

        this.shiftedKeys = shiftedKeysLayout.map((row) => {
            let keys: Key[] = [];
            row.forEach((key_str) => {
                let span = this.getKeySpan(key_str);
                let is_special = this.isSpecialKey(key_str);

                let onDownFunction = this.getKeyDownFunction(key_str);
                let onUpFunction = this.getKeyUpFunction(key_str);
                let onMouseDownFunction = this.getMouseDownFunction(key_str);
                let onMouseUpFunction = this.getMouseUpFunction(key_str);

                keys.push(
                    new Key(
                        "",
                        key_str,
                        "",
                        1,
                        is_special,
                        span,
                        onDownFunction,
                        onUpFunction,
                        onMouseDownFunction,
                        onMouseUpFunction,
                    ),
                );
            });
            return keys;
        });
    }

    private getKeyDownFunction(key_str: string) {
        return (e: KeyboardEvent) => { console.log(key_str + " Key Down") };
    }

    private getKeyUpFunction(key_str: string) {
        return (e: KeyboardEvent) => { console.log(key_str + " Key Up") };
    }

    private getMouseDownFunction(key_str: string) {

        let customMouseDownFn = () => {

            if (key_str.toLowerCase() in ["shift", "ctrl", "alt"]) {
                let curKeyState = Boolean(this.containingKeyboard.states[key_str.toLowerCase()]);
                this.containingKeyboard.states[key_str.toLowerCase()] = !curKeyState;
            }
            else {

                if (this.containingKeyboard.targetElement instanceof HTMLInputElement ||
                    this.containingKeyboard.targetElement instanceof HTMLTextAreaElement) {

                    let curValue = this.containingKeyboard.targetElement.value;
                    let modifiedValue = getModifiedValueOnKeyPress(curValue, key_str, this.containingKeyboard.states);
                    this.containingKeyboard.targetElement.value = modifiedValue;

                }
                else if (typeof (this.containingKeyboard.targetElement) === "string") {

                    let curValue = this.containingKeyboard.targetElement;
                    let modifiedValue = getModifiedValueOnKeyPress(curValue, key_str, this.containingKeyboard.states);
                    this.containingKeyboard.targetElement = modifiedValue;
                }
            }

            if (this.containingKeyboard.targetElement instanceof HTMLElement) {
                this.containingKeyboard.targetElement.dispatchEvent(new Event('input'));  // notify value update
                this.containingKeyboard.targetElement.dispatchEvent(new KeyboardEvent('keydown', {
                    key: key_str,
                    code: charToCodesMapping[key_str]['code'],
                    keyCode: charToCodesMapping[key_str]['keyCode'],  // for backward compatibility
                    ctrlKey: Boolean(this.containingKeyboard.states['ctrl']),
                    shiftKey: Boolean(this.containingKeyboard.states['shift']),
                    altKey: Boolean(this.containingKeyboard.states['alt']),
                }));
            }
        };

        return () => {
            customMouseDownFn();
        };
    }

    private getMouseUpFunction(key_str: string) {
        return (e: MouseEvent) => { };
    }

    private getKeySpan(key: string): number {
        return key === "Space"
            ? 14
            : key === "Shift"
                ? 5
                : key === "Delete" ||
                    key === "Enter" ||
                    key === "Ctrl" ||
                    key === "Alt" ||
                    key === "Caps"
                    ? 4
                    : key === "Tab" || key === "\\"
                        ? 3
                        : 2;
    }

    private isSpecialKey(key: string): boolean {
        return [
            "Delete",
            "Enter",
            "Shift",
            "Caps",
            "Tab",
            "Ctrl",
            "Alt",
            "Win",
            "Space",
        ].includes(key);
    }

    isLanguageRTL(): boolean {
        return false;
    }

    getKeys(): Key[][] {
        if (this.containingKeyboard.states["shift"]) {
            return this.shiftedKeys;
        } else {
            return this.unShiftedKeys;
        }
    }
}