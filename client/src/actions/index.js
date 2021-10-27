import {
    GET_RECIPE_ALL, 
    GET_RECIPE_NAME,
    FILTER_BY_ORDER,
    FILTER_BY_CREATE,

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

export const getRecipeName = function(name){
    return function(dispatch){
        return fetch('http://localhost:3001/api/recipes-name' + name)
        .then(res => res.json())
        .then(response => {
            dispatch({
                type:GET_RECIPE_NAME,
                payload:response,
            })
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

