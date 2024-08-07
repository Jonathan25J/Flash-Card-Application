import { LitElement, css, html } from 'lit-element';
import { profileController } from '../../../../controller/ProfileController.js';
import '../../global/container.js';
import '../../global/modal.js';
export class CardViewer extends LitElement {

    static get properties() {
        return {
            index: {
                type: String
            },
            cards: {
                type: Object
            },
            revealed: {
                type: Boolean, reflect: true
            }
        }
    }

    constructor() {
        super()
        this.profileId = window.location.href.split('/')[4]
        this.index = 0
        this.revealed = false
        this.revealButton = true
    }

    connectedCallback() {
        super.connectedCallback();
        profileController.getProfile(this.profileId).then((profile) => {
            this.cards = profile.cards.sort(() => Math.random() - 0.5)
            this.cardsLength = this.cards.length - 1
            if (this.cardsLength == -1) return
            this._sendInstructions(this.cards[this.index])
        })

        window.addEventListener('keydown', this._buttonPressed.bind(this));
    }

    firstUpdated() {
        super.firstUpdated();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('keydown', this._buttonPressed.bind(this));
    }

    updated() {
        super.updated();
        if (this.cardsLength == -1) this.shadowRoot.querySelector('.options').style.display = 'none'

        this.shadowRoot.querySelectorAll('.slot').forEach((node) => node.querySelectorAll('.answer').forEach((node) => {
            if (this.revealed) {
                node.removeAttribute('hidden');
                node.classList.add('visible')
            } else {
                node.setAttribute('hidden', '');
                node.classList.remove('visible')
            }
        }))
    }

    render() {
        return html`<div class="container">
        <div class="content">
        ${this.card}
        </div>
        <div class="options">
        <a href="" @click="${this._previousCard}" style="visibility: ${this.index == 0 ? 'hidden' : ''}">
        <img src="/images/icons/left-btn.png" alt="Go to previous card">
        </a>
        ${this.revealButton ? html`
        <a href="" @click="${this._revealAnswer}" ?hidden="${this.revealed && this.revealButton}">
        <img src="/images/icons/reveal-btn.png" alt="Reveal answer">
        </a>
        `: html``}
        <a href="" @click="${this._nextCard}" style="visibility: ${this.index == this.cardsLength ? 'hidden' : ''}">
        <img src="/images/icons/right-btn.png" alt="Go to next card">
        </a>
        </div>
        <div class="bar"></div>
        </div>
    `
    }

    _sendInstructions(card) {
        this.slots = []
        this.card = []
        this.instructions = {
            direction: 'row',
            rows: 3,
            columns: 3,
            containerRatio: [1, 0.25, 1],
            cellRatio: [1, 1.25, 1]
        }
        let question = card.question.trim().length > 0
        let answer = card.answer.trim().length > 0
        let questionImage = card.questionImage != ''
        let answerImage = card.answerImage != ''
        let elements = this._createElementsList(question, answer, questionImage, answerImage, card)
        let count = elements.length

        if (count == 1) {
            this.instructions.rows = 1
            this.instructions.containerRatio = [1]
            this.instructions.cellRatio = [1, 4, 1]
            this.slots.push(html`<div slot="r1-c2" class="slot align">${elements[0]}</div>`)
        }

        if (count == 2) {
            this.instructions.cellRatio = [1, 3, 1]
            this.slots.push(html`<div slot="r1-c2" class="slot align">${elements[0]}</div>`)
            this.slots.push(html`<div slot="r3-c2" class="slot align">${elements[1]}</div>`)

            if (question && answer) {
                this.instructions.cellRatio = [1, 2, 1]
            }
        }


        if (count == 3) {
            if (question && questionImage) {
                this.slots.push(html`<div slot="r1-c2" class="slot align">${elements[0]}</div>`)
                this.slots.push(html`<div slot="r1-c1" class="slot align">${elements[1]}</div>`)
                this.slots.push(html`<div slot="r3-c2" class="slot align">${elements[2]}</div>`)
            }

            if (answer && answerImage) {
                this.slots.push(html`<div slot="r1-c2" class="slot align">${elements[0]}</div>`)
                this.slots.push(html`<div slot="r3-c2" class="slot align">${elements[1]}</div>`)
                this.slots.push(html`<div slot="r3-c3" class="slot align">${elements[2]}</div>`)
            }
        }

        if (count == 4) {
            this.slots.push(html`<div slot="r1-c2" class="slot align">${elements[0]}</div>`)
            this.slots.push(html`<div slot="r1-c1" class="slot align">${elements[1]}</div>`)
            this.slots.push(html`<div slot="r3-c2" class="slot align">${elements[2]}</div>`)
            this.slots.push(html`<div slot="r3-c3" class="slot align">${elements[3]}</div>`)

        }

        this.revealed = (question && count == 1 || questionImage && count == 1 || question && questionImage && count == 2)
        this.revealButton = !this.revealed
        let data = this.slots.map(slot => html`${slot}`)
        let container = html`<container-element instructions="${JSON.stringify(this.instructions)}">${data}</container-element>`
        this.card = container
        this.requestUpdate()
        this._updateContainer()
    }

