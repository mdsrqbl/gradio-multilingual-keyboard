<svelte:options accessors={true} />

<script lang="ts">
  import type { Gradio } from "@gradio/utils";
  import { BlockTitle } from "@gradio/atoms";
  import { Block } from "@gradio/atoms";
  import { StatusTracker } from "@gradio/statustracker";
  import type { LoadingStatus } from "@gradio/statustracker";
  import { tick } from "svelte";
  import { fly } from "svelte/transition";

  export let gradio: Gradio<{
    change: never;
    submit: never;
    input: never;
  }>;
  export let label = "Textbox";
  export let elem_id = "";
  export let elem_classes: string[] = [];
  export let visible = true;
  export let value = "";
  export let placeholder = "";
  export let show_label: boolean;
  export let scale: number | null = null;
  export let min_width: number | undefined = undefined;
  export let loading_status: LoadingStatus | undefined = undefined;
  export let value_is_output = false;
  export let interactive: boolean;
  export let languages: string[] = ["english", "urdu", "hindi"];

  let textAreaEl: HTMLTextAreaElement | HTMLInputElement;
  let transliteration: HTMLParagraphElement;
  const container = true;
  let isShiftDown = false;
  let isCapsLockOn = false;
  let currentLanguage = languages[0];

  function handle_change(): void {
    gradio.dispatch("change");
    if (!value_is_output) {
      gradio.dispatch("input");
    }
  }

  async function handle_keypress(e: KeyboardEvent): Promise<void> {
    await tick();
    if (e.key === "Enter") {
      e.preventDefault();
      gradio.dispatch("submit");
    }
  }

  function handle_button_press(key: string, e: KeyboardEvent): void {
    isShiftDown = e.shiftKey;
    isCapsLockOn = e.getModifierState("CapsLock");

    if (key.length === 1) {
      textAreaEl.value +=
        languageKeyMap[currentLanguage][isCapsLockOn || isShiftDown ? "shift" : "notShift"][key.toLowerCase()] ||
        (isCapsLockOn || isShiftDown ? key.toUpperCase() : key.toLowerCase());
      transliteration.textContent += isCapsLockOn || isShiftDown ? key.toUpperCase() : key.toLowerCase();
    } else if (key === "Space") {
      textAreaEl.value += " ";
      transliteration.textContent += " ";
    } else if (key === "Delete") {
      textAreaEl.value = textAreaEl.value.slice(0, -1);
      transliteration.textContent = transliteration.textContent.slice(0, -1);
    } else if (key === "Enter") {
      gradio.dispatch("submit");
    }
  }

  $: if (value === null) value = "";

  // When the value changes, dispatch the change event via handle_change()
  // See the docs for an explanation: https://svelte.dev/docs/svelte-components#script-3-$-marks-a-statement-as-reactive
  $: value, handle_change();

  let expanded = false;

  function toggle() {
    expanded = !expanded;
  }
  const keys = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Delete"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["Ctrl", "Alt", "Space", "Alt", "Ctrl"],
  ];
  function isSpecialKey(key: string): boolean {
    return ["Delete", "Enter", "Shift", "Caps", "Tab", "Ctrl", "Alt", "Win", "Space"].includes(key);
  }
  function getKeySpan(key: string): number {
    return key === "Space"
      ? 14
      : key === "Shift"
        ? 5
        : key === "Delete" || key === "Enter" || key === "Ctrl" || key === "Alt" || key === "Caps"
          ? 4
          : key === "Tab" || key === "\\"
            ? 3
            : 2;
  }
  function isLanguageRTL(language: string): boolean {
    return ["urdu", "arabic", "farsi"].includes(language.toLowerCase());
  }
  const languageKeyMap = {
    english: {
      shift: {},
      notShift: {},
    },
    urdu: {
      shift: {
        r: "ڑ",
        t: "ٹ",
        y: "َ",
        u: "ئ",
        i: "ِ",
        p: "ُ",
        a: "آ",
        s: "ص",
        d: "ڈ",
        f: "أ",
        g: "غ",
        h: "ھ",
        j: "ض",
        k: "خ",
        z: "ذ",
        x: "ژ",
        c: "ث",
        v: "ظ",
        n: "ں",
      },
      notShift: {
        "1": "۱",
        "2": "۲",
        "3": "۳",
        "4": "۴",
        "5": "۵",
        "6": "٦",
        "7": "۷",
        "8": "۸",
        "9": "۹",
        "0": "۰",
        q: "ق",
        w: "و",
        e: "ع",
        r: "ر",
        t: "ت",
        y: "ے",
        u: "ء",
        i: "ی",
        o: "ہ",
        p: "پ",
        a: "ا",
        s: "س",
        d: "د",
        f: "ف",
        g: "گ",
        h: "ح",
        j: "ج",
        k: "ک",
        l: "ل",
        z: "ز",
        x: "ش",
        c: "چ",
        v: "ط",
        b: "ب",
        n: "ن",
        m: "م",
        ",": "،",
        ".": "۔",
        "?": "؟",
        ";": "؛",
      },
    },
    hindi: {
      shift: {},
      notShift: {
        "1": "१",
        "2": "२",
        "3": "३",
        "4": "४",
        "5": "५",
        "6": "६",
        "7": "७",
        "8": "८",
        "9": "९",
        "0": "०",
      },
    },
  };
