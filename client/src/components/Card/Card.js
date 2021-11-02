import React from 'react'
import {CardContainer,CardImage} from './CardElements';


function Card(props) {
    const {name,image,spoonacularScore,diets} = props;
    return (
        <CardContainer>
            <h3>{name}</h3>
            <CardImage>
                <img src={image} alt='Cargando...'  />
            </CardImage>
            <h5>{spoonacularScore}</h5>
            <h5>{diets?.map((e,i) => <p key={i}>{e.name}</p>)}</h5>
        </CardContainer>
    )
}

export default Card
