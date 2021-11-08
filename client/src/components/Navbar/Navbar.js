import React, { useState} from 'react';
import {useDispatch} from 'react-redux';
import { Button } from '../Button/ButtonElements';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SearchBar from '../SearchBar/SearchBar'; 
import {getRecipeAll} from '../../actions/index';

function Navbar() {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  
  function onHandleClick(e) {
    e.preventDefault();
    dispatch(getRecipeAll());
  }

  return (
    
    <>
      <nav className='navbar'>
        <div className='navbar_container'>
          <Link to='/home' className='navbar_logo' onClick={closeMobileMenu}>
            <div className='navbar_icon'>
            <i className="fas fa-utensils"></i>
            </div>
          </Link>
          <div className='menu_icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav_menu active' : 'nav_menu'}>
            <div>
              <SearchBar />
            </div>
            <li className='nav_item'>
              <Link to='/' className='nav_links' onClick={closeMobileMenu}>
                Start
                <div className="navbar_home">
                </div>
              </Link>
            </li>
            <li className='nav_item'>
              <Link
                to='/home/create'
                className='nav_links'
                onClick={closeMobileMenu}
              >
                Create
              </Link>
            </li>
            <li>
              <Link
                to='/home/create'
                className='nav_links_mobile'
                onClick={closeMobileMenu}
              >
                Start
              </Link>
            </li>
          </ul>
          <div>
            { <Link to='/home'><Button buttonStyle='btn--outline' buttonSize='btn--large' onClick={onHandleClick}>Clear Filter</Button> </Link>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
