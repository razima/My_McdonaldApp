import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
   
    state= {
        ingredients : {
            bacon : 1,
            cheese: 1,
            lettuce: 1,
            meat: 1
        } 
    }

    checkoutCancelHandler = () =>
    {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () =>
    {
        this.props.history.replace('/checkout');
    }

  render () {

    return (
      <div>
       <CheckoutSummary 
            ingredients= {this.state.ingredients}
            CheckoutCancel={this.checkoutCancelHandler}
            CheckoutContinue={this.checkoutContinuedHandler}
             />;
      </div>
    );
  }
}

export default Checkout;