</script>

<Block {visible} {elem_id} {elem_classes} {scale} {min_width} allow_overflow={false} padding={true}>
  {#if loading_status}
    <StatusTracker autoscroll={gradio.autoscroll} i18n={gradio.i18n} {...loading_status} />
  {/if}

  <label class:container>
    <BlockTitle {show_label} info={undefined}>{label}</BlockTitle>

    <input
      data-testid="textbox"
      type="text"
      class="scroll-hide"
      bind:value
      bind:this={textAreaEl}
      {placeholder}
      disabled={!interactive}
      dir={isLanguageRTL(currentLanguage) ? "rtl" : "ltr"}
      on:keypress={handle_keypress}
    />
    <p class="transliteration" bind:this={transliteration}></p>
  </label>

  <div class="dropdown">
    <button on:click={toggle} class="expand-button">
      <span class="expand-symbol">⌨</span>
      <span class="description">On-Screen Keyboard</span>
    </button>
    <hr class="divider" />
    <select id="language" class="language-selector" bind:value={currentLanguage}>
      {#each languages as language}
        <option value={language.toLowerCase()}>{language}</option>
      {/each}
    </select>
  </div>

  {#if expanded}
    <div class="keyboard" transition:fly={{ y: 20, duration: 200 }}>
      {#each keys as row, rowIndex}
        {#each row as key, keyIndex}
          <div
            class="key svelte-cmf5ev secondary {isSpecialKey(key) ? 'special' : ''}"
            style="grid-column: span {getKeySpan(key)}"
            id="key-{key.toLowerCase()}"
            on:click={(e) => handle_button_press(key, e)}
            on:keypress={(e) => (e.key === "Enter" ? handle_button_press(key, e) : null)}
            role="button"
            tabindex="0"
          >
            <div
              class="upper {(isShiftDown || isCapsLockOn) && currentLanguage != 'english'
                ? 'active-key'
                : 'inactive-key'}"
            >
              {!isSpecialKey(key) ? languageKeyMap[currentLanguage]["shift"][key.toLowerCase()] || "\u200c" : "\u200c"}
            </div>

            <div class="middle {currentLanguage == 'english' || isSpecialKey(key) ? 'active-key' : 'inactive-key'}">
              {key}
            </div>

            <div
              class="lower {isShiftDown || isCapsLockOn || currentLanguage == 'english'
                ? 'inactive-key'
                : 'active-key'}"
            >
              {!isSpecialKey(key)
                ? languageKeyMap[currentLanguage]["notShift"][key.toLowerCase()] || "\u200c"
                : "\u200c"}
            </div>
          </div>
        {/each}
      {/each}
    </div>
  {/if}
</Block>

<style>
  label {
    display: block;
    width: 100%;
  }

  input {
    display: block;
    position: relative;
    outline: none !important;
    box-shadow: var(--input-shadow);
    background: var(--input-background-fill);
    padding: var(--input-padding);
    width: 100%;
    color: var(--body-text-color);
    font-weight: var(--input-text-weight);
    font-size: var(--input-text-size);
    line-height: var(--line-sm);
    border: none;
  }
  .container > input {
    border: var(--input-border-width) solid var(--input-border-color);
    border-radius: var(--input-radius);
  }
  input:disabled {
    -webkit-text-fill-color: var(--body-text-color);
    -webkit-opacity: 1;
    opacity: 1;
  }

  input:focus {
    box-shadow: var(--input-shadow-focus);
    border-color: var(--input-border-color-focus);
  }

  input::placeholder {
    color: var(--input-placeholder-color);
  }
  .transliteration {
    margin-top: 10px;
  }
  .dropdown {
    padding: 1px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    user-select: none;
    align-items: center;
  }
  .expand-button {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .expand-symbol {
    font-size: 2.75rem; /* Adjust the size as needed */
    margin-right: 0.5rem;
  }
  .description {
    margin-right: 0.5rem;
    white-space: nowrap; /* Prevent the text from wrapping */
  }
  .divider {
    flex-grow: 1;
    border: none;
    border-bottom: 1px solid #ccc;
  }
  .language-selector {
    border-radius: 4px;
    border: 1px solid #aaa;
    background-color: var(--input-background-fill);
    color: var(--body-text-color);
    font-size: 1rem;
    margin-left: 0.5rem;
  }

  .keyboard {
    display: grid;
    grid-template-columns: repeat(30, 1fr);
    gap: 4px;
    overflow: auto;
  }
  .key {
    padding: 1px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .key.special {
    border: 1px solid #bbb;
  }

  .upper {
    text-align: right;
    vertical-align: middle;
    padding-right: 3px;
  }
  .middle {
    text-align: center;
  }
  .lower {
    text-align: left;
    vertical-align: middle;
    padding-left: 3px;
  }
  .active-key {
    font-size: 1.1rem;
  }
  .inactive-key {
    color: gray;
    font-size: 0.7rem;
  }
</style>
