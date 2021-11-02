import React from 'react';
import {ContainerPage,ContainerBTN} from './PaginadoElements'


function Paginado({paginado, recipePerPage,allRecipes}) {
    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(allRecipes/recipePerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav>
            <ContainerPage>
                {
                    pageNumber && pageNumber.map(elem => {
                        return (
                            <div key={elem}> 
                            <ContainerBTN className='container__btn' onClick={() => paginado(elem)}>{elem}</ContainerBTN>
                            </div>
                        )
                    })
                }
            </ContainerPage>
        </nav>
    )
}

export default Paginado
