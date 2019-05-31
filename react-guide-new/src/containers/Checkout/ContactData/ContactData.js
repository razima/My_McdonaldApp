import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import instance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
    class ContactData extends Component {
        state = {
            name:'',
            email:'',
            address: {
                street: '',
                postalCode: ''
            },
            loading: false
        }
    orderHandler = (event) => {
        event.preventDefault();
        //accessing ings
 //command K command U 
 // to un comment
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Rojin azima',
                address: {
                    street: 'Teststreet1',
                    zipcode: '85281',
                    country:'mycountry'
                },
                email:'email'
            },
            deliveryMethod: 'fast'
        }
         instance.post('/orders.json', order)
        .then(response => {
           this.setState({orderSummaryDone: false});
        })
        .catch(error => 
         {
            this.setState({orderSummaryDone: false});
        })
       
        console.log(this.props.ingredients);
    }

        render () {
            let form = (
                <form >
                <input type="text" name="name" placeholder="your name"/>
                <input type="text" name="email" placeholder="your email"/>
                <input type="text" name="street" placeholder="street"/>
                <Button btnType ="Success" clicked={this.orderHandler}>ORDER </Button>
            </form>
            );
            if (this.state.loading)
            {
                form = <Spinner/>;
            }
            return(
                <div className="ContactData">
                    <h4>Enter your contact data</h4>
                    {form}
                </div>
            )
        }
      }
      export default ContactData;
