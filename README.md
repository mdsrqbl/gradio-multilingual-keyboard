
# gradio_multilingual_keyboard

A Custom Gradio component to type any language's text via on-screen buttons and physical keyboard's key-mapping.

1. [gradio\_multilingual\_keyboard](#gradio_multilingual_keyboard)
   1. [Example usage](#example-usage)
   2. [Language Support](#language-support)
   3. [To Do](#to-do)
   4. [Dev Setup](#dev-setup)

## Example usage

```bash
pip install gradio-multilingual-keyboard
```

```python
import gradio as gr
from gradio_multilingual_keyboard import multilingual_keyboard

with gr.Blocks() as gradio_app:
    gr.Markdown(f"# Multilingual Keyboard 🌐 ⌨")
    multilingual_keyboard(languages=["english", "urdu"])

if __name__ == "__main__":
    gradio_app.launch()
```

## Language Support

- [x] English
- [x] Urdu
- [ ] Hindi

## To Do

- while a button is active or a corresponding key is down, turn it primary
- submit button does not work after text is written via virtual keyboard
- map physical keys to unicode
- update transliteration for keystrokes, backspace, cut, paste, etc.
- prepend a transliteration label

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
npm run build
cd ..
```

```bash
gradio cc dev
```
