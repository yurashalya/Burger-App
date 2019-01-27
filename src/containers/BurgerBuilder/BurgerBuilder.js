import React, {Component} from 'react';
import Aux from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.9
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese:0,
            meat: 0 
        },
        totalPrice: 4,
        purchaseable: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = { 
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice =  oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredintHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount - 1;
        const updatedIngredients = { 
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceDelete = INGREDIENT_PRICES[type];
        if(oldCount <= 0 ) {
            return;
        }
        const oldPrice = this.state.totalPrice;
        const newPrice =  oldPrice - priceDelete;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients)
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for ( let key in disabledInfo) {
              disabledInfo[key] = disabledInfo[key] <= 0 
        }

        return (
            <Aux>
                <Modal> <OrderSummary ingredients = {this.state.ingredients} /></Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredintHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice}
                   
                /> 
            </Aux>
        );
    }
};

export default BurgerBuilder;