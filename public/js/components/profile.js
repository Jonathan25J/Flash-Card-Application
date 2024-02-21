import { LitElement, css, html } from 'lit-element';
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
        return html`<div class="container">
        <div class="title">${this.title}</div>
        <div class="line"></div>
        <div class="description">${this.description}</div>
        </div>
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
            background-image: linear-gradient(to bottom, #ffffff 0%, #bdbdbd 80%);
            border-radius: 2.5rem;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .title {
            text-align: center;
        }

        .line {
            width: 80%;
            height: 5%;
            background-color: #5b5b5b;
            margin: 0.5rem;
            border-radius: 0.5rem;
        }
    `
    }
}

window.customElements.define('profile-widget', Profile)