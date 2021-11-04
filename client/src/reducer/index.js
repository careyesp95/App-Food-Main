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
} from '../actions/actionName';

const initialState = {
    allRecipes :[],
    allRecipesAux:[],
    allDiets:undefined,
    getReceipeId:undefined,
}

function reducer(state=initialState,action) {
    switch(action.type){
        case GET_RECIPE_ALL:
            return {
                ...state,
                allRecipes:action.payload,
                allRecipesAux:action.payload,
                
            };
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                getReceipeId:action.payload,
            }

        case GET_DIETS_ALL:
            return {
                ...state,
                allDiets:action.payload,
            };

        case GET_RECIPE_NAME:
            let valuedata;
            if(action.payload.hasOwnProperty('message')){
                alert(`${action.payload.message}`)
                valuedata = state.allRecipesAux
            }else {
                valuedata = action.payload
            }
            return {
                ...state,
                allRecipes:valuedata,
            };
        case CREATE_RECIPE:
            return {
                ...state,
            }
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
            };
            case FILTER_BY_SCORE:
                let sortedScore;
                if(action.payload === 'mayor'){
                    sortedScore = state.allRecipes.sort((a,b) =>{
                        if(a.spoonacularScore > b.spoonacularScore) return -1;
                        if(a.spoonacularScore < b.spoonacularScore) return 1;
                        return 0;
                    })
                }else if(action.payload === 'menor') {
                    
                    sortedScore = state.allRecipes.sort((a,b) =>{
                        if(a.spoonacularScore > b.spoonacularScore) return 1;
                        if(a.spoonacularScore < b.spoonacularScore) return -1;
                        return 0;
                    })
                }else {
                    sortedScore = state.allRecipes;
                }
                return{
                    ...state,
                    allRecipes:sortedScore
                };

        case FILTER_BY_DIETS: 
            const filterDietas = state.allRecipesAux.filter(e =>{
                let array = e.diets
                let filterdiet;
                for(let i=0; i < array.length;i++){
                    filterdiet = array[i].name.toLowerCase() === action.payload.toLowerCase()
                } 
                return filterdiet;
            })
            
            return {
                ...state,
                allRecipes: filterDietas !== undefined ? filterDietas:state.allRecipesAux
            };
            
        default:
            return state;
    }
}

export default reducer
