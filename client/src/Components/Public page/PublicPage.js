import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Homepage/Homepage';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';

const PublicPage = () => {
    return (
        <>
                <Switch>
                    <Redirect exact from="/" exact to="/home" />
                    <Route exact path='/home' exact component={HomePage} />
                    <Route exact path='/auth/signin' component={LoginForm} />
                    <Route exact path='/users' exact component={RegisterForm} />
                    <Redirect from="*" exact to="/"></Redirect>
                </Switch>
        </>
    )
}

export default PublicPage;