import React, {Component} from 'react';
import Aux from '../../hoc/Auxs/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

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
        purchaseable: false,
        purchasing: false,
        loading: false
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
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Yura Shalya',
                adress: {
                    street: 'Teststreet',
                    zipCode: '61000',
                    country: 'UA'
                },
                email: 'testing@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for ( let key in disabledInfo) {
              disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummary = <OrderSummary ingredients = {this.state.ingredients}
                            purchaseCancelled = {this.purchaseCancelHandler}
                            purchaseContinued = {this.purchaseContinueHandler}
                            price = {this.state.totalPrice} />;

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
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
    }
};

export default BurgerBuilder;