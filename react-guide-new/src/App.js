import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Checkout from '../src/containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
/**
 * adding router package to render different paths
use the package, parse it, parse URL, read config to know which path
to support when visiting one of these paths.Then render
or load appropiacte JSX 
a component code 
depending on which path visited.*/
class App extends Component {
  render () {
    return (
      <div>
        <Layout>
              <Switch>
                  <Route path="/checkout" component={Checkout}/>
                  <Route path="/" exact component={BurgerBuilder}/>
              </Switch> 
        </Layout>
      </div>
    );
  }
}

export default App;
