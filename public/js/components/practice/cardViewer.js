import { LitElement, css, html } from 'lit-element';
import '../container.js';
export class CardViewer extends LitElement {

    static get properties() {
        return {
        }
    }

    constructor() {
        super()

        this.instructions = {
            direction: 'column',
            rows: 3,
            columns: 3,
            containerRatio: [ 1,2, 3],
            cellRatio: [1, 1, 1]
        }
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
        <container-element instructions="${JSON.stringify(this.instructions)}">
        <div slot="c1-r1" class="test red"></div>
        <div slot="c1-r2" class="test blue"></div>
        <div slot="c1-r3" class="test green"></div>
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