import React, { Component } from 'react';
import Aux from '../Aux/Aux'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
   
    state = {
        showSideDrawer: true
    }
    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    //!this.state.showSidedDrawer
    //does not work, error
    /* if plan using the state, insert state.
    set state is asynchronous,leads to unexpected outcomes.
    use function form, expect  previous state as input 
    return  object*/
                                    
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
         });
    }

    render()
    {
        return( 
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.SideDrawerClosedHandler}
                /> 
                <main className ={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
   
}

export default Layout;