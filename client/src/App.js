import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import './App.module.css';
import Home from './page/Home/Home';
import {BrowserRouter, Route } from 'react-router-dom'
import HeroSection from './page/HeroSection/HeroSection';
import {getRecipeAll} from './actions/index';

function App() {
   const dispatch = useDispatch();

    useEffect(() =>{
      dispatch(getRecipeAll())
    },[dispatch])

  return (
    <BrowserRouter>
      <Route exact path='/'>
        <HeroSection/>
      </Route>
      <Route exact path='/home'>
        <Home />
      </Route>
    </BrowserRouter>
  );
}

export default App;
