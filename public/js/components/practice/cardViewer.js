import { LitElement, css, html } from 'lit-element';
import '../container.js';
export class CardViewer extends LitElement {

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
        <div class="content">
        <container-element>
        <div slot="r1-c1" class="test red"></div>
        <div slot="r1-c2" class="test blue"></div>
        <div slot="r1-c3" class="test green"></div>
        </container-element>
        </div>
        <div class="options"></div>
        </div>
    `
    }


    static get styles() {
        return css`
          .container {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 0.5rem;
            overflow-y: auto;
            scrollbar-color: lightblue transparent;
        }

        .content {
            flex: 1;
        }

        .options {
            height: 3.75rem;
            border-radius: 0.5rem;
            background-color: rgba(0, 0, 0, 0.4);
            padding: 0.25rem 0rem 0.25rem 0rem;
        }

        .test {
            display: block;
            height: 100%;
            width: 100%;

        }

        .red {
            background-color: red;
        }

        .blue {
            background-color: blue;
        }

        .green {
            background-color: green;
        }


        
    `
    }
}

window.customElements.define('card-viewer', CardViewer)