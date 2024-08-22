import { charToCodesMapping } from "../char-codes";
import { Key, KeySet } from "./keyset";

const simpleEnTextToSpans: Object = {
  Space: 14,
  Shift: 5,
  Enter: 4,
  Delete: 4,
  Caps: 4,
  Alt: 4,
  Ctrl: 4,
  Tab: 3,
  "\\": 3,
  "|": 3,
};

export function getSimpleKeyboardKeySpan(key: string): number {
  return simpleEnTextToSpans[key] || 2;
}

export function isSpecialKey(key: string): boolean {
  return ["Delete", "Enter", "Shift", "Caps", "Tab", "Ctrl", "Alt", "Win", "Space"].includes(key);
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

export function getMouseDownFunction(key_str: string, callingKeyset: KeySet): Function {
  let customMouseDownFn = (callingKey: Key) => {
    callingKey.setPressed();

    if (callingKeyset.containingKeyboard.targetElement instanceof HTMLElement) {
      let keyDownEventInitDict = {
        key: key_str,
        ctrlKey: Boolean(callingKeyset.containingKeyboard.states["ctrl"]),
        shiftKey: Boolean(callingKeyset.containingKeyboard.states["shift"]),
        altKey: Boolean(callingKeyset.containingKeyboard.states["alt"]),
      };
      let codeMappings = charToCodesMapping[key_str];
      if (codeMappings) {
        keyDownEventInitDict["code"] = codeMappings["code"];
        keyDownEventInitDict["keyCode"] = codeMappings["keyCode"]; // for backward compatibility
      }
      callingKeyset.containingKeyboard.targetElement.dispatchEvent(new KeyboardEvent("keydown", keyDownEventInitDict));
    }
  };

  return customMouseDownFn;
}

export function getMouseUpFunction(
  key_str: string,
  callingKeyset: KeySet,
  transliterate: boolean = true,
  transliterationCharMap: object = {}
): Function {
  let customMouseUpFn = (callingKey: Key) => {
    callingKey.setUnPressed();

    if (key_str === "Enter" && callingKeyset.containingKeyboard.onEnter) {
      callingKeyset.containingKeyboard.onEnter();
      return;
    } else if (["shift", "ctrl", "alt", "caps"].includes(key_str.toLowerCase())) {
      let curKeyState = Boolean(callingKeyset.containingKeyboard.states[key_str.toLowerCase()]);
      callingKeyset.containingKeyboard.states[key_str.toLowerCase()] = !curKeyState;
    } else {
      if (
        callingKeyset.containingKeyboard.targetElement instanceof HTMLInputElement ||
        callingKeyset.containingKeyboard.targetElement instanceof HTMLTextAreaElement
      ) {
        let curValue = callingKeyset.containingKeyboard.targetElement.value;
        let modifiedValue = getModifiedValueOnKeyPress(curValue, key_str, callingKeyset.containingKeyboard.states);
        callingKeyset.containingKeyboard.targetElement.value = modifiedValue;
      } else if (typeof callingKeyset.containingKeyboard.targetElement === "string") {
        let curValue = callingKeyset.containingKeyboard.targetElement;
        let modifiedValue = getModifiedValueOnKeyPress(curValue, key_str, callingKeyset.containingKeyboard.states);
        callingKeyset.containingKeyboard.targetElement = modifiedValue;
      }

      if (transliterate) {
        let transliterationKey = transliterationCharMap[key_str];
        transliterationKey = transliterationKey ? transliterationKey : key_str;
        let currentKeyboard = callingKeyset.containingKeyboard;
        let newTransliterationValue = getModifiedValueOnKeyPress(
          currentKeyboard.transliterationText,
          transliterationKey,
          currentKeyboard.states
        );
        currentKeyboard.transliterationText = newTransliterationValue;
      }

      callingKeyset.containingKeyboard.states["shift"] = false;
    }

    if (callingKeyset.containingKeyboard.targetElement instanceof HTMLElement) {
      callingKeyset.containingKeyboard.targetElement.dispatchEvent(new Event("input")); // notify value update

      let keyUpEventInitDict = {
        key: key_str,
        ctrlKey: Boolean(callingKeyset.containingKeyboard.states["ctrl"]),
        shiftKey: Boolean(callingKeyset.containingKeyboard.states["shift"]),
        altKey: Boolean(callingKeyset.containingKeyboard.states["alt"]),
      };
      let codeMappings = charToCodesMapping[key_str];
      if (codeMappings) {
        keyUpEventInitDict["code"] = codeMappings["code"];
        keyUpEventInitDict["keyCode"] = codeMappings["keyCode"]; // for backward compatibility
      }
      callingKeyset.containingKeyboard.targetElement.dispatchEvent(new KeyboardEvent("keyup", keyUpEventInitDict));
    }
  };

  return customMouseUpFn;
}

export function getKeyDownFunction(key_str: string, callingKeyset: KeySet): Function {
  let customKeyDownFn = (callingKey: Key) => {};
  return customKeyDownFn;
}

export function getKeyUpFunction(key_str: string, callingKeyset: KeySet): Function {
  let customKeyUpFn = (callingKey: Key) => {};
  return customKeyUpFn;
}
