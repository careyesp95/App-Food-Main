import React, {useState,useEffect} from 'react';
import {FontAwesome} from '@fortawesome/react-fontawesome';

import {useDispatch,useSelector} from 'react-redux';
import {getDietsAll,createRecipe} from '../../actions/index';
import {Link,useHistory} from 'react-router-dom';

function CardCreate() {
    // funcion validadora:::
    function validate(state){
        let errors = {};
        if(!state.name){
            errors.name = 'name is required';
        }else if(!/^\w{2,30}$/.test(state.name)){
            errors.name = 'El nombre es invalido'
        }
        return errors;
    }

    // let {name, image, diets, summary, spoonacularScore, healthScore,
    //     analyzedInstructions} = req.body;

    const dispatch = useDispatch();
    const history = useHistory();
    const dietas = useSelector(state => state.allDiets)
    
    const [errors,setErrors] = useState({})
    const [state, setState] = useState({
        name:'',
        summary:'',
        spoonacularScore:'',
        healthScore:'',
        analyzedInstructions:'',
        image:'',
        diets:[],
    })
    
    useEffect(()=> {
        dispatch(getDietsAll())
    },[dispatch])

    function onHandleChange (e){
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]:e.target.value,
        })
        setErrors(validate({
            ...state,
            [e.target.name]:e.target.value,
        }));
    }

    function onHandleSelect(e){
        e.preventDefault();
        setState({
            ...state,
            diets:[...state.diets,e.target.value]
        })
    }

    function onHandleDelete(el){
        setState({
            ...state,
            diets:state.diets.filter(elem => elem !== el)
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
                    <label htmlFor='nombre'>Nombre*:</label>
                    <input
                    type='text'
                    id='nombre'
                    value={state.name}
                    name='name'
                    onChange={onHandleChange}
                    />
                    {
                        errors.name && (
                            <p className='error'>{errors.name}</p>
                        )
                    }
                </div>
                <div>
                    <label htmlFor='summary'>Resumen de la Receta*:</label>
                    <input
                    type='text'
                    id='summary'
                    value={state.summary}
                    name='summary'
                    onChange={onHandleChange}
                    />
                </div>
                <div>
                    <label htmlFor='score'>Puntuación*:</label>
                    <input
                    type='number'
                    id='score'
                    value={state.spoonacularScore}
                    name='spoonacularScore'
                    onChange={onHandleChange}
                    />
                </div>
                <div>
                    <label htmlFor='healthScore'>Nivel de Comida Saludable*:</label>
                    <input
                    type='number'
                    id='healthScore'
                    value={state.healthScore}
                    name='healthScore'
                    onChange={onHandleChange}
                    />
                </div>
                <div>
                    <label htmlFor='insctructions'>Instrucciónes*:</label>
                    <input
                    type='text'
                    id='insctructions'
                    value={state.analyzedInstructions}
                    name='analyzedInstructions'
                    onChange={onHandleChange}
                    />
                </div>
                <div>
                    <label htmlFor='image'>Imagen:</label>
                    <input
                    type='text'
                    id='image'
                    value={state.image}
                    name='image'
                    onChange={onHandleChange}
                    />
                </div>
                <label>Diets Type</label>
                <select
                onChange={onHandleSelect}>
                    {
                        dietas && dietas.map(e => (
                            <option key={e.id} value={e.name}>{e.name}</option>
                        ))
                    }
                </select>
                
                <button type='submit'>Create Recipe</button>
            </form>
                <ul>
                    <li>{
                            state.diets.map(el =>
                                <div key={el}>
                                    <p>{el} <button onClick={()=> onHandleDelete(el)}>x</button></p>
                                    
                                </div>
                            )
                        }
                    </li>
                </ul>
        </div>
    )
}

export default CardCreate
