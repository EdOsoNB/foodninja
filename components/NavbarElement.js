import { LitElement, html, css } from "lit";

export class NavbarElement extends LitElement {

    static properties = {
        openMenu: { type: Boolean }
    }

    static styles = css`
        :host {
            width: 300px
        }
        nav {
            background-color: #02cdab;
            display: flex;
            justify-content: space-between;
            padding: 20px 10px;
            align-items: center;
        }
        a#logo {
            font-size: 32px;
            text-decoration: none;
            color: white;
        }
        a#logo > span {
            font-size: 40px;
            font-weight: bold;
        }
        div {
            cursor: pointer;
        }
        div p {
            color: white;
            font-size: 40px;
            height: 5px;
            margin: 0;
        }
        div p:last-child {
            margin-bottom: 80px;
        }
    `;

    constructor() {
        super();
        this.openMenu = false;
    }

    _handleMenu() {
        this.openMenu = !this.openMenu;
        const openMenu = new CustomEvent('openmenu', {
            detail: {isOpen: this.openMenu},
            bubbles: true,
            composed: true,
        })
        this.dispatchEvent(openMenu)
    }

    render() {
        return html`
            <nav>
                <a href="#" id="logo">Food<span>Ninja</span></a>
                <div @click=${this._handleMenu}>
                    <p>_</p>
                    <p>_</p>
                    <p>_</p>
                </div>
            </nav>
            <slot></slot>
        `;
    }
}
customElements.define('navbar-element', NavbarElement)