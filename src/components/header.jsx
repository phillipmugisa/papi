import React from "react";
import { Link, useLocation } from 'react-router-dom';

import { FaStickyNote } from "react-icons/fa";

const Header = () => {

    const tabs = [
        // { name: "Home", path: "/"},
        { name: "News", path: "/"},
        { name: "Tasks", path: "/tasks"},
    ]

    const location = useLocation()

    return (
        <header>
            <nav>
                <ul>
                    <div className="left-tabs">
                        <Link to="/">
                            <li className="logo">
                                <span className="start-letter">P</span>
                                <span className="end-letter">APi</span>
                            </li>
                        </Link>
                    </div>
                    <div className="center-tabs">
                        { 
                            tabs.map(tab => {
                                return (
                                    <Link to={ tab.path } key={tab.path}>
                                        <li  className={ location.pathname === tab.path ? 'active' : null } >
                                            { tab.name }
                                        </li>
                                    </Link>
                                )
                            }) 
                        }
                    </div>
                    <div className="right-tabs">
                        <Link to="/createTask">
                            { location.pathname === "/tasks" ? <li id="createTask">
                                <FaStickyNote />
                                </li>  : null}
                        </Link>
                        {/* <Link to="/account">
                            <li className={ location.pathname === '/account' ? 'active' : null } >Account</li>
                        </Link> */}
                    </div>
                </ul>
            </nav>
        </header>
    );
}
 
export default Header;