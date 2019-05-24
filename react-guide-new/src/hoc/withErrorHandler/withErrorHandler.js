import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = ( WrappedComponent, instance ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInt = instance.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInt = instance.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount () {
            instance.interceptors.request.eject(this.reqInt);
            instance.interceptors.request.eject(this.resInt);
        }
        

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;