import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import burger from './BurgerIngredient.module.css';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={burger.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={burger.BreadTop}>
                        <div className={burger.Seeds1}></div>
                        <div className={burger.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'): 
                ingredient = <div className={burger.Meat}></div>;
                break;
            case ('cheese'): 
                ingredient = <div className={burger.Cheese}></div>;
            break; 
            case ('bacon'): 
                ingredient = <div className={burger.Bacon}></div>;
            break;
            case ('salad'): 
                ingredient = <div className={burger.Salad}></div>;
            break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}
    

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

    

export default BurgerIngredient;