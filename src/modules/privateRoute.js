import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => localStorage.getItem('access_token') ?
        (
            <Component {...props} />
        )    
    :(<Redirect to={{
            pathname: "/auth/login",
            state: { from: props.location }
        }} />
        )


        }
    />
)