// frontend/src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/add">Add Expense</Link></li>
            </ul>
        </nav>
    );
 
};

export default NavBar;
