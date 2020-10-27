import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomepageLogged from './Homepage/HomepageLogged';
import IndividualBook from './SingleBookContent/IndividualBook/IndividualBook';
import ProfileBorrowedBooks from './Profile/BorrowedBooks/ProfileBorrowedBooks';
import SearchResultPage from './SearchResultPage/SearchResultPage';
import ProfilePage from './Profile/ProfilePage/ProfilePage'
import { AuthContext } from './Context/AuthContext';


const PrivatePage = () => {
    const { user } = useContext(AuthContext);
    
    if (user.role === 'user') {
        return (
            <>
                <Switch>
                    <Route exact path='/books' exact component={HomepageLogged} />
                    <Route exact path='/books/:id' exact component={IndividualBook} />
                    <Route exact path='/profile/borrowed' component={ProfileBorrowedBooks} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path='/search' component={SearchResultPage} />
                    <Redirect from="*" to="/books" />
                </Switch>
            </>
        )
    } else {
        return (
            <>
                <Switch>
                    <Route exact path='/books' exact component={HomepageLogged} />
                    <Route exact path='/books/:id' exact component={IndividualBook} />
                    <Route exact path='/profile/borrowed' component={ProfileBorrowedBooks} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path='/search' component={SearchResultPage} />
                    <Redirect from="/home" to="/books" />
                    <Redirect exact from="/auth/signin" to="/books" />
                    <Redirect exact from="/users" to="/books" />
                </Switch>
            </>
        )
    }
}

export default PrivatePage;