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
    getRecipeAll,
    }from '../../actions/index';
import {ButtonClear} from './HomeElements'
import './Home.css';



function Home() {
    const stateRecipe = useSelector(state => state.allRecipes);
    const stateDiets = useSelector(state => state.allDiets);

    const dispatch = useDispatch();

    const [orden,setOrden] = useState('');
    const [score,setScore] = useState('');
    const [diets,setDiets] = useState('');
    const [dataBase, setDataBase] = useState('');
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
        setDataBase(e.target.value)
    }

    function handleFilterOrder(e){
        dispatch(filterByOrder(e.target.value))
        setCurrentPage(1)
        setOrden( e.target.value)
        
    } 

   function handleScoreOrder(e){
        e.preventDefault();
        dispatch(filterByScore(e.target.value))
        setScore(e.target.value)
        
   }

   function handleFilterDiets (e){
        e.preventDefault();
        dispatch(filterByDiets(e.target.value))
        setDiets(e.target.value)
   }

   function clearFilter (e){
       e.preventDefault();
       setOrden('selec')
       setScore('selec')
       setDiets('Vegan')
       setDataBase('All')
       dispatch(getRecipeAll());
       
   }


    return (
        <div className='containerHome'>
            <Navbar />
            <br/>
            <div className='containerFilter'>
                <select className='containerOption' name='orden' value={orden} onChange={e => handleFilterOrder(e)} >
                        <option value='selec'>selec</option>
                        <option  value='asc'>Order A-Z</option>
                        <option  value='desc'>Order Z-A</option>
                </select>
                <select className='containerOption' name='score' value={score} onChange={e => handleScoreOrder(e)}>
                        <option value='selec'>selec</option>
                        <option value='mayor'>Higher Score</option>
                        <option value='menor'>Lower Score</option>
                </select>
                <select className='containerOption' name='diets' value={diets} onChange={e => handleFilterDiets(e)}>
                    {
                        stateDiets?.map(elem => (
                            <option key={elem.id}value={elem.name} >{elem.name}</option>
                        ))
                    }
                </select>
                <select className='containerOption' name='dataBase' value={dataBase} onChange={handleFilterCreate}>
                        <option value='all'>All</option>
                        <option value='creado'>Data Base</option>
                        <option value='api'>API</option>
                </select>
                <ButtonClear onClick={clearFilter}>Clear</ButtonClear>
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
