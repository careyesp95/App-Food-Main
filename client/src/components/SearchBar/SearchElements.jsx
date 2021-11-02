import styled from "styled-components";

export const ButtonS = styled.button`
    border:solid 2px transparent;
    border-radius:9999px;
    width:2rem;
    height:2rem;
    font-size:1rem;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:transparent;
    transition:background-color 0.25s;
    cursor:pointer;
    color:#ffffff;
    :hover{
        background-color:#ffffff4c;
    }
`

export const Container = styled.div`
    display:flex;
    margin-top:1.5rem;
    margin-left:1.5rem;
`

export const Input = styled.input`
    background-color:transparent;
    border:none;
    color:#fff;
    font-size:1.5rem;
    font-weight:1.5rem;
    width:20rem;
    :focus{
        outline:none;
    }
    ::placeholder{
        color:#ffffffac;
    }
`