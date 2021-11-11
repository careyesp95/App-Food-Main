import React, {useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faTimesCircle ,faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

import {useDispatch,useSelector} from 'react-redux';
import {getDietsAll,createRecipe,getRecipeAll} from '../../actions/index';
import {validate} from '../Validate/validate.jsx';
import './CardCreate.css';
import {Link,useHistory} from 'react-router-dom';
import {
    Input,
    InputContainer,
    Label,
    Formulario,
    StylError,
    ValidateIcon,
    CenterButton,
    Boton,
    MenssageError,
    Main,
    ButtonR,
    H1,
    Select,
    ButtonDietas,
    Li,
} from './CardCreateElements';

function CardCreate() {
 
    const dispatch = useDispatch();
    const history = useHistory();
    const dietas = useSelector(state => state.allDiets)
    
    const [formularioValido,setFormularioValido] = useState(true);
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
        state.diets.includes(e.target.value) ? alert(`Ya seleccionaste ${e.target.value}, por favor seleccione otro tipo de dieta`):
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
        if(errors.hasOwnProperty('name')  || errors.hasOwnProperty('summary') || errors.hasOwnProperty('spoonacularScore') || errors.hasOwnProperty('healthScore')  || errors.hasOwnProperty('analyzedInstructions')){
            setFormularioValido(false);
        }else{
            setFormularioValido(true);
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
            dispatch(getRecipeAll());
            history.push('/home')
        }
    }
    return (
        <div className='containerCreate'>
            <Main>
                <H1>Crea una nueva Receta!</H1>
                <Formulario onSubmit={onHandleSubmit}>
                    <div>
                        <Label htmlFor='nombre' valido={errors.name} >Nombre*:</Label>
                        <InputContainer>
                            <Input
                                type='text'
                                placeholder='nombre..'
                                id='nombre'
                                value={state.name}
                                name='name'
                                onChange={onHandleChange}
                                valido={errors.name}
                            />
                            {/* <ValidateIcon
                            icon={errors.name === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.name}
                            /> */}
                        </InputContainer>
                        {
                            errors.name && (
                                <StylError valido={errors.name}>{errors.name}</StylError>
                            )
                        }
                    </div>
                    <div>
                        <Label htmlFor='summary' valido={errors.summary}>Summary*:</Label>
                        <InputContainer>
                            <Input
                            type='text'
                            placeholder='summary...'
                            id='summary'
                            value={state.summary}
                            name='summary'
                            onChange={onHandleChange}
                            valido={errors.summary}
                            />
                            {/* <ValidateIcon 
                            icon={errors.summary === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.summary}/> */}
                        </InputContainer>
                        {
                            errors.summary && (
                                <StylError valido={errors.summary}>{errors.summary}</StylError>
                            )
                        }
                    </div>
                    <div>
                        <Label htmlFor='score' valido={errors.spoonacularScore}>Score*:</Label>
                        <InputContainer>
                            <Input
                            type='number'
                            placeholder='Score...'
                            id='score'
                            value={state.spoonacularScore}
                            name='spoonacularScore'
                            onChange={onHandleChange}
                            valido={errors.spoonacularScore}
                            />
                            {/* <ValidateIcon 
                            icon={errors.spoonacularScore === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.spoonacularScore}/> */}
                        </InputContainer>
                        {
                            errors.spoonacularScore && (
                                <StylError valido={errors.spoonacularScore}>{errors.spoonacularScore}</StylError>
                            )
                        }
                    </div>
                    <div>
                        <Label htmlFor='healthScore' valido={errors.healthScore}>healthScore*:</Label>
                        <InputContainer>
                            <Input
                            type='number'
                            placeholder='healthScore'
                            id='healthScore'
                            value={state.healthScore}
                            name='healthScore'
                            onChange={onHandleChange}
                            valido={errors.healthScore}
                            />
                            {/* <ValidateIcon
                            icon={errors.healthScore === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.healthScore}
                            /> */}
                        </InputContainer>
                        {
                            errors.healthScore && (
                                <StylError valido={errors.healthScore}>{errors.healthScore}</StylError>
                            )
                        }
                    </div>
                    <div>
                        <Label htmlFor='insctructions' valido={errors.analyzedInstructions}>Instructions*:</Label>
                        <InputContainer>
                            <Input
                            type='text'
                            placeholder='insctructions'
                            id='insctructions'
                            value={state.analyzedInstructions}
                            name='analyzedInstructions'
                            onChange={onHandleChange}
                            valido={errors.analyzedInstructions}
                            />
                            {/* <ValidateIcon
                            icon={errors.analyzedInstructions === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.analyzedInstructions}/> */}
                        </InputContainer>
                        {
                            errors.analyzedInstructions && (
                                <StylError valido={errors.analyzedInstructions}>{errors.analyzedInstructions}</StylError>
                            )
                        }
                    </div>
                    <div>
                        <Label htmlFor='image' valido={errors.image}>Image:</Label>
                        <InputContainer>
                            <Input
                            type='text'
                            placeholder='Url Image...'
                            id='image'
                            value={state.image}
                            name='image'
                            onChange={onHandleChange}
                            valido={errors.image}
                            />
                            {/* <ValidateIcon
                            icon={errors.image === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.image}/> */}
                        </InputContainer>
                        {
                            errors.image && (
                                <StylError valido={errors.image}>{errors.image}</StylError>
                            )
                        }
                    </div>
                    <Label valido={errors.diets}>Diets Type Selected:</Label>
                    <Select
                    onChange={onHandleSelect}>
                        {
                            dietas && dietas.map(e => (
                                <option key={e.id} value={e.name}>{e.name}</option>
                            ))
                        }
                    </Select>
                        <ul>
                            <Li>{
                                    state.diets.map(el =>
                                        <div key={el}>
                                            <p>{el} <ButtonDietas onClick={()=> onHandleDelete(el)}>x</ButtonDietas></p>
                                            
                                        </div>
                                    )
                                }
                            </Li>
                        </ul>
                    {formularioValido === false && <MenssageError>
                        <p><FontAwesomeIcon icon={faExclamationTriangle}/><b>Error:</b><b>Por favor complete los campos marcados con * correctamente.</b></p>
                    </MenssageError>} 
                    
                    <CenterButton>
                        { state.name !== "" && <Boton type='submit'>Create Recipe</Boton>}
                        <Link to='/home'><ButtonR>Regresar</ButtonR></Link>
                        
                    </CenterButton>
                </Formulario>
            </Main>
        </div>
    )
}

export default CardCreate
