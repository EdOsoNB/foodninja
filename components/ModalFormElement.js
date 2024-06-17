import { LitElement, html, css } from "lit";
import { createNewRecipe } from "../fetchAPI";

export class ModalFormElement extends LitElement {
 
    get _input() {
        this.recipeTitle = this.shadowRoot?.querySelector('#recipeTitle') ?? null
        this.recipeIngredients = this.shadowRoot?.querySelector('#recipeIngredients') ?? null 
        if(this.recipeTitle.value.trim() && this.recipeIngredients.value.trim()) {
            return {title: this.recipeTitle.value.trim(), ingredients: this.recipeIngredients.value.trim()}
        } else {
            return 'Ingresar datos'
        }
        
    }

    static properties = {
        recipeTitle: {},
        recipeIngredients: {}
    }

    static styles = css`
        :host {
            background-color: white;
            min-width: 100vw;
            height: 100vh;
            display: grid;
            place-content: center;
            justify-items: center;
            font-family: Verdana;
            transition: 0.5s all;
        }
        h2 {
            border-bottom: 2px solid #02cdab;
            padding: 10px;
        }
        .field {
            padding: 10px 20px;
            width: 300px;
            
        }
        label {
            display: block;
            margin-bottom: 5px;
            /*+color: #02cdab;*/
        }
        input[type="text"] {
            width: 100%;
            box-sizing: border-box;
            outline: none;
            border: none;
            border-bottom: 1px solid #02cdab;
            padding: 10px 20px;
        }
        input[type="submit"] {
            padding: 10px 20px;
            background-color: #02cdab;
            border: none;
            border-radius: 5px;
            margin-top: 20px;
            width: 100px;
            color: white;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background-color: #06e3be;
            transition: 0.5s all ease-in;
        }
    `;


    constructor() {
        super();
        this.recipeTitle = '';
        this.recipeIngredients = '';
        this.requiered = false;
    }
    _listenEvent() {        
        const sendData = new CustomEvent('sendata', {
            detail: {data: this._input, closeMForm: false, iconButton: '+'},
            bubbles: true, 
            composed: true
        });
        this.dispatchEvent(sendData)
        createNewRecipe(this._input.title, this._input.ingredients)
        this.recipeTitle.value = ''
        this.recipeIngredients.value = ''
    }

    render() {
        return html`
            <h2>New Recipe</h2>
            <div class="field">
                <label for="recipeTitle">Recipe Title</label>
                <input type="text" id="recipeTitle" required>
            </div>
            <div class="field">
                <label for="recipeIngredients">Recipe Ingredients</label>
                <input type="text" id="recipeIngredients" required>
            </div>
            <input type="submit" @click=${this._listenEvent} value="Add">
        `;
    }
}
customElements.define('modal-form', ModalFormElement)