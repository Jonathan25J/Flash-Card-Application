import { LitElement, css, html } from 'lit-element';
import { profileController } from '../../../../controller/ProfileController.js';
import '../../global/modal.js';
import './profile.js';
export class ProfilesHolder extends LitElement {

    static get properties() {
        return {
            profiles: {
                type: Array, attribute: false
            }
        }
    }

    constructor() {
        super()
        this.profiles = []
    }

    connectedCallback() {
        super.connectedCallback();

    }

    firstUpdated() {
        super.firstUpdated();
        this._retrieveProfiles()
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    manualUpdate() {
        this.profiles = []
        this._retrieveProfiles()
        this.requestUpdate()
    }

    render() {
        return html`<div class="container">
        <div class="menu">
        <a href="" @click="${this._showModal}" class="add-btn">
         <img src="/images/icons/add-btn.png" alt="Add profile">
         </a>
        </div>
        <div class="profiles">
        ${this.profiles.map(profile => html`${profile}`)}
        </div>
        </div>
    `
    }

    _showModal(e) {
        e.preventDefault();
        const modal = document.createElement('modal-widget')
        modal.setContent("create profile", this._createForm())
    }

    _addProfile(title, description) {
        const modal = document.querySelector('modal-widget')
        if (title.trim().length === 0) {
            modal.remove()
            return
        }
        const profile = document.createElement('profile-widget');
        profile.setAttribute('title', title);
        profile.setAttribute('description', description);

        modal.remove()

        let json = {
            title: title,
            description: description
        }
        profileController.addProfile(json).then((uuid) => {
            profile.setAttribute('id', uuid);
        })
        return this.profiles = [...this.profiles, profile]
    }

    _createForm() {
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

    _retrieveProfiles() {
        profileController.fetchProfiles().then((data) => {
            for (let profile in data.profiles) {
                if (data.profiles.hasOwnProperty(profile)) {
                    const widget = document.createElement('profile-widget');
                    widget.setAttribute('id', data.profiles[profile].id);
                    widget.setAttribute('title', data.profiles[profile].title);
                    widget.setAttribute('description', data.profiles[profile].description);
                    this.profiles = [...this.profiles, widget]
                }
            }
        })

    }



    static get styles() {
        return css`
        .container {
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 0.5rem;
            overflow-y: auto;
            scrollbar-color: lightblue transparent;
        }

        .menu {
            display: flex;
            justify-content: flex-end;
            border-radius: 0.5rem;
            position: sticky;
            top: 0;
            z-index: 5;
        }

        .add-btn {
            display: block;
            width: 3rem;
            height: 3rem;
            margin: 0.5rem;
        }

        .add-btn img {
           height: 100%;
           width: 100%;
        }

        .profiles {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        profile-widget {
            display: block;
            height: 12.5rem;
            width: 12.5rem;
            margin: 0.5rem;
            flex-shrink: 0;
        }

        @media (min-width: 640px) {
            .profiles {
                flex-direction: row;
                flex-wrap: wrap;
                height: 80%;
            }
        }
        
    `
    }
}

window.customElements.define('profiles-holder', ProfilesHolder)