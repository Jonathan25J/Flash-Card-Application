import { LitElement, css, html } from 'lit-element';
import { PORT } from '../../../utils/port.js';
export class ThemeSwitcher extends LitElement {

    static get properties() {
        return {
            options: {
                type: Array
            }
        }
    }

    constructor() {
        super()
        this.options = ['default']
        this.root = document.documentElement
        this.ws = new WebSocket(`ws://localhost:${PORT}/store`);
    }

    connectedCallback() {
        super.connectedCallback();
        this.root.classList = []

        this.ws.onmessage = (e) => {
            this.root.classList.forEach(className => {
                if (className.startsWith('theme-')) {
                    this.root.classList.remove(className)
                }
            })
            this.root.classList.add(`theme-${e.data}`)
            this.themeSwitcher.value = e.data;

        };

    }

    firstUpdated() {
        super.firstUpdated();
        this.themeSwitcher = this.shadowRoot.querySelector('#themeSwitcher')
        this.setTheme()
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.ws.close()
    }

    render() {
        return html`<div class="container">
        <select id="themeSwitcher" @change="${() => {
                const theme = this.themeSwitcher.value
                this.ws.send(JSON.stringify({ type: 'set', location: 'theme', value: theme }));
                this.setTheme()
            }}">
        ${this.options.map(option => html`<option value=${option}>${option.replace('-', ' ')}</option>`)}
        </select>
        </div>
    `
    }

    async setTheme() {
        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({ type: 'get', location: 'theme' }));
        }
    }

    setOptions(options) {
        this.options = options
        this.requestUpdate()
    }


    static get styles() {
        return css`
          .container {
            position: absolute;
            left: 2rem;
            top: 2rem;
            width: 6rem;
            height: 3rem;
            border-radius: 0.5rem;
        }

        select {
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
            background-color: blue;
            background-color: #e7e7e7;
            text-align: center;
        }
        
    `
    }
}

window.customElements.define('theme-switcher', ThemeSwitcher);