import React from "react";
import classes from './Header.module.css'
import backgroundImage from '../../img/meals.jpg'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      
      <div className={classes['main-image']}>
        <img src={backgroundImage} alt="A table with food"/>
      </div>
    </React.Fragment>

  )
}

export default Header