import React from 'react';
import burgers from './Burger.module.css';
import BurgerIngrediens from './Burgeringredient/Burgeringredient'

const burger = (props) => {
    return(
        <div className={burgers.Burger}> 
            <BurgerIngrediens type="bread-top"/>
            <BurgerIngrediens type="cheese"/>
            <BurgerIngrediens type="meat"/>
            <BurgerIngrediens type="bread-bottom"/>
        </div>
    );
};

export default burger;