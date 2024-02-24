import { LitElement, css, html } from 'lit-element';
export class ContainerElement extends LitElement {

    static get properties() {
        return {
            instructions: {
                Type: Object
            }
        }
    }

    constructor() {
        super()
        this.instructions = {
            direction: 'row',
            rows: 3,
            columns: 5,
            containerRatio: [1, 1, 1],
            cellRatio: {1: [1, 5, 1, 1, 1]}
        }
        this.containers = []
    }

    connectedCallback() {
        super.connectedCallback();
        this.generate()

    }

    firstUpdated() {
        super.firstUpdated();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    generate() {
        this.containers = []
        this.holders = []

        let direction = this.instructions.direction == 'column' ? 'container-column' : 'container-row'
        let element1 = this.instructions.direction == 'column' ? 'columns' : 'rows';
        let element2 = this.instructions.direction == 'column' ? 'rows' : 'columns';


        for (let i1 = 1; i1 < this.instructions[element1] + 1; i1++) {
            let cells = []
            for (let i2 = 1; i2 < this.instructions[element2] + 1; i2++) {
                cells.push(html`<div class="slot-container" style="flex: ${this.instructions.cellRatio[i2 - 1]};"><slot name="${element1[0]}${i1}-${element2[0]}${i2}"></slot></div>`)
            }
            let holder = html`<div class="holder ${element1.slice(0, -1)}" style="flex: ${this.instructions.containerRatio[i1 - 1]};"> ${cells.map(cell => html`${cell}`)}</div>`
            this.holders.push(holder)
        }
        this.containers = html`<div class="container ${direction}">${this.holders.map(container => html`${container}`)}</div>`
    }

    render() {
        return html`<div class="wrapper">
        ${this.containers}
        </div>
    `
    }

    // _transformList() {

    // }

    static get styles() {
        return css`
         .wrapper {
            display: block;
            height: 100%;
            width: 100%;
        }

        .container {
            display: flex;
            height: 100%;
            width: 100%;
        }

        .container-row {
            flex-direction: column;
        }

        .container-column {
            flex-direction: row;
        }

        .column {
            flex-direction: column;
        }

        .row {
            flex-direction: row;
        }

        .holder {
            display: flex;
            flex: 1;
        }

        slot {
            flex: 1;
        }
        
    `
    }
}

window.customElements.define('container-element', ContainerElement)