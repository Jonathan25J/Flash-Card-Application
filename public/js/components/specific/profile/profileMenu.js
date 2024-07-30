import { LitElement, css, html } from 'lit-element';
import { profileController } from '../../../controllers/ProfileController.js';
import { updatePage } from '../../../utils/operations.js';
import '../../global/modal.js';
export class ProfileMenu extends LitElement {

    static get properties() {
        return {
            id: {
                type: String
            },
            title: {
                type: String, attribute: false
            }
        }
    }

    constructor() {
        super()
    }

    connectedCallback() {
        super.connectedCallback();
        profileController.getProfile(this.id).then((profile) => {
            this.title = profile.title
            this.description = profile.description
        })


    }

    firstUpdated() {
        super.firstUpdated();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`<modal-widget title=${this.title}>
        <div class="container">
        <div class="menu">
        <button class="delete" @click="${this._createDeleteProfileMenu}">delete</button>
        <button class="edit" @click="${this._createEditProfileMenu}">edit</button>
        </div>
        <div class="redirect">
        <button class="cards" @click="${this._redirectCards}">
        <img src="/images/icons/cards-btn.png" alt="Edit cards">
        </button>
        <button class="practice" @click="${this._redirectPractice}">
        <img src="/images/icons/practice-btn.png" alt="Practice">
        </button>
        </div>
        </div>
        </modal-widget>
    `
    }

    create(id) {
        this.id = id
        document.body.append(this)
    }

    _createDeleteProfileMenu() {
        const modal = document.createElement('modal-widget')
        modal.setPrompt("delete profile", "Are you sure you want to delete your profile?", this._deleteProfile.bind(this))
    }

    _createEditProfileMenu() {
        const modal = document.createElement('modal-widget')
        modal.setContent("edit profile", this._createForm())
    }

    _deleteProfile() {
        const modal = document.querySelector('modal-widget')
        profileController.deleteProfile(this.id).then(() => {
            modal.remove()
            updatePage()
            this.remove()
        })
    }

    _createForm() {
        return html`
        <form class="basic" @submit="${(e) => {
                e.preventDefault()
                const data = new FormData(e.target);
                this._editProfile(data.get('title'), data.get('description'))
            }}">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" value="${this.title}">
        <label for="description">Description</label>
        <input type="text" id="description" name="description" value="${this.description}">
        <input type="submit" value="Edit">
        </form> 
        `
    }

    _editProfile(title, description) {
        const modal = document.querySelector('modal-widget')
        if (title.trim().length === 0) {
            modal.remove()
            return
        }

        let profile = {
            id: this.id,
            title: title,
            description: description
        }

        profileController.updateProfile(profile).then(() => {
            modal.remove()
            this.title = title
            this.description = description
            updatePage()
        })

    }

    _redirectCards() {
        window.location.href = `/profile/${this.id}/cards`
    }

    _redirectPractice() {
        window.location.href = `/profile/${this.id}/practice`
    }

    static get styles() {
        return css`
        .container {
            height: 100%;
            width: 100%;
            background-color: var(--clr-menu-cnt);
        }

        .menu {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            padding: 1rem;
        }

        .delete {
            background-color: #fb7878;
        }

        .edit {
            background-color: #78cfb7;
        }

        .redirect {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            height: 70%;
        }

        .redirect button {
            width: 5rem;
            height: 5rem;
            background-color: var(--clr-menu-btn);
            border-radius: 2.5rem;
        }

        button img {
            height: 80%;
            width: 80%;
        }

        button {
            appearance: button;
            backface-visibility: hidden;
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

        @media (min-width: 640px) {
            .redirect button { 
                width: 10rem;
                height: 10rem;
            }
        }
    `
    }
}

window.customElements.define('profile-menu', ProfileMenu)