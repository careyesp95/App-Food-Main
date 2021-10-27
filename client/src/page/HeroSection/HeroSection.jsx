import React from 'react';
import {Link} from 'react-router-dom';
import Video from '../../videos/video.mp4';
import {Button} from '../../components/Button/ButtonElements';
import {HeroContainer,HeroBg, VideoBg, HeroH1, HeroBtnWrapper,HeroContent } from './HeroElements'


function HeroSection() {

    return (
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroBtnWrapper>
                    <HeroH1>
                        Welcome
                    </HeroH1>
                </HeroBtnWrapper>
                    <Link to='/home'>
                        <Button
                        buttonStyle='btn--outline'
                        buttonSize='btn--large' 
                        >
                            Start
                        </Button>
                    </Link>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
