import React, { useState } from 'react';
import SideNav from './AdminSideNav/AdminSideNav';
import TopNav from './AdminTopNav/AdminTopNav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminUsers from './AdminUsers/AdminUsers'
import AdminBooks from './AdminBooks/AdminBooks'
import AdminReviews from './AdminReviews/AdminReviews'
import './AdminHome.css';

const AdminHome = () => {

    const [buttons, setButtons] = useState('haha')

    const changeButtons = (val) => {
        return setButtons(val)
    }

    console.log(buttons)
    return (
        <div>
            <SideNav changeMenu={changeButtons} />
            <TopNav />
            <div className="adminUIContainer">
                <Route path='/admin/users' component={AdminUsers} />
                <Route path='/admin/books' component={AdminBooks} />
                <Route path='/admin/reviews' component={AdminReviews} />
            </div>
        </div>
    )
}

export default AdminHome;