import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import ExpenseForm from './ExpenseForm';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const ExpenseSummary = (props) => 
    {
        const expenses = props.expenses;

        //month and year hopefully?
        const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
        const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

        //filter if everything goes right
        const filteredExpenses = expenses.filter((expense) => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() + 1 === selectedMonth && expenseDate.getFullYear() === selectedYear;
        });

        // Sort by Date to make things easier to track
        const sortedExpenses = expenses.slice().sort((a, b) => 
            {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB;
            });



        var categories = [];
        var sets = [];
        var money = [];
        var Sums = [];
        var Counts = [];

        for (const expense of filteredExpenses) {
            if(!categories.includes(expense.category)) {
                categories.push(expense.category);
                
                sets.push({
                    label: expense.category,
                    data: [{x: (new Date(expense.date)).toLocaleDateString(), y: expense.amount}],
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                });

                Sums[expense.category] = expense.amount;
                Counts[expense.category] = 1;
            } else {
                sets[categories.indexOf(expense.category)].data.push({x: (new Date(expense.date)).toLocaleDateString(), y: expense.amount});
                Sums[expense.category] += expense.amount;
                Counts[expense.category] += 1;


            }
        }

        const Averages = {};
        for (const category in Sums) {
            Averages[category] = Sums[category] / Counts[category];
        }


//<h2>input dates and categories here</h2>
        return (
            <div popover="auto" id="summary" className="chart-container"> {/* Render Line chart */}
                <h2> Expense Summary</h2>
                <div>
                    <label>
                        Month:
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                            {[...Array(12).keys()].map((month) => (
                                <option key={month + 1} value={month + 1}>
                                    {new Date(0, month).toLocaleString('default', {month: 'long'})}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Year:
                        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                            {[...Array(10).keys()].map((yearOffset) => {
                                const year = new Date().getFullYear() - yearOffset;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                        </option>
                                );
                            })}
                        </select>
                    </label>
                </div>
                <ul>
                    {categories.map((category) => (
                        <li key={category}>
                            <strong>{category}</strong>:
                            <ul>
                                <li>Sum: {Sums[category]}</li>
                                <li>Average: {Averages[category]}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
                <Line data={{datasets: sets}} />
               
                
            </div>
        
        );
    };

export default ExpenseSummary;
