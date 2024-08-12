import { charToCodesMapping } from "../char-codes";
import { KeySet } from "./keyset";


export function getSimpleKeyboardKeySpan(key: string): number {
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


export function isSpecialKey(key: string): boolean {
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


function getModifiedValueOnKeyPress(curValue: string, key_str: string, states: object): string {

    const shift = Boolean(states["shift"]) || Boolean(states["caps"]);

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


export function getMouseDownFunction(key_str: string, callingKeyset: KeySet) {

    let customMouseDownFn = () => {

        if (["shift", "ctrl", "alt", "caps"].includes(key_str.toLowerCase())) {
            let curKeyState = Boolean(callingKeyset.containingKeyboard.states[key_str.toLowerCase()]);
            callingKeyset.containingKeyboard.states[key_str.toLowerCase()] = !curKeyState;
        }
        else {

            if (callingKeyset.containingKeyboard.targetElement instanceof HTMLInputElement ||
                callingKeyset.containingKeyboard.targetElement instanceof HTMLTextAreaElement) {

                let curValue = callingKeyset.containingKeyboard.targetElement.value;
                let modifiedValue = getModifiedValueOnKeyPress(curValue, key_str, callingKeyset.containingKeyboard.states);
                callingKeyset.containingKeyboard.targetElement.value = modifiedValue;

            }
            else if (typeof (callingKeyset.containingKeyboard.targetElement) === "string") {

                let curValue = callingKeyset.containingKeyboard.targetElement;
                let modifiedValue = getModifiedValueOnKeyPress(curValue, key_str, callingKeyset.containingKeyboard.states);
                callingKeyset.containingKeyboard.targetElement = modifiedValue;
            }

            callingKeyset.containingKeyboard.states["shift"] = false;

        }

        if (callingKeyset.containingKeyboard.targetElement instanceof HTMLElement) {
            callingKeyset.containingKeyboard.targetElement.dispatchEvent(new Event('input'));  // notify value update
            callingKeyset.containingKeyboard.targetElement.dispatchEvent(new KeyboardEvent('keydown', {
                key: key_str,
                code: charToCodesMapping[key_str]['code'],
                keyCode: charToCodesMapping[key_str]['keyCode'],  // for backward compatibility
                ctrlKey: Boolean(callingKeyset.containingKeyboard.states['ctrl']),
                shiftKey: Boolean(callingKeyset.containingKeyboard.states['shift']),
                altKey: Boolean(callingKeyset.containingKeyboard.states['alt']),
            }));
        }
    };

    return customMouseDownFn;
}