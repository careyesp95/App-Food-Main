import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import './App.module.css';
import Home from './page/Home/Home';
import RecipeDetail from './page/RecipeDetail/RecipeDetail';
import RecipeCreate from './page/RecipeCreate/RecipeCreate';
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
      <Route exact path='/home/detail/:id'>
        <RecipeDetail />
      </Route>
      <Route exact path='/home/create'>
        <RecipeCreate />
      </Route>
    </BrowserRouter>
  );
}

export default App;
