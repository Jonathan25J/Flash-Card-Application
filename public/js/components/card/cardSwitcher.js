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

    updated() {
        super.updated();
        const questionImage = this.shadowRoot.querySelector('#question-image')
        const answerImage = this.shadowRoot.querySelector('#answer-image')
        const questionImageContainer = this.shadowRoot.querySelector('.card-question-image')
        const answerImageContainer = this.shadowRoot.querySelector('.card-answer-image')

        if (questionImage.classList.contains("visible")) {
            questionImageContainer.classList.add('image-added');
        } else {
            questionImageContainer.classList.remove('image-added');
        }

        if (answerImage.classList.contains("visible")) {
            answerImageContainer.classList.add('image-added');
        } else {
            answerImageContainer.classList.remove('image-added');
        }

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
        <img class="question-image" id=question-image src="" alt="Question image">
        <img class="answer-image" id=answer-image  src="" alt="Answer image">
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
        <div class="c-q-i-container">
        <label for="c-q-i-input">Paste image question</label>
        <input type="text" @paste="${this._pasteImage}" id="c-q-i-input" name="c-q-i-input">
        </div>
        <div class="c-q-i-b-container">
        <button id=c-q-i-button @click="${this._triggerUploadImageEvent}">Upload Image
        <input type="file" id=c-q-i-input-h @change="${this._uploadImage}" accept="image/*" hidden>
        </button>
        <button id=c-q-i-remove-button @click="${this._removeImage}">Remove Image</button>
        </div>
        </div>
        <div class="card-answer-image">
        <div class="c-a-i-container">
        <label for="c-a-i-input">Paste image answer</label>
        <input type="text" @paste="${this._pasteImage}" id="c-a-i-input" name="c-a-i-input">
        </div>
        <div class="c-q-i-b-container">
        <button id=c-a-i-button @click="${this._triggerUploadImageEvent}">Upload Image
        <input type="file" id=c-a-i-input-h @change="${this._uploadImage}" accept="image/*" hidden>
        </button>
        <button id=c-a-i-remove-button @click="${this._removeImage}">Remove Image</button>
        </div>
        </div>
        </div>
        </div>
        </div>
    `
    }

    _pasteImage(e) {
        e.preventDefault();
        let items = (e.clipboardData || window.clipboardData).items

        let image = this.shadowRoot.querySelector(`#${e.target.id == 'c-q-i-input' ? 'question-image' : 'answer-image'}`)
        let currentElement = this
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                let blob = item.getAsFile();

                const reader = new FileReader();

                reader.onload = (e) => {
                    let imageData = e.target.result;
                    image.src = imageData
                    image.classList.add('visible')
                    currentElement.requestUpdate()
                }

                reader.readAsDataURL(blob);

            }
        }


    }

    _triggerUploadImageEvent(e) {
        if (e.target.tagName != 'BUTTON') return
        this.shadowRoot.querySelector(`#${e.target.id == 'c-q-i-button' ? 'c-q-i-input-h' : 'c-a-i-input-h'}`).click()

    }

    _uploadImage(e) {
        e.preventDefault();
        const fileList = e.target.files;
        const image = this.shadowRoot.querySelector(`#${e.target.id == 'c-q-i-input-h' ? 'question-image' : 'answer-image'}`);
        let currentElement = this
        if (fileList.length > 0) {
            const file = fileList[0]; // Assuming single file selection
            const reader = new FileReader();

            reader.onload = (e)=> {
                const imageData = e.target.result;

                image.src = imageData;
                image.classList.add('visible');
                currentElement.requestUpdate();

            };

            reader.readAsDataURL(file);
        }
    }


    _removeImage(e) {
        const questionImage = this.shadowRoot.querySelector('#question-image')
        const answerImage = this.shadowRoot.querySelector('#answer-image')
        if (e.target.id == 'c-q-i-remove-button') {
            questionImage.src = ""
            questionImage.classList.remove('visible')
        } else {
            answerImage.src = ""
            answerImage.classList.remove('visible')
        }

        this.requestUpdate()
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
            overflow-x: hidden;
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
        .c-q-i-container > *,
        .c-a-i-container > *,
        .c-q-i-b-container > *,
        .c-a-i-b-container > * {
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
            width: 11rem;
            height: 11rem;
            top: 14%;
            left: 2.5%;
            opacity: 0.2;
            z-index: -1;
            display: none;
        }

        .answer-image {
            position: absolute;
            width: 11rem;
            height: 11rem;
            top: 14%;
            right: 2.5%;
            opacity: 0.2;
            z-index: -1;
            display: none;
        }

        .question-image.visible, .answer-image.visible {
            display: none;
        }

        .card-images input {
            width: 5rem;
        }

        .card-images button {
            appearance: button;
            backface-visibility: hidden;
            border-radius: 6px;
            border-width: 0;
            box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
            box-sizing: border-box;
            color: #fff;
            cursor: pointer;
            font-family: sans-serif;
            font-size: 100%;
            height: 44px;
            line-height: 1.15;
            outline: none;
            overflow: hidden;
            position: relative;
            text-align: center;
            text-transform: none;
            transform: translateZ(0);
            transition: all .2s,box-shadow .08s ease-in;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            width: 5rem;
        }

        #c-q-i-button, #c-a-i-button {
            background-color: rgb(95 163 144);
        }

        #c-q-i-remove-button, #c-a-i-remove-button {
            background-color: #594fad;
        }

        .c-q-i-container, .c-a-i-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .visible {
            display: block;
        }

        div.card-question-image.image-added button:first-child, div.card-answer-image.image-added button:first-child {
            background-color: rgb(60 97 151) !important;
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

            .question-image.visible, .answer-image.visible {
                display: block;
            }

          


        
        }





        
    `
    }
}

window.customElements.define('cards-switcher', CardsSwitcher)