import React, {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getDietsAll,createRecipe} from '../../actions/index';
import {Link,useHistory} from 'react-router-dom';

function CardCreate() {
    // let {name, image, diets, summary, spoonacularScore, healthScore,
    //     analyzedInstructions} = req.body;

    const dispatch = useDispatch();
    const history = useHistory();
    const dietas = useSelector(state => state.allDiets)
    
    const [state, setState] = useState({
        name:'',
        summary:'',
        spoonacularScore:'',
        healthScore:'',
        analyzedInstructions:'',
        image:'',
        diets:[],
    })
    console.log('estoy tratando de renderizar las dietas en el create', state.diets)
    useEffect(()=> {
        dispatch(getDietsAll())
    },[dispatch])

    function onHandleChange (e){
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]:e.target.value,
        })
    }

    function onHandleSelect(e){
        e.preventDefault();
        setState({
            ...state,
            diets:[...state.diets,e.target.value]
        })
    }

    function onHandleSubmit(e){
        e.preventDefault();
        dispatch(createRecipe(state))
        alert(`Receta ${state.name} creada con exito!`)
        setState({
            name:'',
            summary:'',
            spoonacularScore:'',
            healthScore:'',
            analyzedInstructions:'',
            image:'',
            diets:[],
        })
        history.push('/home')
    }

    return (
        <div>
            <Link to='/home'><button>Regresar</button></Link>
            <h1>Crea una nueva Receta!</h1>
            <form onSubmit={onHandleSubmit}>
                <div>
                    <label>Nombre*:</label>
                    <input
                    type='text'
                    value={state.name}
                    name='name'
                    onChange={onHandleChange}
                    />
                </div>
                <div>
                    <label>Resumen de la Receta*:</label>
                    <input
                    type='text'
                    value={state.summary}
                    name='summary'
                    onChange={onHandleChange}
                    />
                </div>
                <div>
                    <label>Puntuación*:</label>
                    <input
                    type='number'
                    value={state.spoonacularScore}
                    name='spoonacularScore'
                    onChange={onHandleChange}
                    />
                </div>
                <div>
                    <label>Nivel de Comida Saludable*:</label>
                    <input
                    type='number'
                    value={state.healthScore}
                    name='healthScore'
                    onChange={onHandleChange}
                    />
                </div>
                <div>
                    <label>Instrucciónes*:</label>
                    <input
                    type='text'
                    value={state.analyzedInstructions}
                    name='analyzedInstructions'
                    onChange={onHandleChange}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                    type='text'
                    value={state.image}
                    name='image'
                    onChange={onHandleChange}
                    />
                </div>
                <label>Diets Type</label>
                <select
                onChange={onHandleSelect}>
                <option value=''>Select Diets</option>
                    {
                        dietas && dietas.map(e => (
                            <option key={e.id} value={e.name}>{e.name}</option>
                        ))
                    }
                </select>
                <ul>
                    <li>{state.diets.map(e => e + ",")}</li>
                </ul>
                
                <button type='submit'>Create Recipe</button>
            </form>
        </div>
    )
}

export default CardCreate
