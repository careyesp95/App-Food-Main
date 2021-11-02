import styled from 'styled-components'

export const ContainerPage = styled.ul`
    display: flex;
    flex-direction:row;
    justify-content:space-evenly;
    margin-top: 10px;
`

export const ContainerBTN = styled.button`
    border: 0.8rem solid transparent;
    border-radius:9999px;
    font-size:1rem;
    width:2rem;
    height:2rem;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#e7e5e573;
    transition:background-color 0.5s;
    cursor:pointer;
    color:#cac8c8;
    box-shadow: 1px 1px 10px #b9b6b6dc;
    :hover{
        background-color:#f8eeeef0;
    }
`