// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExpenseForm from './components/ExpenseForm';
import ExpenseDashboard from './components/ExpenseDashboard';
import NavBar from './components/NavBar';

const App = () => {
    return (
        <Router>
            <div className='container'>
                <NavBar />
                <h1>Expense Tracker</h1>
                <h2 className="chartButton"> <button popovertarget="chart"><img className="chartImage" src="charticon.png" alt="Chart"></img></button> </h2>
                <Routes>
                    <Route path="/add" element={<ExpenseForm />} />
                    <Route path="/" element={<ExpenseDashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
