import { LitElement, html, css } from "lit";

export class MenuElement extends LitElement {

    static properties = {
        // openAbout: { type: Boolean }
    }

    static styles = css`
        :host {
            background-color: white;
            height: 100%;
            width: 50%;
            padding: 10px 0 10px 10px;
        }
        li {
            list-style: none;
            padding: 10px 20px;
        }
        li:hover {
            background-color: #06e3be;
            transition: all 1s ease-out;
        }
        a {
            display: inline-block;
            width: 100%;
            cursor: pointer;
        }
    `;

    constructor() {
        super();
        // this.openAbout = false;
    }

    _openAbout() {
        const openAboutView = new CustomEvent('openabout', {
            detail: { isOpen: true},
            bubbles: true,
            composed: true
        })
        this.dispatchEvent(openAboutView)
    }
    _openHome() {
        const openHomeView = new CustomEvent('openhome', {
            detail: { isOpen: true},
            bubbles: true,
            composed: true
        })
        this.dispatchEvent(openHomeView)
    }
    _openContact() {
        const openContactView = new CustomEvent('opencontact', {
            detail: { isOpen: true},
            bubbles: true,
            composed: true
        })
        this.dispatchEvent(openContactView)
    }

    render() {
        return html`
            <h2>FOODNINJA</h2>
            <ul>
                <li><a @click=${this._openHome}>Home</a></li>
                <li><a @click=${this._openAbout}>About</a></li>
                <li><a @click=${this._openContact}>Contact</a></li>
            </ul>
        `;
    }
}

customElements.define('menu-element', MenuElement)