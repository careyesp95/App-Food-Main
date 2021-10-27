import React from 'react';
import './Paginado.modules.css';

function Paginado({paginado, recipePerPage,allRecipes}) {
    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(allRecipes/recipePerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className='container__page'>
                {
                    pageNumber && pageNumber.map(elem => {
                        return (
                            <div key={elem}> 
                            <button className='container__btn' onClick={() => paginado(elem)}>{elem}</button>
                            </div>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Paginado
