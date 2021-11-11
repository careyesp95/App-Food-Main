import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getRecipeName} from '../../actions/index';
import {ButtonS,Container, Input} from './SearchElements';


function SearchBar() {

    const dispatch = useDispatch()
    const [state, setState] = useState("")
    
    function onChangeInput(e){
        e.preventDefault();
        setState(e.target.value)
        
    }
    function onSubmitInput(e){
        e.preventDefault();
        if(!state) return alert('Debes digitar una receta valida')
        dispatch(getRecipeName(state))
        setState("");
    }

    return (
        <Container>
            <Input
            type='text'
            placeholder='Buscar una receta...'
            value={state}
            onChange={(e) =>onChangeInput(e)}
            />
            <ButtonS type='submit' onClick={(e)=>onSubmitInput(e)}>Buscar</ButtonS>
        </Container>
    )
}

export default SearchBar
