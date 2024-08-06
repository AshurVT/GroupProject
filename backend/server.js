// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => 
        {
            console.log('MongoDB connected');
        })
    .catch((err) => 
        {
            console.log('Error connecting to MongoDB:', err.message);
        });

// Expense model
const Expense = require('./models/Expense');

// Routes
app.post('/api/expenses', async (req, res) => 
    {
        const { amount, category, date, description } = req.body;
        const newExpense = new Expense(
            {
            amount: amount,
            category: category,
            date: date,
            description: description
            });

        try {
            const savedExpense = await newExpense.save();
            res.json(savedExpense);
        } 
        catch (err) 
        {
            console.error('Error saving expense:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

app.get('/api/expenses', async (req, res) => 
    {
        try {
            const expenses = await Expense.find();
            res.json(expenses);
        } catch (err) {
            console.error('Error fetching expenses:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

app.put('/api/expenses/:id', async (req, res) => {
    const expenseId = req.params.id;
    const expenseData = req.body;

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, expenseData, { new: true });
        res.json(updatedExpense);
    } catch (err) {
        console.error('Error updating expense:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/expenses/:id', async (req, res) => {
    const expenseId = req.params.id;

    try {
        await Expense.findByIdAndDelete(expenseId);
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        console.error('Error deleting expense:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a simple route to handle the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Expense Tracker API');
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}

// Set the port
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
