import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ExploreBooksView from './Homepage/ExploreBooksView';
import IndividualBook from './SingleBookContent/IndividualBook/IndividualBook';
import ProfileBorrowedBooks from './Profile/BorrowedBooks/ProfileBorrowedBooks';
import SearchResultPage from './SearchResultPage/SearchResultPage';
import ProfilePage from './Profile/ProfilePage/ProfilePage'
import { AuthContext } from './Context/AuthContext';
import DefaultHomePage from './Homepage/DefaultHomePage';


const PrivatePage = () => {
    const { user } = useContext(AuthContext);

    if (user.role === 'user') {
        return (
            <>
                <Switch>
                    <Route path='/home' component={DefaultHomePage} />
                    <Route path='/books' exact component={ExploreBooksView} />
                    <Route exact path='/books/:id' exact component={IndividualBook} />
                    <Route exact path='/profile/borrowed' component={ProfileBorrowedBooks} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path='/search' component={SearchResultPage} />
                    <Redirect from="*" to="/home" />
                </Switch>
            </>
        )
    } else {
        return (
            <>
                <Switch>
                    <Route path='/home' component={DefaultHomePage} />
                    <Route path='/books' component={ExploreBooksView} />
                    <Route exact path='/books/:id' exact component={IndividualBook} />
                    <Route exact path='/profile/borrowed' component={ProfileBorrowedBooks} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path='/search' component={SearchResultPage} />
                    <Redirect exact from="/auth/signin" to="/home" />
                    <Redirect exact from="/users" to="/home"/>
                </Switch>
            </>
        )
    }
}

export default PrivatePage;