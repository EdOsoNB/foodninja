const URL = 'http://localhost:3000/recetas';
export async function fetchAPI() {
    try {
        const response = await fetch(URL);
        if(response.status != 200) throw new Error('Failed to fetch')
        const data = await response.json()
        return data
    } catch(e){
        console.log(e)
    }
}

export async function createNewRecipe(title, ingredients) {
    try {
        const recipe = await fetch(URL, {
            method: 'POST',
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                title,
                ingredients
            })
        })

        if(!recipe.ok) {
            throw new Error("Error al agregar la receta");
        }
    } catch(e) {
        console.log(e)
    }
}

export async function deleteProduct(id) {
    try {   
        const product = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type" : "application/json"
            }
        })

        if(!product.ok) {
            throw new Error("Error al eliminar la receta");
        }
    } catch(e) {
        console.log(e)
    }
}
