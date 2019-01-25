import React from 'react';
import burgers from './Burger.module.css';
import BurgerIngrediens from './Burgeringredient/Burgeringredient'

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => { 
          return <BurgerIngrediens key={igKey + i} type={igKey} />;
        });
    });
    return(
        <div className={burgers.Burger}> 
            <BurgerIngrediens type="bread-top"/>
            {transformedIngredients}
            <BurgerIngrediens type="bread-bottom"/>
        </div>
    );
};

export default burger;