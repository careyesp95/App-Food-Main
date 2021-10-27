import styled from 'styled-components';



export const HeroContainer = styled.div`
    background:#0c0c0c;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:0 30px;
    height:100vh;
    position: relative;
    z-index:1;
    :before{
        content:'';
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:linear-gradient(180deg, rgba(0,0,0,0.2) 0%,
        rgba(0,0,0,0.6)100%)
    }

`

export const HeroBg = styled.div`
    position: absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    width:100%;
    height:100%;
    overflow:hidden;
`

export const VideoBg = styled.video`
     object-fit: cover;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;


`

export const HeroContent = styled.div`
    z-index:3;
    max-width:1200px;
    position:absolute;
    padding:8px 24px;
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const HeroH1 = styled.h1`
    color:#fff;
    font-size:60px;
    text-align: center;
    box-sizing: border-box;
    box-shadow: 20px 11px 30px #f80b0bba;


    @media screen and (max-width:768px){
        font-size:40px;
    }

    @media screen and (max-width:480px){
        font-size:32px;
    }
`

export const HeroBtnWrapper = styled.div`
    margin:32px;
    top:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
`
