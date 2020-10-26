import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import HomepageLogged from './Homepage/HomepageLogged';
import IndividualBook from './SingleBookContent/IndividualBook';
import ProfileBorrowedBooks from './Profile/BorrowedBooks/ProfileBorrowedBooks';
import SearchResultPage from './SearchResultPage/SearchResultPage';
import ProfilePage from './Profile/ProfilePage/ProfilePage'
// import { AuthContext } from './Components/Private page/Context/AuthContext';

const PrivatePage = () => {
    return (
        <>
            <Switch>
                <Route exact path='/books' exact component={HomepageLogged} />
                <Route exact path='/books/:id' exact component={IndividualBook} />
                <Route exact path='/profile/borrowed' component={ProfileBorrowedBooks} />
                <Route path="/profile" component={ProfilePage} />
                <Route path='/search' component={SearchResultPage} />
                <Redirect exact from='/auth/signin' to="/books" />
                <Redirect exact from='/users' to="/books" />
                <Redirect exact from='/home' to="/books" />
                <Redirect from="/admin" to="/books" /> 
            </Switch>
        </>
    )
}

export default PrivatePage;