import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExpense } from '../services/expenseService';

const ExpenseForm = ({ setExpenses }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expense = { amount: amount, category: category, date: date, description: description };
    try {
      const result = await createExpense(expense);
      setExpenses((prevExpenses) => {
        return [...prevExpenses, result.data];
      });
      // empty form after entering
      setAmount('');
      setCategory('');
      setDate('');
      setDescription('');
      // should redirect to main page
      navigate('/');
    } catch (err) {
      console.error('Error creating expense:', err.message);
    }
  };
  // WHY DOES THIS NOT WORK UUUUUGH

  return (
    <form onSubmit={handleSubmit}>
      <table className="expenseList"><tbody>
        <tr>
      <td><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required /></td>
      <td><input type="text" value={category} list="categories" onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <datalist id="categories">
        <option value="Rent" />
        <option value="Food" />
        <option value="Gas" />
        <option value="Utilities" />
      </datalist></td>
      <td><input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></td>
      <td><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" /></td>
      <td><button type="submit">Add Expense</button></td>
      </tr>
      </tbody></table>
    </form>
  );
};

/*
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <input type="text" value={category} list="categories" onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <datalist id="categories">
        <option value="Rent" />
        <option value="Food" />
        <option value="Gas" />
        <option value="Utilities" />
      </datalist>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" >
      </textarea>
      <button type="submit">Add Expense</button>
    </form>
*/

export default ExpenseForm;
