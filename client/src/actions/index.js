import {
    GET_RECIPE_ALL, 
    GET_DIETS_ALL,
    GET_RECIPE_NAME,
    GET_RECIPE_DETAIL,
    FILTER_BY_ORDER,
    FILTER_BY_CREATE,
    FILTER_BY_SCORE,
    FILTER_BY_DIETS,
    CREATE_RECIPE,

} from './actionName.js';
import axios from 'axios';

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


export const getRecipeDetail = function(id){
    return function(dispatch){
        return fetch(`http://localhost:3001/api/recipes/${id}`)
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: GET_RECIPE_DETAIL,
                payload:response
            })
        })
    }
}

export const createRecipe = function(data){
    return function(dispatch){
        return axios.post('http://localhost:3001/api/recipe',data)
        .then(response => {
            dispatch({
                type:CREATE_RECIPE,
                payload:response.data,
            })
        })
    }
}

// export const createRecipe = function(data){
//     return function(dispatch){
//         return fetch('http://localhost:3001/api/recipe',{
//             method:'POST',
//             body:JSON.stringify(data)
//         })
//         .then(res => res.json())
//         .then(response => {
//             console.log('SOY EL POST DEL FORMULARION EN LAS ACTIONS',response)
//             dispatch({
//                 type:CREATE_RECIPE,
//                 payload:response,
//             })
//         })
//     }
// }

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