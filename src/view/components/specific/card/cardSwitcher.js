import { LitElement, css, html } from 'lit-element';
import { cardController } from '../../../../controller/CardController.js';
import { profileController } from '../../../../controller/ProfileController.js';
import { Card } from '../../../pages/js/cards/card.js';
import './card-element.js';
export class CardsSwitcher extends LitElement {

    static get properties() {
        return {
            currentCard: {
                Type: Object
            }
        }
    }

    constructor() {
        super()
        this.currentCard = {}
        this.options = []
        this.profileId = window.location.href.split('/')[4]
        this.cards = []
    }


    connectedCallback() {
        super.connectedCallback();
        this._retrieveCards()

    }

    firstUpdated() {
        super.firstUpdated();
        this.cardElement = this.shadowRoot.querySelector('card-element')
    }

    updated() {
        super.updated();

    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`<div class="container">
        <div class="menu" id=card-switcher-menu">
        <div class="selector-container">
        <label for="card-selector">Card</label>
        <select name="card-selector" id=card-selector @change="${this._cardIsSelected}"  @click="${this._cardIsSelected}" class="card-selector">
        ${this.options.map(option => html`${option}`)}
        </select>
        </div>
        <div class="buttons">
        <a href="" class="menu-button" @click="${this._removeCard}">
        <img src="/images/icons/remove-btn.png" alt="Remove a card">
        </a>
        <a href="" class="menu-button" @click="${this._newCard}">
         <img src="/images/icons/add-btn.png" alt="Add a new card">
        </a>
        </div></div>
        <div class="card">
        <card-element></card-element>
        </div>
        </div>
    `
    }

    _retrieveCards() {
        profileController.getProfile(this.profileId).then((profile) => {
            this.options = []
            this.cards = []
            this.cards = profile.cards
            for (let cardIteration in profile.cards) {
                let card = profile.cards[cardIteration]
                const cardOption = html` <option value=${card.id}>${card.name}</option>`
                this.options = [...this.options, cardOption]
            }
            
            this.requestUpdate()
        }).catch((err) => {
            if (err.response && err.response.status !== 402)
                location.reload()
        })
    }

    _cardIsSelected() {
        const cardId = this.shadowRoot.querySelector('#card-selector').value
        if (cardId == '') return
        const card = new Card(this.cards.find(card => card.id == cardId))
        this.cardElement.setCard(card)
    }

    _refresh() {
        this.currentCard = this.cardElement.retrieve()
        this._retrieveCards()
    }

    _addCard() {
        cardController.addCard(this.profileId, this.currentCard).then(() => {
            this._retrieveCards()
        })
    }

    _updateCard() {
        cardController.updateCard(this.profileId, this.currentCard).then(() => {
            this._retrieveCards()
        })
    }

    _newCard(e) {
        e.preventDefault()
        this._refresh()
        if (!this.cardElement.isValid()) return
        this.currentCard.id == '' ? this._addCard() : this._updateCard()
        this.cardElement.clear()
    }

    _removeCard(e) {
        e.preventDefault()
        this.currentCard = this.cardElement.retrieve()
        if (this.currentCard.id == '') return
        cardController.deleteCard(this.profileId, this.currentCard.id).then(() => {
            this._refresh()
            this.cardElement.clear()
        })
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

        .card {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
        }

        card-element {
            display: block;
            height: 100%;
            width: 100%;
        }

        @media (min-width: 640px) {

            .menu {
                padding: 0.5rem;
            }

            .container label {
                width: unset;
            }

        }
        
    `
    }
}

window.customElements.define('cards-switcher', CardsSwitcher)