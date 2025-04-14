import React from 'react';
import Header from './Header.jsx';
import Footer from "./Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
    const location = useLocation();

    let login = false;
    let register = false;
    let logout = false;

    if (location.pathname === "/register") {
        login = true;
        register = false;
        logout = false;
    } else if (location.pathname === "/login") {
        login = false;
        register = true;
        logout = false;
    } else if (location.pathname === "/dashboard") {
        login = false;
        register = false;
        logout = true;
    } else {
        login = true;
        register = true;
        logout = false;
    }

    return (
        <div>
            <Header login={login} register={register} logout={logout} />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
