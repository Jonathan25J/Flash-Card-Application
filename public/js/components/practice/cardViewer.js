import { LitElement, css, html } from 'lit-element';
import { profileController } from '../../operations/controllers/ProfileController.js';
import '../container.js';
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
    }

    connectedCallback() {
        super.connectedCallback();
        profileController.getProfile(this.profileId).then((profile) => {
            this.cards = profile.cards.sort(() => Math.random() - 0.5)
            this.cardsLength = this.cards.length -1
            this._sendInstructions(this.cards[this.index])
        })
    }

    firstUpdated() {
        super.firstUpdated();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
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
        <a href="" @click="${this._revealAnswer}" ?hidden="${this.revealed}">
        <img src="/images/icons/reveal-btn.png" alt="Reveal answer">
        </a>
        <a href="" @click="${this._nextCard}" style="visibility: ${this.index ==  this.cardsLength ? 'hidden' : ''}">
        <img src="/images/icons/right-btn.png" alt="Go to next card">
        </a>
        </div>
        <div class="bar"></div>
        </div>
    `
    }

    _sendInstructions(card) {
        this.slots = []
        this.instructions = []
        let question = card.question.trim().length > 0
        let answer = card.answer.trim().length > 0
        let questionImage = card.questionImage != ''
        let answerImage = card.answerImage != ''

        if (question && answer && !questionImage && !answerImage) {
            this.instructions = {
                direction: 'row',
                rows: 3,
                columns: 3,
                containerRatio: [1, 0.5, 1],
                cellRatio: [{1:[1, 2, 1]},{2:[0.5, 1, 0.5]},{3:[1, 2, 1]}]
            }
            this.slots.push(html`<div slot="r1-c2" class="slot align question"><p>${card.question}</p</div>`)
            this.slots.push(html`<div slot="r3-c2" class="slot align"><textarea>${card.answer}</textarea></div>`)

        }

        let data = this.slots.map(slot => html`${slot}`)
        let container = html`<container-element instructions="${JSON.stringify(this.instructions)}">${data}</container-element>`
        this.card = container
        this.requestUpdate()
    }

    _previousCard(e) {
        e.preventDefault()
        if (this.index - 1 < 0) return
        this.index = this.index - 1
        this._sendInstructions(this.cards[this.index])
    }

    _revealAnswer(e) {
        e.preventDefault()
        this.revealed = !this.revealed
    }

    _nextCard(e) {
        e.preventDefault()
        if (this.index + 1 >= this.cards.length) return
        this.index = this.index + 1
        this._sendInstructions(this.cards[this.index])
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
            top: 40%;

        }

        .options a {
            width: 3.5rem;
            height: 3.5rem;
            margin: 0rem 1rem 0rem 1rem
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
        }

        textarea {
            height: 40%;
            width: 80%;
            text-align: center;
            font-size: 1rem;
        }





        
    `
    }
}

window.customElements.define('card-viewer', CardViewer)