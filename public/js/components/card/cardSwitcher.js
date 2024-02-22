import { LitElement, css, html } from 'lit-element';
export class CardsSwitcher extends LitElement {

    static get properties() {
        return {
        }
    }

    constructor() {
        super()
    }

    connectedCallback() {
        super.connectedCallback();

    }

    firstUpdated() {
        super.firstUpdated();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`<div class="container">
        <div class="menu">
        <div class="selector-container">
        <label for="card-selector">Card</label>
        <select name="card-selector" class="card-selector">
        </select>
        </div>
        <div class="buttons">
        <a href="" class="menu-button">
        <img src="/images/icons/remove-btn.png" alt="Remove a card">
        </a>
        <a href="" class="menu-button">
         <img src="/images/icons/add-btn.png" alt="Add a new card">
        </a>
        </div>
        </div>
        <div class="card">
        <div class="card-name">
        <label for="card-name">Name</label>
        <input type="text" id="card-name" name="card-name">
        </div>
        <div class="card-content">
        <div class="card-question">
        <label for="card-question">Question</label>
        <textarea  type="text" id="card-question" name="card-question"></textarea>
        </div>
        <div class="card-answer">
        <label for="card-answer">Answer</label>
        <textarea type="text" id="card-answer" name="card-answer"></textarea>
        </div>
        </div>
        <div class="card-images">
        <div class="card-question-image">
        <label for="c-q-i-input">Paste image question</label>
        <input type="text" @paste="${this._pasteImage}" id="c-q-i-input" name="c-q-i-input">
        <button class="c-q-i-button">Upload Image
        <input type="file" id="c-q-i_input" accept="image/*" hidden>
        </button>
        </div>
        <div class="card-answer-image">
        <label for="c-a-i-input">Paste image answer</label>
        <input type="text" @paste="${this._pasteImage}" id="c-a-i-input" name="c-a-i-input">
        <button class="c-a-i-button">Upload Image
        <input type="file" id="c-a-i_input" accept="image/*" hidden>
        </button>
        </div>
        </div>
        </div>
        <img class="question-image" id=question-image src="/images/icons/upload-image-btn.png" alt="Question image">
        <img class="answer-image" id=answer-image  src="/images/icons/upload-image-btn.png" alt="Answer image">
        </div>
    `
    }

    _pasteImage(e) {
        e.preventDefault();
        let items = (e.clipboardData || window.clipboardData).items

        let image = this.shadowRoot.querySelector(`#${e.target.id == 'c-q-i-input' ? 'question-image' : 'answer-image'}`) 
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                let blob = item.getAsFile();

                const reader = new FileReader();

                reader.onload = function (event) {
                    let imageData = event.target.result;
                    image.src = imageData
                }

                reader.readAsDataURL(blob);
                return
            }
        }
        this.requestUpdate()



    }

    _uploadImage(e) {
        
    }


    static get styles() {
        return css`

        .container {
            display: flex;
            position: relative;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 0.5rem;
            overflow-y: auto;
            scrollbar-color: lightblue transparent;
            color: white;
            font-family: cursive;
        }

        .container label {
            width: 4.5rem;
            text-align: left;
        }

        .menu { 
            display: flex;
            align-items: center;
            border-radius: 0.5rem;
            justify-content: space-between;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 0.25rem 0rem 0.25rem 0rem;
        }

        .card {
            display: flex;
            justify-content: center;
            flex-direction: column;
            flex: 1;
            gap: 4rem;
        }

        .selector-container {
            margin-left: 0.5rem;
        }

        .selector-container > * {
            margin: 0.5rem;
        }

        .selector-container select {
            width: 5rem;
        }

        .buttons { 
            display: flex;
            margin-right: 0.5rem;
            gap: 0.5rem;
        }

        .menu-button {
            display: block;
            height: 3rem;
            width: 3rem;
        }

        .menu-button img {
            height: 100%;
            width: 100%;
        }

        .card input, .card textarea {
            text-align: center;
            line-height: 1.3rem;
            border: none;
            border-radius: 0.5rem;
            height: 2rem;
        }

        .card-name > *,
        .card-question > *, 
        .card-answer > *,
        .card-question-image > *,
        .card-answer-image > * {
            margin: 0.5rem;
        }

        .card-question textarea, 
        .card-answer textarea {
            margin: 0.5rem 0.5rem 0.5rem 0.25rem;
        }

        .card-name input {
            margin-right: 0.4rem;
        }

        .card-question, .card-answer {
            display: flex;
            align-items: center;
        }

        .card-name {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0rem 1rem 0rem;
        }

        .card-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
        }

        .card-content textarea {
            height: 4rem;
        }

        .card-images {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            margin: 4rem 0rem 1rem 0rem;
        }

        .card-question-image, .card-answer-image {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .card-question-image label, .card-answer-image label {
            text-align: center;
        }

        .question-image {
            position: absolute;
            width: 12rem;
            height: 12rem;
            top: 12%;
            left: 10%;
            opacity: 0.2;
            z-index: -1;
        }

        .answer-image {
            position: absolute;
            width: 12rem;
            height: 12rem;
            top: 12%;
            right: 10%;
            opacity: 0.2;
            z-index: -1;
        }

        .question-image, .answer-image {
            display: none;
        }


        @media (min-width: 640px) {

            .menu {
                padding: 0.5rem;
            }
            .card-content {
                flex-direction: row;
            }

            .card-images {
                flex-direction: row;
            }

            .container label {
                width: unset;
            }

        }

        @media (min-width: 1280px) {

            .card-question-image, .card-answer-image {
                flex-direction: row;
            }

            .card-question-image label, .card-answer-image label {
                text-align: left;
                white-space: nowrap;
            }

            .card-content textarea {
                width: 12rem;
            }

            .question-image, .answer-image {
            display: block;
            }


        
        }





        
    `
    }
}

window.customElements.define('cards-switcher', CardsSwitcher)