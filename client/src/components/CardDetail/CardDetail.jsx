import React from 'react';
import {Link} from 'react-router-dom';
import {CardContainer,CardImage} from './CardDetailElements';

function CardDetail(props) {
    const {name,image,spoonacularScore,diets} = props;
    function onHandleClick(){

    }
    return (
        <CardContainer>
            <h3>{name}</h3>
            <CardImage>
                <img src={image} alt='Cargando...'  />
            </CardImage>
            <h5>{spoonacularScore}</h5>
            <h5>{diets?.map((e,i) => <p key={i}>{e.name}</p>)}</h5>
            <Link to='/home'>
                <button>Regresar</button>
            </Link>       
        </CardContainer>
    )
}

export default CardDetail
