import { LitElement, css, html } from 'lit-element';
export class CardSwitcher extends LitElement {

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
        return html`
    `
    }


    static get styles() {
        return css`
        
    `
    }
}

window.customElements.define('card-switcher', CardSwitcher)