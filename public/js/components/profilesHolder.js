import { LitElement, css, html } from 'lit-element';
export class ProfilesHolder extends LitElement {

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
        </div>
    `
    }

    

    static get styles() {
        return css`
        .container {
            height: 100%;
            width: 100%;
        }
    `
    }
}

window.customElements.define('profiles-holder', ProfilesHolder)