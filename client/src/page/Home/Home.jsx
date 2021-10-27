import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Navbar from '../../components/Navbar/Navbar.js'
import {getRecipeAll,filterByOrder, filterByCreate} from '../../actions/index';
import Card from '../../components/Card/Card';
import Paginado from '../../components/Paginado/Paginado';


function Home() {
    const stateRecipe = useSelector(state => state.allRecipes);
    const dispatch = useDispatch();
    
     const [orden,setOrden] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [recipe,setRecipe] = useState(9);
    const indexOfLastRecipe = currentPage * recipe;
    const indexOfFirstRecipe = indexOfLastRecipe - recipe;
    const currentRecipes = stateRecipe.slice(indexOfFirstRecipe,indexOfLastRecipe)
    
    function paginado (pageNumber){
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=> {
        dispatch(getRecipeAll())
    },[dispatch])

    function handleFilterCreate(e){
        e.preventDefault();
        dispatch(filterByCreate(e.target.value))
    }


    function handleFilterOrder(e){
        dispatch(filterByOrder(e.target.value))
        setCurrentPage(1)
        setOrden('Ordenado'+ e.target.value)
    } 
   // name,image,summary,spoonacularScore,healthScore,analyzedInstructions,diets
    return (
        <div>
            <Navbar />
            <br/>
            
            <div>
                <select onChange={e => handleFilterOrder(e)} >
                        <option value='asc'>Asc</option>
                        <option value='desc'>Desc</option>
                </select>
                <select>
                        <option value='mayor'>Mayor-Menor</option>
                        <option value='menor'>Menor-Mayor</option>
                </select>
                <select>
                        <option value='type'>Dietas</option>
                </select>
                <select onChange={handleFilterCreate}>
                        <option value='creado'>DB</option>
                        <option value='api'>API</option>
                        <option value='all'>Todos</option>
                </select>
            </div> 
            <Paginado 
                recipePerPage={recipe}
                allRecipes={stateRecipe.length}
                paginado={paginado}
            />
            <br/>
            {
                 currentRecipes.map(elem => {
                    return <Card
                    key={elem.id}
                    id={elem.id}
                    name={elem.name}
                    image={elem.image}
                    summary={elem.summary}
                    spoonacularScore={elem.spoonacularScore}
                    healthScore={elem.healthScore}
                    analyzedInstructions={elem.analyzedInstructions}
                    diets={elem.diets}
                    />
                })
            }
        </div>
    )
}

export default Home
