import {
    GET_RECIPE_ALL,
    GET_RECIPE_NAME,
    FILTER_BY_ORDER,
    FILTER_BY_CREATE,
} from '../actions/actionName';

const initialState = {
    allRecipes :[],
    allRecipesAux:[],
}

function reducer(state=initialState,action) {
    switch(action.type){
        case GET_RECIPE_ALL:
            return {
                ...state,
                allRecipes:action.payload,
                allRecipesAux:action.payload,
                
            };
        case GET_RECIPE_NAME:
            return {
                ...state,
                allRecipes:action.payload,
            };
        case FILTER_BY_ORDER:
            let sortedOrder = action.payload === 'asc' ?
            state.allRecipes.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            })
            : state.allRecipes.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                allRecipes:sortedOrder,
            };
        case FILTER_BY_CREATE:
            let dataRender;
            if(action.payload === 'creado'){
                dataRender = state.allRecipesAux.filter(e => e.id.toString().length > 10)
            }else if(action.payload === 'api'){
                dataRender = state.allRecipesAux.filter(e => e.id.toString().length < 10)
            }else {
                dataRender = state.allRecipesAux
            }
            return {
                ...state,
                allRecipes:dataRender
            }
        default:
            return state;
    }
}

export default reducer
