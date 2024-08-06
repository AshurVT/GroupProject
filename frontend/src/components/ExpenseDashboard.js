import React, { useEffect, useState } from 'react';
import { getExpenses } from '../services/expenseService';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';

const ExpenseDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const result = await getExpenses();
        setExpenses(result.data);
      } catch (err) {
        setError(err.message);
        console.error('Error pulling expenses:', err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="container">
      <h2>Expense Dashboard</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <ExpenseChart expenses={expenses} />
          <ExpenseList expenses={expenses} setExpenses={setExpenses} />
          <ExpenseForm setExpenses={setExpenses} />
        </div>
      )}
    </div>
  );
};

export default ExpenseDashboard;
