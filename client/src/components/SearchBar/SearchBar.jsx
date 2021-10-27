import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getRecipeName} from '../../actions/index';
import './SearchBar.modules.css';


function SearchBar() {

    const dispatch = useDispatch()
    const [state, setSate] = useState({
        name:'',
    })
    //console.log('SOY EL ESTADO',state.name)
    //setState({[event.target.name]: event.target.value})
    function onChangeInput(e){
        e.preventDefault();
        setSate({
            name:e.target.value
        })
    }
    function onSubmitInput(e){
        e.preventDefault();
        dispatch(getRecipeName(state.name))
        setSate('');
    }

    return (
        <div>
            <form onSubmit={onSubmitInput}>
                <div>
                    <input
                    type='text'
                    autoComplete='off'
                    value={state.name}
                    onChange={onChangeInput}
                    />
                    <button type='submit'>Buscar</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
