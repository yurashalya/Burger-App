import React, {Component} from 'react';
import Aux from '../../hoc/Auxs/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandle from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.9
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-572bd.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {this.setState({error: true})});
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

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // alert('You  continue!');
        
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        
        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');
        this.props.history.push( {
            pathname: '/checkout',
            search: '?' + queryString
        }
        
        );
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for ( let key in disabledInfo) {
              disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner /> 

        if(this.state.ingredients) {
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredintHandler}
                        disabled = {disabledInfo}
                        purchasable = {this.state.purchasable}
                        price = {this.state.totalPrice}
                        ordered = {this.purchaseHandler}
                    /> 
                </Aux>
            );
            orderSummary = <OrderSummary 
                        ingredients = {this.state.ingredients}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        price = {this.state.totalPrice} />;

        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

export default withErrorHandle(BurgerBuilder, axios);