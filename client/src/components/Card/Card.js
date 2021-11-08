import React from 'react';
import {Link} from 'react-router-dom';
import {
    CardContainer,
    CardImage,
    CardRecipe,
    Title,
    H3,
    Image,
} from './CardElements';


function Card(props) {
    const {name,image,spoonacularScore,diets,id} = props;
    return (
            <CardRecipe>
                <H3>{name}</H3>
                <CardImage>
                    <Link to={`/home/detail/${id}`}>
                        <Image src={image} alt='Cargando...'  />
                    </Link>
                </CardImage>
                <Title>Score:  {spoonacularScore}</Title>
                <Title>Diets: {diets?.map((e,i) => <p key={i}>{e.name}</p>)}</Title>
            </CardRecipe>
    )
}

export default Card
