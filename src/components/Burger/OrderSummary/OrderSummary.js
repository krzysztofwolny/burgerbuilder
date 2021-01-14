import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
}

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
            )
        }); 

        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicios burger with:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Cost of your burger is : {this.props.cost.toFixed(2)}</p>
            <p>Continue to Checkout</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
        </Aux>
        );
    }
}

export default OrderSummary;