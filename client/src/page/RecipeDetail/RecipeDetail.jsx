import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { useParams } from 'react-router';
import Loading from '../../components/Loading/Loading';
import CardDetail from '../../components/CardDetail/CardDetail';
import {getRecipeDetail} from '../../actions/index';
import './RecipeDetail.css';


function RecipeDetail() {
    const recipeDetailById = useSelector(state => state.getReceipeId)
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(()=>{
        dispatch(getRecipeDetail(id))
    },[dispatch,id])

    return (
        <div className='container'>
            {
                recipeDetailById === undefined ?(
                    <Loading /> 
                ) :(
                    <CardDetail
                    name={recipeDetailById.name}
                    image={recipeDetailById.image}
                    spoonacularScore={recipeDetailById.spoonacularScore}
                    summary={recipeDetailById.summary}
                    healthScore={recipeDetailById.healthScore}
                    analyzedInstructions={recipeDetailById.analyzedInstructions}
                    diets={recipeDetailById.diets}  
                    />
                )
            }
        </div>
    )
}

export default RecipeDetail
