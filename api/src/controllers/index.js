const axios = require('axios');
const {Recipe, Diet} = require('../db');

//const { YOUR_API_KEY } = process.env;
//const YOUR_API_KEY ='e69333de00464ffd9cc64199a069f996';
//const YOUR_API_KEY = '2a99b88b27a44e39ae21b0d278da22f3'
//const YOUR_API_KEY = 'cf5c4ae409d04f30a860a74e35b60376';
const YOUR_API_KEY = '0ae0b83ea0e546118bca24853133b478';
//const YOUR_API_KEY = '6f3d6c4d71ac4b0199cb80d25ae5d800';
//const YOUR_API_KEY = '6f3d6c4d71ac4b0199cb80d25ae5d800';
//const YOUR_API_KEY = 'a79c98fb241d42f2894f7564bc9b5c9d';
//const YOUR_API_KEY = '91082e5ba14c4f67ac44f6ae100914a2';


const getAllRecipes = () => {
    let recipedbPromise = Recipe.findAll({
        include:Diet,
    })

    let apiRecipe =  axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
    
    return Promise.all([
        recipedbPromise,
        apiRecipe
    ]).then(response => {
        let recipeDB = response[0];
        let recipeAPI = response[1].data.results;
        recipeDB = recipeDB.map(e => {
            return {
                id:e.id,
                name:e.name,
                image:e.image,
                summary:e.summary,
                spoonacularScore:e.spoonacularScore,
                healthScore:e.healthScore,
                analyzedInstructions:e.analyzedInstructions,
                diets:e.diets.map(e =>{
                    return{
                        id:e.id,
                        name:e.name,
                    }
                })

            }
        })
        recipeAPI = recipeAPI.map(elem => {
            return {
                id:elem.id,
                name:elem.title,
                image:elem.image,
                summary:elem.summary,
                spoonacularScore:elem.spoonacularScore,
                healthScore:elem.healthScore,
                analyzedInstructions:elem.analyzedInstructions,
                diets:elem.diets.map(el => {return {name:el}})
            }
        })
        let allrecipe = [...recipeDB,...recipeAPI]
        if(allrecipe) return allrecipe;
    }) 

}

module.exports = {
    getAllRecipes,
}