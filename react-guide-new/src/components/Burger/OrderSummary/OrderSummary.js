import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
/*
OrderSummary class is a component that render a 
For Loop through Ingredients summary, 
based on the key and return the key
it then tretunrs a page wrpaped in AUX with Buttons.
Buttons have their own css types and 
on click they take the purchase status
*/
    class OrderSummary extends Component {
       //could be fnc component, doesnt have to be a class
       //not required

        componentWillUpdate(){
            console.log('[OrderSummary] WillUpdate')
        }
        render()
        {
            const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return(
                    <li key={igKey}> 
                            <span style={{textTransform: 'capitilize'}}>{igKey}</span>: 
                            {this.props.ingredients[igKey]}
                    </li>
                );
            }
        
            );
            return (
                <Aux>
                    <h3>Your Order:</h3>
                    <p>burger with following ingredients: </p>
                    <ul>
                        {ingredientsSummary}
                    </ul>
                    <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                    <p>Continue to checkout ?</p>
                    <Button btnType="Danger" clicked={this.props.purchaseCancelled}> CANCEL </Button>
                    <Button btnType="Success" clicked={this.props.purchaseContinued}> CONTINUE </Button>     
                </Aux>
        );
        }

    } 


export default OrderSummary;
