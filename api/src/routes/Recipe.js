const express = require('express');
const {Recipe, Diet} = require('../db');
const axios = require('axios')
const {getAllRecipes} = require('../controllers');



const app = express.Router()
//const { YOUR_API_KEY } = process.env;
//const YOUR_API_KEY ='e69333de00464ffd9cc64199a069f996';
const YOUR_API_KEY ='2a99b88b27a44e39ae21b0d278da22f3';
//const YOUR_API_KEY = 'cf5c4ae409d04f30a860a74e35b60376';
//const YOUR_API_KEY = '0ae0b83ea0e546118bca24853133b478'; 
//const YOUR_API_KEY = '6f3d6c4d71ac4b0199cb80d25ae5d800';
//const YOUR_API_KEY = '6f3d6c4d71ac4b0199cb80d25ae5d800';
//const YOUR_API_KEY = 'a79c98fb241d42f2894f7564bc9b5c9d';
//const YOUR_API_KEY = '91082e5ba14c4f67ac44f6ae100914a2';
 
// [] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado

app.get('/recipes-name', async (req,res,next) => {
    const {name} = req.query;
    try{
        let getRecipes = await getAllRecipes();
        if(name){
            let recipesFilter = await getRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            recipesFilter.length > 0 ? 
            res.status(200).json(recipesFilter):
            res.status(404).send({message:'No esta la receta seleccionada' + ' ' + name})
        }else {
            res.status(200).json(getRecipes);
        } 
    }catch(err){
        next(err)
    }
})

// [] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados

app.get('/recipes/:id', async (req,res,next) => {
    try{
        const {id} = req.params;
        if(!id) return next({mesagge:'No ingresaste un id correcto'})
        
        if(typeof id === 'string' && id.length > 10){
            let findById = await Recipe.findByPk(id, {
                include:Diet
            });
            return res.json(findById)
        }else {
            let getByIdAPI = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`)
            let findByIdAPI = {
                    id:getByIdAPI.data.id,
                    name:getByIdAPI.data.title,
                    image:getByIdAPI.data.image,
                    summary:getByIdAPI.data.summary,
                    spoonacularScore:getByIdAPI.data.spoonacularScore,
                    healthScore:getByIdAPI.data.healthScore,
                    analyzedInstructions:getByIdAPI.data.analyzedInstructions.map(el => el.steps),
                    diets:getByIdAPI.data.diets.map(el => {return {name:el}})
                }
                return res.json(findByIdAPI)
            }
    }catch(err){
        next(err)
    }
})



// POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos

// Nombre
// Resumen del plato
// Puntuación
// Nivel de "comida saludable"
// Paso a paso
// [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// [ ] Botón/Opción para crear una nueva receta

app.post('/recipe', async (req,res, next) => {
    try{
        const imageDefault = 'https://assets.myfoodandfamily.com/adaptivemedia/rendition/id_866c5375f5767edfdd1a438cd9f4d981413d4ea8/clid_mff/prid_ALL-DEFAULT-OPTIONS/name_./ck-lf-nuestras-mejores-recetas-con-carne-de-pollo-783x405';
        
            let {name, image, diets, summary, spoonacularScore, healthScore,
            analyzedInstructions} = req.body;
    
            if(!image) image = imageDefault;
            if(!name || !summary || !spoonacularScore || !healthScore || !analyzedInstructions) return res.json({message:'Los campos son requeridos, por favor ingresar los datos completos...'})
            let recipe = await Recipe.create({
                name,
                image,
                summary,
                spoonacularScore:parseFloat(spoonacularScore),
                healthScore:parseFloat(healthScore),
                analyzedInstructions
            });
            let dieta = await Diet.findAll({where: {name:diets}})
            await recipe.addDiets(dieta)
    
            res.status(200).send(dieta)
    }catch(err){
        next(err)
    }

})


module.exports = app;