    _createElementsList(question, answer, questionImage, answerImage, card) {
        let elements = []
        if (question) elements.push(html`<p class="question">${card.question}</p>`)
        if (questionImage) elements.push(html`<img class="visible" @click="${this._displayImage}" src="${card.questionImage}" alt="Question image">`)
        if (answer) elements.push(html`<textarea class="answer">${card.answer}</textarea>`)
        if (answerImage) elements.push(html`<img class="answer" @click="${this._displayImage}" src="${card.answerImage}" alt="Answer image">`)
        return elements
    }

    _previousCard(e) {
        e.preventDefault()
        if (this.index - 1 < 0) return
        this.index = this.index - 1
        this.revealed = false
        this._sendInstructions(this.cards[this.index])
    }

    _revealAnswer(e) {
        e.preventDefault()
        this.revealed = !this.revealed
        this.requestUpdate()
    }

    _nextCard(e) {
        e.preventDefault()
        if (this.index + 1 >= this.cards.length) return
        this.index = this.index + 1
        this.revealed = false
        this._sendInstructions(this.cards[this.index])
    }

    _buttonPressed(e) {
        switch (e.key) {
            case 'ArrowLeft':
                this._previousCard(e)
                break;
            case ' ':
            case 'ArrowDown':
                this._revealAnswer(e)
                break;
            case 'ArrowRight':
                this._nextCard(e)
                break;
            default:
                break;
        }
    }

    _updateContainer() {
        let container = this.shadowRoot.querySelector('container-element')
        if (container)
            container.requestUpdate()
    }

    _displayImage(e) {
        const modal = document.createElement('modal-widget')
        modal.setContent("Image viewer", html`<div class="image">${e.target.cloneNode(true)}</div>`)
    }


    static get styles() {
        return css`
          .container {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            position: relative;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 0.5rem;
            overflow-y: auto;
            scrollbar-color: lightblue transparent;
        }

        .content {
            flex: 1;
        }

        .options {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: absolute;
            width: 100%;
            height: 5rem;
            top: 41.5%;
            pointer-events: none;

        }

        .options a {
            width: 3.5rem;
            height: 3.5rem;
            margin: 0rem 1rem 0rem 1rem;
            pointer-events: auto;
        }

        .options img {
            display: block;
            width: 100%;
            height: 100%;
        }

        .bar {
            height: 3.75rem;
            border-radius: 0.5rem;
            background-color: rgba(0, 0, 0, 0.4);
            padding: 0.25rem 0rem 0.25rem 0rem;
        }

        .slot {
            display: flex;
            height: 100%;
            width: 100%;
        }

        .align {
            align-items: center;
            justify-content: center;
        }

        .question {
            font-size: 2rem;
            color: white;
            text-align: center;
            line-height: 2.5rem;
        }

        textarea {
            height: 40%;
            width: 80%;
            text-align: center;
            font-size: 1rem;
            border-radius: 0.5rem;
        }

        .slot img {
            display: none;
            max-width: 90%;
            max-height: 90%; 
            border-radius: 0.5rem;
        }

        @media (min-width: 1280px) {

            .visible {
                display: block !important;
            }
        }
        





        
    `
    }
}

window.customElements.define('card-viewer', CardViewer)