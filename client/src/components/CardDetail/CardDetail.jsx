import React from 'react';
import {Link} from 'react-router-dom';
import {
    CardImage,
    ButtonR,
    Image,
    H3,
    Title,
    Dietas,
    TitleSummary,
    TitleScore,
    TitleInstruction,
} from './CardDetailElements';
import './CardDetail.css';


function CardDetail({name,image,spoonacularScore,diets,summary,healthScore,analyzedInstructions}) {
    summary = summary.slice(0,500)
    let patron = '<b>';
    let patron1 = '</b>';
    summary = summary.replaceAll(patron,' ');
    summary = summary.replaceAll(patron1,' ')

    if(Array.isArray(analyzedInstructions)){
        let array = analyzedInstructions.flat(2)
        for(let i =0;i<array.length;i++){
            analyzedInstructions = array[i].step
        }

    }else {
        analyzedInstructions =  analyzedInstructions
    }
    
    return (
        <div className ='wrap'>       
            <Link to='/home'>
                <ButtonR>Regresar</ButtonR>
            </Link>
            <div className='trajetaWrap'>
                <div className ='tarjeta'>
                    <div className ='adelante'>
                        <H3>{name}</H3>
                        <CardImage>
                            <Image src={image} alt='Cargando...'  />
                        </CardImage>
                        <Title>Score:{spoonacularScore}</Title>
                        <Dietas>Diets: {diets?.map((e,i) => <p key={i}>{e.name}</p>)}</Dietas>
                    </div>
                    <div className='atras'>
                        <TitleSummary>Summary:{summary}</TitleSummary>
                        <TitleInstruction>analyzedInstructions:
                            { analyzedInstructions  }
                        </TitleInstruction>
                        <TitleScore>healthScore:{healthScore}</TitleScore>
                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetail
