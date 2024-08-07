// frontend/src/components/ExpenseList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteExpense, updateExpense } from '../services/expenseService';

const ExpenseList = ({ expenses, setExpenses }) => {
    var editID;
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        await deleteExpense(id);
        setExpenses(expenses.filter(expense => expense._id !== id));
    };

    const fillEdit = async (expense) => {
        const date = new Date(expense.date);
        var mm = ("0" + (date.getMonth() + 1)).slice(-2);
        var dd =("0" + (date.getDate())).slice(-2);
        var yy = date.getFullYear();
        var dateString = yy + '-' + mm + '-' + dd;

        editID = expense._id;
        document.getElementById("editAmount").value = expense.amount;
        document.getElementById("editCategory").value = expense.category;
        document.getElementById("editDate").value = dateString;
        document.getElementById("editDescription").value = expense.description;
    };

    const handleEdit = async () => {
        const expense = {
            amount: document.getElementById("editAmount").value,
            category: document.getElementById("editCategory").value,
            date: document.getElementById("editDate").value,
            description: document.getElementById("editDescription").value
        };
        try {
                const result = await updateExpense(editID, expense);
                const index = expenses.findIndex(expense => expense._id === editID);
                const newExpenses = expenses.slice();
                newExpenses[index] = result.data;
                setExpenses(newExpenses);

        } catch (err) {
            console.error('Error creating expense:', err.message);
        }
    };

    /*
    value={editAmount} onChange={(e) => setEditAmount(e.target.value)}
    value={editCategory} onChange={(e) => setEditCategory(e.target.value)}
    value={editDate} onChange={(e) => setEditDate(e.target.value)}
    value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
    */
    //popovers for editing expense data
    //second part is the expense list
    //difficulty in editing, was solved by finding methods which helped modify the data that was already loaded as well as modify the database

    return (
        <div>
            <div popover="auto" id="editbox">
                <table className="expenseList"><tbody>
                    <tr>
                        <td><input type="number" id="editAmount"  required /></td>
                        <td><input type="text" id="editCategory"  required /></td>
                        <td><input type="date" id="editDate"  required /></td>
                        <td><input type="text" id="editDescription"   /></td>
                        <td>
                            <button className="submit-edit" onClick={() => handleEdit()}>Submit</button>
                        </td>
                    </tr>
                </tbody></table>
            </div>

            <h2>Expenses</h2>
            <table className="expenseList"><tbody>
                {expenses.map(expense => (
                    <tr key={expense._id}>

                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                        <td>{expense.description}</td>
                        <td>
                            <button className="edit-button" popovertarget="editbox" onClick={() => fillEdit(expense)} >Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(expense._id)} >Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody></table>
        </div>
    );
};



export default ExpenseList;


/*
        <div>
            <h2>Expenses</h2>
            <ul>
                {expenses.map(expense => (
                    <li key={expense._id}>

                                {expense.amount} - {expense.category} - {new Date(expense.date).toLocaleDateString()} - {expense.description}

                        <button className="delete-button" onClick={() => handleDelete(expense._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
*/
