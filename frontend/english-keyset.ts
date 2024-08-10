import { Key, KeySet } from "./keyset";


export const charToCodesMapping = {
    '`': { code: "Backquote", keyCode: 192 },
    '1': { code: "Digit1", keyCode: 49 },
    '2': { code: "Digit2", keyCode: 50 },
    '3': { code: "Digit3", keyCode: 51 },
    '4': { code: "Digit4", keyCode: 52 },
    '5': { code: "Digit5", keyCode: 53 },
    '6': { code: "Digit6", keyCode: 54 },
    '7': { code: "Digit7", keyCode: 55 },
    '8': { code: "Digit8", keyCode: 56 },
    '9': { code: "Digit9", keyCode: 57 },
    '0': { code: "Digit0", keyCode: 48 },
    '-': { code: "Minus", keyCode: 189 },
    '=': { code: "Equal", keyCode: 187 },
    'Delete': { code: "Delete", keyCode: 46 },
    'Tab': { code: "Tab", keyCode: 9 },
    'Q': { code: "KeyQ", keyCode: 81 },
    'W': { code: "KeyW", keyCode: 87 },
    'E': { code: "KeyE", keyCode: 69 },
    'R': { code: "KeyR", keyCode: 82 },
    'T': { code: "KeyT", keyCode: 84 },
    'Y': { code: "KeyY", keyCode: 89 },
    'U': { code: "KeyU", keyCode: 85 },
    'I': { code: "KeyI", keyCode: 73 },
    'O': { code: "KeyO", keyCode: 79 },
    'P': { code: "KeyP", keyCode: 80 },
    '[': { code: "BracketLeft", keyCode: 219 },
    ']': { code: "BracketRight", keyCode: 221 },
    '\\': { code: "Backslash", keyCode: 220 },
    'Caps': { code: "CapsLock", keyCode: 20 },
    'A': { code: "KeyA", keyCode: 65 },
    'S': { code: "KeyS", keyCode: 83 },
    'D': { code: "KeyD", keyCode: 68 },
    'F': { code: "KeyF", keyCode: 70 },
    'G': { code: "KeyG", keyCode: 71 },
    'H': { code: "KeyH", keyCode: 72 },
    'J': { code: "KeyJ", keyCode: 74 },
    'K': { code: "KeyK", keyCode: 75 },
    'L': { code: "KeyL", keyCode: 76 },
    ';': { code: "Semicolon", keyCode: 186 },
    "'": { code: "Quote", keyCode: 222 },
    'Enter': { code: "Enter", keyCode: 13 },
    'Shift': { code: "ShiftLeft", keyCode: 16 }, // Assuming left Shift key
    'Z': { code: "KeyZ", keyCode: 90 },
    'X': { code: "KeyX", keyCode: 88 },
    'C': { code: "KeyC", keyCode: 67 },
    'V': { code: "KeyV", keyCode: 86 },
    'B': { code: "KeyB", keyCode: 66 },
    'N': { code: "KeyN", keyCode: 78 },
    'M': { code: "KeyM", keyCode: 77 },
    ',': { code: "Comma", keyCode: 188 },
    '.': { code: "Period", keyCode: 190 },
    '/': { code: "Slash", keyCode: 191 },
    'Ctrl': { code: "ControlLeft", keyCode: 17 }, // Assuming left Ctrl key
    'Alt': { code: "AltLeft", keyCode: 18 }, // Assuming left Alt key
    'Space': { code: "Space", keyCode: 32 },

    '~': { code: "Backquote", keyCode: 192 }, // Shift + `
    '!': { code: "Digit1", keyCode: 49 }, // Shift + 1
    '@': { code: "Digit2", keyCode: 50 }, // Shift + 2
    '#': { code: "Digit3", keyCode: 51 }, // Shift + 3
    '$': { code: "Digit4", keyCode: 52 }, // Shift + 4
    '%': { code: "Digit5", keyCode: 53 }, // Shift + 5
    '^': { code: "Digit6", keyCode: 54 }, // Shift + 6
    '&': { code: "Digit7", keyCode: 55 }, // Shift + 7
    '*': { code: "Digit8", keyCode: 56 }, // Shift + 8
    '(': { code: "Digit9", keyCode: 57 }, // Shift + 9
    ')': { code: "Digit0", keyCode: 48 }, // Shift + 0
    '_': { code: "Minus", keyCode: 189 }, // Shift + -
    '+': { code: "Equal", keyCode: 187 }, // Shift + =
    '{': { code: "BracketLeft", keyCode: 219 }, // Shift + [
    '}': { code: "BracketRight", keyCode: 221 }, // Shift + ]
    '|': { code: "Backslash", keyCode: 220 }, // Shift + \
    ':': { code: "Semicolon", keyCode: 186 }, // Shift + ;
    '"': { code: "Quote", keyCode: 222 }, // Shift + '
    '<': { code: "Comma", keyCode: 188 }, // Shift + ,
    '>': { code: "Period", keyCode: 190 }, // Shift + .
    '?': { code: "Slash", keyCode: 191 }, // Shift + /

    // Lowercase letters (same keyCode as uppercase but without Shift)
    'a': { code: "KeyA", keyCode: 65 },
    'b': { code: "KeyB", keyCode: 66 },
    'c': { code: "KeyC", keyCode: 67 },
    'd': { code: "KeyD", keyCode: 68 },
    'e': { code: "KeyE", keyCode: 69 },
    'f': { code: "KeyF", keyCode: 70 },
    'g': { code: "KeyG", keyCode: 71 },
    'h': { code: "KeyH", keyCode: 72 },
    'i': { code: "KeyI", keyCode: 73 },
    'j': { code: "KeyJ", keyCode: 74 },
    'k': { code: "KeyK", keyCode: 75 },
    'l': { code: "KeyL", keyCode: 76 },
    'm': { code: "KeyM", keyCode: 77 },
    'n': { code: "KeyN", keyCode: 78 },
    'o': { code: "KeyO", keyCode: 79 },
    'p': { code: "KeyP", keyCode: 80 },
    'q': { code: "KeyQ", keyCode: 81 },
    'r': { code: "KeyR", keyCode: 82 },
    's': { code: "KeyS", keyCode: 83 },
    't': { code: "KeyT", keyCode: 84 },
    'u': { code: "KeyU", keyCode: 85 },
    'v': { code: "KeyV", keyCode: 86 },
    'w': { code: "KeyW", keyCode: 87 },
    'x': { code: "KeyX", keyCode: 88 },
    'y': { code: "KeyY", keyCode: 89 },
    'z': { code: "KeyZ", keyCode: 90 }
};

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


export class EnglishKeySet extends KeySet {
    private shiftedKeys: Key[][] = [];
    private unShiftedKeys: Key[][] = [];

    private unshiftedKeyStrs = [
        [
            "`",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
            "-",
            "=",
            "Delete",
        ],
        ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
        ["Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
        ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
        ["Ctrl", "Alt", "Space", "Alt", "Ctrl"],
    ];

    private shiftedKeyStrs = [
        [
            "~",
            "!",
            "@",
            "#",
            "$",
            "%",
            "^",
            "&",
            "*",
            "(",
            ")",
            "_",
            "+",
            "Delete",
        ],
        ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"],
        ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "Enter"],
        ["Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Shift"],
        ["Ctrl", "Alt", "Space", "Alt", "Ctrl"],
    ];

    constructor() {
        super();
        this.languageName = "English";

        this.unShiftedKeys = this.unshiftedKeyStrs.map((row) => {
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

        this.shiftedKeys = this.shiftedKeyStrs.map((row) => {
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
                    code: key_str,
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