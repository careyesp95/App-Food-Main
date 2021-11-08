import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Navbar from '../../components/Navbar/Navbar.js'
import Card from '../../components/Card/Card';
import Paginado from '../../components/Paginado/Paginado.jsx';
import {
    filterByOrder,
    filterByCreate,
    filterByScore,
    filterByDiets,
    getDietsAll,
    }from '../../actions/index';
import './Home.css';


function Home() {
    const stateRecipe = useSelector(state => state.allRecipes);
    const stateDiets = useSelector(state => state.allDiets);

    const dispatch = useDispatch();

    
    const [orden,setOrden] = useState('');
    const [score,setScore] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [recipe,setRecipe] = useState(9);
    const indexOfLastRecipe = currentPage * recipe;
    const indexOfFirstRecipe = indexOfLastRecipe - recipe;
    const currentRecipes = stateRecipe.slice(indexOfFirstRecipe,indexOfLastRecipe)
    
    
    function paginado (pageNumber){
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=> {
        dispatch(getDietsAll())
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

   function handleScoreOrder(e){
        e.preventDefault();
        dispatch(filterByScore(e.target.value))
        setScore('Ordenado'+ e.target.value)
        
   }

   function handleFilterDiets (e){
        e.preventDefault();
        dispatch(filterByDiets(e.target.value))
   }
    return (
        <div className='containerHome'>
            <Navbar />
            <br/>
            <div className='containerFilter'>
                <select className='containerOption' onChange={e => handleFilterOrder(e)} >
                        <option  value='asc'>Order A-Z</option>
                        <option  value='desc'>Order Z-A</option>
                </select>
                <select className='containerOption' onChange={e => handleScoreOrder(e)}>
                        <option value='mayor'>Higher Score</option>
                        <option value='menor'>Lower Score</option>
                </select>
                <select className='containerOption' onChange={e => handleFilterDiets(e)}>
                    {
                        stateDiets?.map(elem => (
                            <option key={elem.id}value={elem.name} >{elem.name}</option>
                        ))
                    }
                </select>
                <select className='containerOption' onChange={handleFilterCreate}>
                        <option value='creado'>Data Base</option>
                        <option value='api'>API</option>
                        <option value='all'>All</option>
                </select>
            </div> 
            <Paginado 
                recipePerPage={recipe}
                allRecipes={stateRecipe.length}
                paginado={paginado}
            />
            <br/>
            <br/>
            <div className='containerCard'>
                {
                    currentRecipes && currentRecipes.map(elem => {
                        return <Card
                        key={elem.id}
                        id={elem.id}
                        name={elem.name}
                        image={elem.image}
                        //summary={elem.summary}
                        spoonacularScore={elem.spoonacularScore}
                        //healthScore={elem.healthScore}
                        //analyzedInstructions={elem.analyzedInstructions}
                        diets={elem.diets}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default Home
