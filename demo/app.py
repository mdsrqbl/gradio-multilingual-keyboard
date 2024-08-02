import gradio as gr
from gradio_multilingual_keyboard import multilingual_keyboard

example = multilingual_keyboard().example_value()

demo = gr.Interface(
    lambda x: x,
    multilingual_keyboard(placeholder="Enter text here..."),  # interactive version of your component
    multilingual_keyboard(languages=["english", "urdu"]),  # static version of your component
    examples=[[example]],  # uncomment this line to view the "example version" of your component
)


if __name__ == "__main__":
    demo.launch()
