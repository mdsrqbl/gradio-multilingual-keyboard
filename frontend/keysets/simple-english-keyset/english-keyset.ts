import { IKeyboard } from "../../ikeyboard";
import { Key, KeySet } from "../keyset";
import { getSimpleKeyboardKeySpan, getMouseDownFunction, isSpecialKey } from "../utils";
import { shiftedKeysLayout, unshiftedKeysLayout, capsKeysLayout } from "./simple-english-keys-layout";


export class EnglishKeySet implements KeySet {

    private shiftedKeys: Key[][] = [];
    private unShiftedKeys: Key[][] = [];
    private capsKeys: Key[][] = [];
    languageName: string = "English";
    containingKeyboard: IKeyboard;

    constructor() {

        this.unShiftedKeys = this.getKeyListsFromLayout(unshiftedKeysLayout);
        this.shiftedKeys = this.getKeyListsFromLayout(shiftedKeysLayout);
        this.capsKeys = this.getKeyListsFromLayout(capsKeysLayout);

    }

    private getKeyListsFromLayout(layout: string[][]): Key[][] {

        let keyLists: Key[][] = layout.map((row) => {
            let keys: Key[] = [];
            row.forEach((key_str) => {
                let span = getSimpleKeyboardKeySpan(key_str);
                let is_special = isSpecialKey(key_str);

                let onMouseDownFunction = getMouseDownFunction(key_str, this);

                // TODO implement later as needed.
                let onDownFunction = () => { };
                let onUpFunction = () => { };
                let onMouseUpFunction = () => { };

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

        return keyLists;
    }

    isLanguageRTL(): boolean {
        return false;
    }

    getKeys(): Key[][] {
        if (this.containingKeyboard.states["shift"]) {
            return this.shiftedKeys;
        }
        else if (this.containingKeyboard.states["caps"]) {
            return this.capsKeys;
        }
        else {
            return this.unShiftedKeys;
        }
    }
}