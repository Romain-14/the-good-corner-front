import React from "react";
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

function Header() {
    const { isLogged } = useSelector((state) => ({ ...state.user }));

    return (
        <header>
            <h1>The Good Corner</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="shop">Shop</Link>
                {!isLogged ? (
                    <Link to="entry">Sign in/up</Link>
                ) : (
                    <>
                        <Link to="entry/dashboard">Dashboard</Link>
                        <Link to="entry/signout">Sign out</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
