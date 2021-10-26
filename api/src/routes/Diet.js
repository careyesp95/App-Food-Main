const express = require('express');
const {Diet} = require('../db');

const app = express.Router()

// [] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá

app.get('/types', (_req,res, next) => {
    Diet.findAll()
    .then(response => {
        return res.json(response)
    })
    .catch((error) => {
        next(error)
    })
})

app.post('/typeCreate', async (req,res, next) => {
    try{
        const {name} = req.body;
        let dietaCreate = await Diet.findOrCreate({where:{name:name}})
        res.json(dietaCreate)
        
    }catch(err){
        next(err)
    }
    
    
})

module.exports = app;