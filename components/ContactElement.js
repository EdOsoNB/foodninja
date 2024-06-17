import { LitElement, html, css } from "lit";

export class ContactElement extends LitElement {
    static styles = css`
        :host {
            text-align: center
        }
        div {
            width: 50%;
            margin: 0 auto;
        }
    `;
    render() {
        return html`
            <div>
                <h1>Contact</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, vero! Ut similique sunt quisquam architecto quasi consequuntur minus soluta! Deserunt dolorem, rem tempore dicta eligendi qui adipisci distinctio non repellendus?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, vero! Ut similique sunt quisquam architecto quasi consequuntur minus soluta! Deserunt dolorem, rem tempore dicta eligendi qui adipisci distinctio non repellendus?</p>
            </div>
        `;
    }
}

customElements.define('contact-element', ContactElement)