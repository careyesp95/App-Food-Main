const { Router } = require('express');
const dietRouter = require('./Diet');
const recipeRouter = require('./Recipe');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/api',dietRouter)
router.use('/api',recipeRouter)

module.exports = router;
