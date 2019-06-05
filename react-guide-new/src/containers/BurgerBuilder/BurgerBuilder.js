import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import axios from 'axios';

import instance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


/*when calling OrderSummary, we make an instance of it with properties
& before return, LoadHandler() if it is tru then OrderSummary will only show Spinner    
*/
const INGREDIENT_PRICES = {
    lettuce: 0.60,
    cheese: .50,
    meat: 1.00,
    bacon: .30

}
class BurgerBuilder extends Component{
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
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
   

    purchaseHandler =() => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    loadingHandler = () => {
        // const queryParams = [];
        // //looping throuhg 
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // //push to checkout manually
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.history.push('/checkout');
    }
    render()
    {
        const disabledInfo = {
            ...this.props.ings
            //copy in immutable way
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ings ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}
                            price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => 
        dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => 
        dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
export default withErrorHandler( BurgerBuilder, instance );

