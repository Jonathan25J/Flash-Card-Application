import { LitElement, css, html } from 'lit-element';
import './profileMenu.js';
export class Profile extends LitElement {

    static get properties() {
        return {
            id: {
                type: String
            },
            title: {
                type: String
            },
            description: {
                type: String
            }
        }
    }

    constructor() {
        super()
        this.title = 'new Profile'
        this.description = 'a profile for learning'
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
        return html`<div class="container" @click="${this._showMenu}">
        <div class="title">${this.title}</div>
        <div class="line"></div>
        <div class="description">${this.description}</div>
        </div>
    `
    }

    _showMenu() {
        const menu = document.createElement('profile-menu')
        menu.create(this.id)
    }

    _createMenu() {
        return html`
        <form class="basic" @submit="${(e) => {
                e.preventDefault()
                const data = new FormData(e.target);
                this._addProfile(data.get('title'), data.get('description'))
            }}">
        <label for="title">Title</label>
        <input type="text" id="title" name="title">
        <label for="description">Description</label>
        <input type="text" id="description" name="description">
        <input type="submit" value="Submit">
        </form> 
        `
    }

    static get styles() {
        return css`
        .container {
            display: flex;
            height: 100%;
            width: 100%;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background-image: var(--clr-profile-bg);
            border-radius: 2.5rem;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .title, .description{
            text-align: center;
        }

        .line {
            width: 80%;
            height: 5%;
            background-color: var(--clr-profile-line);
            margin: 0.5rem;
            border-radius: 0.5rem;
        }
    `
    }
}

window.customElements.define('profile-widget', Profile)