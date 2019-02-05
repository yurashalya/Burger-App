import React, { Component } from 'react'
import axios from '../../../axios-orders';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHamdler = (event) => {
        event.preventDefault();
        
        // console.log(this.props.ingredients)
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            this.setState({loading: false});
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }

    render( ) {
        let form = (
            <form>
                <input className={classes.Input} type="text" name = "name" placeholder="Your Name" />
                <input className={classes.Input}  type="email" name = "email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name = "street" placeholder="Street" />
                <input className={classes.Input} type="text" name = "postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHamdler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className = {classes.ContactData}>
                <h1>Enter yourr Contact</h1>
                {form}
            </div>
        );
    }
}


export default ContactData;