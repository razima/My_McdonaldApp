import React, { Component } from 'react';
// import Aux from '../../../hoc/Aux/Aux';
import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';

 const checkoutSummary = (props) => {
    // state={
    //     ingredients:{
    //         lettuce: 1,
    //         bacon: 1,
    //         meat: 1,
    //         cheese: 1
    //     }
    // }
    return (
        // <Aux>
            <div className= {classes.CheckoutSummary}>
                <h1> 
                    Let Us Know! 
                </h1>  
                <div style={{width: '100%', margin: 'auto'}}>
                    <Burger ingredients= {props.ingredients}/>
                </div> 
                    <Button btnType="Danger" clicked={props.CheckoutCancel}> CANCEL </Button>
                    <Button btnType="Success" clicked={props.CheckoutContinue}> CONTINUE </Button> 
                </div>
        // </Aux>
        
    );
}
export default checkoutSummary;

