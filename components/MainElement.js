import { LitElement, html, css, nothing } from "lit";
import { fetchAPI, deleteProduct } from "../fetchAPI";

export class MainElement extends LitElement {

    static properties = {
        data: {},
        recipes: { type: Array },
        recipesAPI: { type: Array },
        _openModalForm: { type: Boolean},
        _changeIcon: {type: Boolean},
        _openMenu: { type: Boolean},
        _openAbout: { type: Boolean },
        _openContact: { type: Boolean}
    }

    static styles = css`
        :host {
            font-family: Verdana;
        }
        h1 {
            text-align: center;
            box-sizing: border-box;
        }
        .cards {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-bottom: 50px;
        }
        .card {
            background-color: #f2f1f1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            padding: 10px 30px;
            border-radius: 5px;
            
            -webkit-box-shadow: 10px 10px 8px -5px rgba(232,232,232,1);
            -moz-box-shadow: 10px 10px 8px -5px rgba(232,232,232,1);
            box-shadow: 10px 10px 8px -5px rgba(232,232,232,1);
        }
        .card .info {
            display: flex;
            justify-content: space-between;
            width: 300px;
            align-items: center;
        }
        .info > div {
            text-align: center;
            width: calc(100% - 90px)
        }
        .card img {
            width: 80px;
            height: 80px;
            border-radius: 100%;
            background-color: grey;
        }
        button#borrar {
            margin: 10px;
            padding: 5px 10px;
            border: none;
            background-color: #a80606;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        button#borrar:hover {
            background-color: #cb0a0a;
            transition: 0.5s all ease-in;
        }
        button#open {
            background-color: #02cdab;
            border: none;
            padding: 15px;
            border-radius: 100%;
            width: 50px;
            height: 50px;
            position fixed;
            bottom: 10px;
            right: 10px;
            position: fixed;
            z-index: 1;
            cursor: pointer;
            color: white;
            font-weight: bold;
            font-size: 32px;
            line-height: 0;
            transition: all .7s ease-in-out;
        }
        button#open:hover {
            background-color: #06e3be;
            transform: rotate(360deg)
        }
        ::slotted(modal-form) {
            position: fixed;
            top: 0;
        }
        ::slotted(menu-element) {
            position: fixed;
            top: 0;
            right: 0;
        }

        .info p {
            font-size: 11px;
        }
        p.no-recipes {
            text-align: center;
        }
    `;

    constructor() {
        super();
        this._data = {}
        this.recipes = [
            {
                title: 'Arroz Rojo',
                ingredients: 'Arroz, jitomate, agua o caldo de pollo, sal'
            },
            {
                title: 'Arroz con Leche',
                ingredients: 'Arroz, leche, canela, pasas al gusto, azucar al gusto'
            }
        ]
        this._openModalForm = false;
        this._changeIcon = '+'
        this._openMenu = false;
        this._openAbout = false;
        this._openContact = false;
        this.recipesAPI = [];
    }

    async firstUpdated() {
        try {
            const data = await fetchAPI()
            this.recipesAPI = data
        } catch(e) {
            console.log(e)
        }
    }

    receivedData(e) {
        this._data = e.detail.data

        if(typeof this._data === 'object') {
            const updateRecipe = [...this.recipesAPI, this._data]
            this.recipesAPI = updateRecipe
            this._openModalForm = e.detail.closeMForm
            this._changeIcon = e.detail.iconButton
        } else {
            console.log(this._data)
        }
    }

    _deleteElement(id, index) {
        deleteProduct(id)
        this.recipesAPI.pop(index)
        const updateRecipes = [...this.recipesAPI]
        this.recipesAPI = updateRecipes
    }

    receivedMenu(e) {
        // this._openMenu = e.detail.isOpen
        this._openMenu = true
    }

    _openMForm() {
        this._openModalForm = !this._openModalForm
        if(this._openModalForm) {
            this._changeIcon = 'x'
        } else {
            this._changeIcon = '+'
        }
    }

    ocultarCard() {
        this.shadowRoot.querySelector('.cards').style.display = 'none';
        this.shadowRoot.querySelector('h1').style.display = 'none';
        this._openMenu = false;
        console.log(this._openMenu)
    }

    openAbout(e) {
        this._openAbout = e.detail.isOpen
        if(this._openAbout) {
            this.ocultarCard()
            this._openContact = false;
        }
    }
    openContact(e) {
        this._openContact = e.detail.isOpen
        if(this._openContact) {
            this.ocultarCard()
            this._openAbout = false;
        }
    }
    openHome(e) {
        if(e.detail.isOpen) {
            this.shadowRoot.querySelector('.cards').style.display = 'flex';
            this.shadowRoot.querySelector('h1').style.display = 'block';
            this._openMenu = false;
            this._openAbout = false;
            this._openContact = false;
        } 
    }

    render() {
        return html`
            <slot @openmenu=${this.receivedMenu} name="navbar"></slot>
            ${
                this._openAbout
                ? html`<about-element slot="about"></about-element>`
                : nothing
            }
            ${
                this._openContact
                ? html`<contact-element slot="contact"></contact-element>`
                : nothing
            }
            <h1>Recipes</h1>
            ${
                this._openMenu
                ? html`<slot name="menu" @openabout=${this.openAbout} @openhome=${this.openHome} @opencontact=${this.openContact}></slot>`
                : nothing
            }
            ${
                this._openModalForm
                ? html`<slot @sendata=${this.receivedData} name="form"></slot>`
                : nothing
            }
            ${
                this.recipesAPI.length !== 0
                ? html`
                    <div class="cards">
                        ${this.recipesAPI.reverse().map((recipe, index) => html`
                            
                            <div class="card" key=${recipe.id}>
                                <div class="info">
                                    <img >
                                    <div> 
                                        <h3>${recipe.title}</h3>
                                        <p>${recipe.ingredients}</p>
                                    </div>
                                </div>
                                <button id="borrar" @click=${() => this._deleteElement(recipe.id, index)}>Delete</button>
                            </div>
                        `)}
                    </div>
                `
                : html`
                    <p class="no-recipes">No hay recetas disponibles</p>
                `
            }        
            
            <button id="open" @click=${this._openMForm}>${this._changeIcon}</button>
        `;
    }
}
customElements.define('main-element', MainElement)