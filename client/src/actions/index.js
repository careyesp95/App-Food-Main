import {
    GET_RECIPE_ALL, 
    GET_DIETS_ALL,
    GET_RECIPE_NAME,
    FILTER_BY_ORDER,
    FILTER_BY_CREATE,
    FILTER_BY_SCORE,
    FILTER_BY_DIETS,

} from './actionName.js';

export const getRecipeAll = function(){
    return function(dispatch){
        return fetch('http://localhost:3001/api/recipes-name')
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: GET_RECIPE_ALL,
                payload:response,
            })
        })
    }
}

export const getDietsAll = function(){
    return function(dispatch){
        return fetch('http://localhost:3001/api/types')
        .then(res => res.json())
        .then(response => {
            if(response !== undefined){
                dispatch({
                    type:GET_DIETS_ALL,
                    payload:response,
                })
            }
        })
        .catch(err => {
            if(err.response?.status !== 404) alert('Cargando')
        })
    }
}

export const getRecipeName = function(name){
    return function(dispatch){
        return fetch('http://localhost:3001/api/recipes-name?name=' + name)
        .then(res => res.json())
        .then(response => {
            dispatch({
                type:GET_RECIPE_NAME,
                payload:response,
            })
        })
        .catch(err => {
            if(err.response?.status !== 404) alert(`No existe una Receta llamada: ${name}`)
        })
    }
}


export const filterByOrder = function(status){ 
    return {
        type:FILTER_BY_ORDER,
        payload:status,
    }

}

export const filterByCreate = function(status){
    return {
        type:FILTER_BY_CREATE,
        payload:status
    }
}

export const filterByScore = function(status){
    return {
        type:FILTER_BY_SCORE,
        payload:status
    }
}

export const filterByDiets = function(status){
    return {
        type:FILTER_BY_DIETS,
        payload:status
    }
}