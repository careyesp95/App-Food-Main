import styled from 'styled-components'

export const CardRecipe = styled.div`
    width:420px; 
    height:420px;
    margin:50px;
    align-items:center;
    backdrop-filter:blur(2px);
    background-color:#fff2f240;
    overflow:hidden;
    border-radius:20px;
    :hover{
        transform:translateY(-10px);
        box-shadow:0 12px 16px rgba(0,0,0,0.2)
    }
`

export const CardImage = styled.div`
    text-align:center;
    background-size: cover;
    margin-top:2rem;

`
export const H3 = styled.h3`
    text-align:center;
    margin-top:5px;
    
`
export const Title = styled.h3`
    text-align:center;
    margin-top:0.2rem;

`
export const Image = styled.img`
    border-radius:20px;
    height: auto;
    width:auto;
    max-height:300px;
    max-width:300px;
`