import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './store';
import AppWithNavigationState from './AppWithNavigationState';

const store = createStore();
export default class RnNavRedux extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
};