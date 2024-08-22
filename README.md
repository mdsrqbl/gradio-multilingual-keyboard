
# gradio_multilingual_keyboard

A Custom Gradio component to type any language's text via on-screen buttons and physical keyboard's key-mapping.

1. [gradio\_multilingual\_keyboard](#gradio_multilingual_keyboard)
   1. [Example usage](#example-usage)
   2. [Supported Languages](#supported-languages)
   3. [To Do](#to-do)
   4. [Dev Setup](#dev-setup)

## Example usage

```bash
pip install gradio-multilingual-keyboard
```

> [!Note]
> to install the compoent directly from the repository in an app, first run `gradio cc build` to generate index.js and style.css files.

<br>

```python
import gradio as gr
from gradio_multilingual_keyboard import multilingual_keyboard

with gr.Blocks() as gradio_app:
    gr.Markdown(f"# Multilingual Keyboard 🌐 ⌨")
    multilingual_keyboard(languages=["english", "urdu"])

if __name__ == "__main__":
    gradio_app.launch()
```

![gradio_multilingual_keyboard_demo](https://github.com/user-attachments/assets/043c1d2c-0262-4620-8b15-5a1ae7090f77)

## Supported Languages

- [x] English
- [x] Urdu
- [ ] Hindi

## To Do

edit `frontend/index.svelte`:

- [ ] while a button is active or a corresponding key is down, turn it primary
- [ ] add guideline in readme to extend for new languages.
- [x] move transliteration below keyboard toggle button.
- [x] Bug: submit button does not work after text is written via virtual keyboard
- [ ] allow user to link their textArea component or their languageDropDown with this keyboard
- [ ] pass the value of text box _and dropdown_ as inputs to the submit button (update examples accordingly)
- [ ] map physical keys to unicode
- [ ] update transliteration for keystrokes, backspace, cut, paste, etc.
- [x] prepend a transliteration label
- [x] When <kbd>shift</kbd> is pressed on virtual keyboard, keep it active until another key is pressed
- [ ] if <kbd>shift</kbd> or <kbd>Caps</kbd> is pressed on virtual keyboard, physical keyboard should also write accordingly
- [ ] add a switch for standard and phonetic keyboards for each language
- [ ] add support for top 50 languages, you may use a library.

## Dev Setup

[Documentation](https://www.gradio.app/guides/custom-components-in-five-minutes)

```bash
git clone https://github.com/mdsrqbl/gradio-multilingual-keyboard.git
```

```bash
cd gradio-multilingual-keyboard
pip install -e .
```

```bash
cd frontend
npm install
cd ..
```

```bash
gradio cc dev
```

> ♻ Launching demo/app.py in reload mode
>
> Backend Server:  http://127.0.0.1:7860
> 
> Frontend Server (Go here): http://localhost:7861/
