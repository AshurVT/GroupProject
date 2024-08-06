const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
    },
    category: 
        {
            type: String,
            required: true,
    },
    date: 
        {
            type: Date,
            default: Date.now,
    },
    description: 
        {
            type: String,
            required: false,
    },
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;
