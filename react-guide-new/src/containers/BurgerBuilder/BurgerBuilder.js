import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import axios from 'axios';
import instance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    lettuce: 0.60,
    cheese: .50,
    meat: 1.00,
    bacon: .30

}
class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        orderSummaryDone: false,
        error: false
    }

componentDidMount () {
    console.log(this.props);
    instance.get( 'https://react-order-food-be78d.firebaseio.com/ingredients.json' )
        .then( response => {
            this.setState( { ingredients: response.data } );
        } )
        .catch( error => {
            this.setState( { error: true } );
        } );
}
    
    updatepurchaseState(ingredients){
      
        const sum = Object.keys( ingredients )
            .map(igKey =>{
                return ingredients[igKey];
            })
            .reduce((sum, el ) => {
                return sum + el;
            }, 0);
             this.setState({purchasable: sum > 0});
    }
   

    addIngredientHandler = (type) =>
    {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatepurchaseState(updatedIngredients); 

    }

    removeIngredientHandler = (type) =>
    {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
        {
            return;
        }
        const updatedCounted = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceSub = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSub;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatepurchaseState(updatedIngredients);    
    }

    purchaseHandler =() => {
        this.setState({purchasing: true})
    }
    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    loadingHandler = () => {
        const queryParams = [];
        //looping throuhg 
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        //push to checkout manually

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    render(){
        
        const disabledInfo = {
            ...this.state.ingredients
            //copy in immutable way
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        console.log('hffghh', this.state.ingredients);
        if ( this.state.ingredients ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}
                            price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.loadingHandler} />;
        }
        if ( this.state.orderSummaryDone ) {
            orderSummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        );

    }
}

export default withErrorHandler( BurgerBuilder, instance );

