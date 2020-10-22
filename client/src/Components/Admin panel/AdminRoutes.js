import React, { useState } from 'react';
import SideNav from './AdminSideNav/AdminSideNav';
import TopNav from './AdminTopNav/AdminTopNav';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AdminUsers from './AdminUsers/AdminUsers';
import AdminBooks from './AdminBooks/AdminBooks';
import AdminReviews from './AdminReviews/AdminReviews';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import BanUser from './AdminUsers/BanUserPage/BanUserPage';
import EditBookPage from './AdminBooks/EditBookPage/EditBookPage';
import EditReviewPage from './AdminReviews/EditReviewPage/EditReviewPage';
import CreateBookPage from './AdminBooks/CreateBookPage/CreateBookPage';
import './AdminRoutes.css';

const AdminRoutes = () => {

    const [buttons, setButtons] = useState('haha')

    const changeButtons = (val) => {
        return setButtons(val)
    }

    return (
        <div>
            <SideNav changeMenu={changeButtons} />
            <TopNav />
            <div className="adminUIContainer">
                <Redirect path='/admin' exact to="/admin/dashboard" />
                <Route path='/admin/dashboard' component={AdminDashboard} />
                <Route exact path='/admin/users' component={AdminUsers} />
                <Route exact path='/admin/books' component={AdminBooks} />
                <Route exact path='/admin/reviews' component={AdminReviews} />
                <Route path='/admin/users/ban' component={BanUser} />
                <Route exact path='/admin/books/edit' component={EditBookPage} />
                <Route path='/admin/reviews/edit' component={EditReviewPage} />
                <Route path='/admin/books/add' component={CreateBookPage} />
            </div>
        </div>
    )
}

export default AdminRoutes;