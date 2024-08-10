<svelte:options accessors={true} />

<script lang="ts">
  import type { Gradio } from "@gradio/utils";
  import { BlockTitle } from "@gradio/atoms";
  import { Block } from "@gradio/atoms";
  import { StatusTracker } from "@gradio/statustracker";
  import type { LoadingStatus } from "@gradio/statustracker";
  import { fly } from "svelte/transition";

  import { Keyboard } from "./keyboard";
  import { EnglishKeySet } from "./english-keyset";

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
  export let interactive: boolean;

  let englishKeyset = new EnglishKeySet();
  let keyboard = new Keyboard([englishKeyset]);

  $: if (value === null) value = "";

  let expanded = keyboard.expanded;
  function toggle() {
    expanded = !expanded;
  }

  let keys = keyboard.getKeys();

  function handleKeysChange(): void {
    keys = keyboard.getKeys();
  }
</script>

<Block
  {visible}
  {elem_id}
  {elem_classes}
  {scale}
  {min_width}
  allow_overflow={false}
  padding={true}
>
  {#if loading_status}
    <StatusTracker
      autoscroll={gradio.autoscroll}
      i18n={gradio.i18n}
      {...loading_status}
    />
  {/if}

  <label class="container">
    <BlockTitle {show_label} info={undefined}>{label}</BlockTitle>

    <input
      data-testid="textbox"
      type="text"
      class="scroll-hide"
      bind:value
      bind:this={keyboard.targetElement}
      {placeholder}
      disabled={!interactive}
      dir={keyboard.isCurLanguageRTL() ? "rtl" : "ltr"}
    />
    <p class="transliteration" bind:this={keyboard.transliteration}></p>
  </label>

  <div class="dropdown">
    <!-- <button on:click={keyboard.toggle.bind(keyboard)} class="expand-button"> -->
    <button on:click={toggle} class="expand-button">
      <span class="expand-symbol">⌨</span>
      <span class="description">On-Screen Keyboard</span>
    </button>
    <hr class="divider" />
    <select
      id="language"
      class="language-selector"
      bind:value={keyboard.selectedLanguage}
    >
      {#each keyboard.getAllLanguageNames() as language}
        <option value={language}>{language}</option>
      {/each}
    </select>
  </div>

  {#if expanded}
    <div
      class="keyboard"
      transition:fly={{ y: 20, duration: 200 }}
      on:input={handleKeysChange}
    >
      {#each keys as row, rowIndex}
        <!-- {#each keys as row, rowIndex} -->
        {#each row as key, keyIndex}
          <div
            class="key svelte-cmf5ev secondary {key.isSpecial ? 'special' : ''}"
            style="grid-column: span {key.span}"
            id="key-{key.middleStr}"
            on:mousedown={(e) => {
              key.onMouseDown(e);
              handleKeysChange();
            }}
            on:mouseup={(e) => key.onMouseUp(e)}
            role="button"
            tabindex="0"
          >
            <div
              class="upper {key.primaryStrIdx == 0
                ? 'active-key'
                : 'inactive-key'}"
            >
              {key.upperStr == "" ? "\u200c" : key.upperStr}
            </div>

            <div
              class="middle {key.primaryStrIdx == 1
                ? 'active-key'
                : 'inactive-key'}"
            >
              {key.middleStr}
            </div>

            <div
              class="lower {key.primaryStrIdx == 2
                ? 'active-key'
                : 'inactive-key'}"
            >
              {key.lowerStr == "" ? "\u200c" : key.lowerStr}
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
