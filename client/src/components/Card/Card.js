import React from 'react';
import {Link} from 'react-router-dom';
import {CardContainer,CardImage} from './CardElements';


function Card(props) {
    const {name,image,spoonacularScore,diets,id} = props;
    return (
        <CardContainer>
            <h3>{name}</h3>

            <CardImage>
                <Link to={`/home/detail/${id}`}>
                    <img src={image} alt='Cargando...'  />
                </Link>
            </CardImage>
            <h5>{spoonacularScore}</h5>
            <h5>{diets?.map((e,i) => <p key={i}>{e.name}</p>)}</h5>
        </CardContainer>
    )
}

export default Card
