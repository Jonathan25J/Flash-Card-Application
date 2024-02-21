import { LitElement, css, html } from 'lit-element';
import { updatePage } from '../utils/operations.js';
export class Modal extends LitElement {

    static get properties() {
        return {

            title: { type: String },
            content: { type: String },
            slot: { type: Boolean },
            prompt: { type: Boolean },

        }
    }

    constructor() {
        super()
        this.title = ''
        this.content = ''
        this.slot = true
        this.prompt = false
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
        return html`<div class="modal ${this.prompt ? 'prompt' : ''}">
        <div class="window">
        <div class="menu">
        <div></div>
        <p>${html`${this.title}`}</p>
        <button class="exit" @click="${this.exit}">exit</button>
        </div>
        <div class="container">
        <div class="content">
        ${this.slot ? html`<slot></slot>` : this.content}
        </div>
        </div>
        </div>
        </div>
    `
    }

    setForm(title, content) {
        this.slot = false
        this.title = title
        this.content = content
        document.body.append(this)
    }

    setPrompt(title, message, method) {
        this.prompt = true
        this.slot = false
        this.title = title
        this.content = html`<div class="prompt-container">
        <p>${message}</p>
        <button @click="${method}">yes</button>
        </div>
        `
        document.body.append(this)
    }

    exit() {
        if (this.getRootNode() instanceof ShadowRoot) this.getRootNode().host.remove()
        updatePage()
        this.remove()
    }

    static get styles() {
        return css`
        .modal {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed; 
            z-index: 666; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            background-color: rgb(0,0,0); 
            background-color: rgba(0,0,0,0.4); 
        }

        .window {
            display:flex;
            flex-direction: column;
            width: 70%;
            height: 70%;
            border: 1.5rem solid var(--background-second-color);
            border-radius: 2rem;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        div.prompt .window {
            height: 30%;
        }

        .container {
            display:flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .menu {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            background-color: #ededed;
        }

        .menu div {
            display: none;
            width: 6rem;
        }

        .menu p {
            font-family: monospace;
            font-size: 1.1rem;
            text-align: center;
        }

        div.prompt button, form.basic button, button.exit, input[type="submit"] {
            appearance: button;
            backface-visibility: hidden;
            background-color: var(--background-second-color);
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
            padding: 0 25px;
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

        .exit {
            margin: 0.5rem;
            margin-right: 1.5rem;
        }

        .exit img {
           height: 100%;
           width: 100%;
        }

        .content {
            width: 100%; 
            height: 100%; 
        }

        form.basic {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            width: 100%; 
            height: 100%; 
            background-color: white;
        }

        form.basic input:not([type="submit"]) {
            text-align: center;
            background: #c9dcff;
            border: none;
            border-radius: 0.5rem;
            height: 2rem;
        }

        form.basic input[type="submit"]  {
            padding: 0;
            margin-top: 3rem;

        }

        form.basic label {
            font-size: 1.3rem;
            font-family: cursive;
        }
        form.basic > *:not(:first-child) {
            margin-top: 2rem;
        }

        div.prompt .prompt-container button {
            background-color: #78cfb7;
        }

        .prompt-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            background-color: white;
        }

        .prompt-container p {
            margin: 0;
            margin-right: 2rem;
            font-size: 1.2rem;
            font-family: emoji;
            text-align: center;
        }

        @media (min-width: 475px) {
            .menu div {
                display: block;
            }

            .menu {
            justify-content: space-between;
        }
        }
    `
    }
}

window.customElements.define('modal-widget', Modal)