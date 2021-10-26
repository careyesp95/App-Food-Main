const axios = require('axios');
const {Recipe, Diet} = require('../db');

// const { YOUR_API_KEY } = process.env;
const YOUR_API_KEY ='e69333de00464ffd9cc64199a069f996';

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