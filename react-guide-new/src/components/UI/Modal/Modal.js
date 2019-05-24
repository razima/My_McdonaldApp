import React, {Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

/*theoretically, the component, is included in the burger builder but it is 
not updated because the wrapping
element modal has a shouldComponentUpdate method where we control this.
Now our code here is pretty lean in the modal and what we don't do, we don't
 react to changes in the
clicked listener,
so if the modal closed property would change, we're not checking this,
so we only return true if show changed.
It's okay here in this application because we actually never reassign this click listener.
If we were to do that or if we were to also change state in the modal, 
we definitely should also check
for changes in other props, in other state properties or simply extend pure component.  */

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
        
    }
    componentWillUpdate()   {
        console.log('[Modal] Will update' );
    }
    render()
    {
        return (
            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div 
                className={classes.Modal}
                //translateY(-100vh)
                //yani biad payin agar show = false bud 
                style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', 
                opacity: this.props.show ? '1' : '0'
            }}>
                {this.props.children}
        
        
            </div>
        </Aux>

        );
    }
} 
export default Modal;