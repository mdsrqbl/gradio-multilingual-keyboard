import { IKeyboard } from "../../ikeyboard";
import { Key, KeySet } from "../keyset";
import {
  getSimpleKeyboardKeySpan,
  getMouseDownFunction,
  getMouseUpFunction,
  getKeyDownFunction,
  getKeyUpFunction,
  isSpecialKey,
} from "../utils";
import {
  shiftedKeysLayout,
  unshiftedKeysLayout,
  capsKeysLayout,
  englishHintKeysLayout,
} from "./simple-urdu-keys-layout";

export class UrduKeySet implements KeySet {
  private shiftedKeys: Key[][] = [];
  private unShiftedKeys: Key[][] = [];
  private capsKeys: Key[][] = [];
  private transliterationCharMap: object = {};

  languageName: string = "Urdu";
  containingKeyboard: IKeyboard;
  onEnter: Function | null = null;

  constructor() {
    [unshiftedKeysLayout, shiftedKeysLayout, capsKeysLayout].forEach((keylayout) => {
      keylayout.map((row, rowidx) => {
        row.forEach((key_str, keyidx) => {
          if (key_str.length == 1) {
            this.transliterationCharMap[key_str] = englishHintKeysLayout[rowidx][keyidx];
          }
        });
      });
    });

    this.unShiftedKeys = this.getKeyListsFromLayout(unshiftedKeysLayout, 2);
    this.shiftedKeys = this.getKeyListsFromLayout(shiftedKeysLayout, 0);
    this.capsKeys = this.getKeyListsFromLayout(capsKeysLayout, 0);
  }

  private getKeyListsFromLayout(layout: string[][], alphaNumericPrimaryTextIdx: number): Key[][] {
    let keyLists: Key[][] = layout.map((row, rowidx) => {
      let keys: Key[] = [];
      row.forEach((key_str, keyidx) => {
        let span = getSimpleKeyboardKeySpan(key_str);
        let is_special = isSpecialKey(key_str);

        let upperText = "";
        let lowerText = "";
        let middleText = key_str;
        let selectedPrimaryTextIdx = 1;

        if (key_str.length <= 1) {
          middleText = englishHintKeysLayout[rowidx][keyidx] ?? "";
          upperText = shiftedKeysLayout[rowidx][keyidx] ?? "";
          lowerText = unshiftedKeysLayout[rowidx][keyidx] ?? "";
          selectedPrimaryTextIdx = alphaNumericPrimaryTextIdx;
        }

        let onMouseDownFunction = getMouseDownFunction(key_str, this);
        let onMouseUpFunction = getMouseUpFunction(key_str, this, true, this.transliterationCharMap);
        let onDownFunction = getKeyDownFunction(key_str, this);
        let onUpFunction = getKeyUpFunction(key_str, this);

        keys.push(
          new Key(
            upperText,
            middleText,
            lowerText,
            selectedPrimaryTextIdx,
            is_special,
            span,
            onDownFunction,
            onUpFunction,
            onMouseDownFunction,
            onMouseUpFunction
          )
        );
      });
      return keys;
    });

    return keyLists;
  }

  isLanguageRTL(): boolean {
    return true;
  }

  getKeys(): Key[][] {
    if (this.containingKeyboard.states["shift"]) {
      return this.shiftedKeys;
    } else if (this.containingKeyboard.states["caps"]) {
      return this.capsKeys;
    } else {
      return this.unShiftedKeys;
    }
  }
}
