const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.post('/', async (req, res) => {
    const { amount, category, date, description } = req.body;
    const newExpense = new Expense({
        amount: amount,
        category: category,
        date: date,
        description: description
    });

    try {
        const savedExpense = await newExpense.save();
        res.json(savedExpense);
    } catch (err) {
        res.status(500).json({ error: 'Save failed. try agian?' });
    }
});

// display the expenses

router.get('/', async (req, res) => 
    {
        try 
        {
            const expenses = await Expense.find();
            res.json(expenses);
        } 
        
        catch (err) 
        {
            res.status(500).json({ error: 'cant find expenses' });
        }
    });


// update expense
router.put('/:id', async (req, res) => 
    {
            const expenseId = req.params.id;
            const expenseData = req.body;
    
        try 
        {
            const updatedExpense = await Expense.findByIdAndUpdate(expenseId, expenseData, { new: true });
            res.json(updatedExpense);
        } 
        catch (err) 
        {
            res.status(500).json({ error: 'How do i updaete?' });
        }
    });


// delete portion
router.delete('/:id', async (req, res) => 
    {
        const expenseId = req.params.id;

        try 
        {
            await Expense.findByIdAndDelete(expenseId);
            res.json({ message: 'Expense deleted' });
        } 
        catch (err) 
        {
            res.status(500).json({ error: 'delete failure.. that is weird' });
        }
    });

module.exports = router;
