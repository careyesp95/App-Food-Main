import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getRecipeName} from '../../actions/index';
import {IoAdd} from 'react-icons/io5'
import {ButtonS,Container, Input} from './SearchElements';


function SearchBar() {

    const dispatch = useDispatch()
    const [state, setSate] = useState('')
    
    function onChangeInput(e){
        e.preventDefault();
        setSate(e.target.value)
    }
    function onSubmitInput(e){
        e.preventDefault();
        dispatch(getRecipeName(state))
        setSate("");
    }

    return (
        <Container>
            <Input
            type='text'
            autoComplete='off'
            placeholder='Buscar una receta...'
            value={state.name}
            onChange={onChangeInput}
            />
            <ButtonS type='submit' onClick={onSubmitInput}><IoAdd/></ButtonS>
            {/* <button  type='submit' onClick={onSubmitInput}><IoAdd/></button> */}
        </Container>
    )
}

export default SearchBar
