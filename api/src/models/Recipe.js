const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
    },
    
    summary:{//resumen del plato
      type: DataTypes.TEXT,
      allowNull:false,
    },
    spoonacularScore:{ //puntuacion
      type: DataTypes.REAL

    },
    healthScore:{// nivel de comida saludable
      type: DataTypes.REAL,
    },
    analyzedInstructions:{ // paso a paso
      type: DataTypes.TEXT,
    },
  },{timestamps:false});
};
