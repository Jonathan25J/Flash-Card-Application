import { LitElement, css, html } from 'lit-element';
import { updatePage } from '../../../utils/globalOperations.js';
export class HomeButton extends LitElement {

    static get properties() {
        return {
        }
    }

    connectedCallback() {
        super.connectedCallback();

    }

    render() {
        return html`
        <a href="/" @click="${() => updatePage()}" class="home-btn">
        <img src="/images/icons/home-btn.png" alt="Home">
        </a>
    `
    }


    static get styles() {
        return css`
        .home-btn {
            position: absolute;
            left: 1.5rem;
            height: 4rem;
            width: 4rem;
            z-index: 666;
        }

        .home-btn img {
            height: 100%;
            width: 100%;
        }
        
    `
    }
}

window.customElements.define('home-button', HomeButton)