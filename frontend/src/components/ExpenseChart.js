import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const ExpenseChart = (props) => 
    {
        const expenses = props.expenses;

        // Sort by Date to make things easier to track
        const sortedExpenses = expenses.slice().sort((a, b) => 
            {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (dateA < dateB) 
                {
                    return -1;
                } 
                else if (dateA > dateB) 
                {
                    return 1;
                } else 
                {
                    return 0;
                }
            });

        // make the label from the date
        const labels = sortedExpenses.map((expense) => 
            {
                const date = new Date(expense.date);
                return date.toLocaleDateString();
            });

        // put some points on that there chart
        /* const dataPoints = sortedExpenses.map((expense) => 
            {
            return expense.amount;
            });
        */
        var categories = [];
        var sets = [];

        for (const expense of sortedExpenses) {
            if(!categories.includes(expense.category)) {
                categories.push(expense.category);
                sets.push({
                    label: expense.category,
                    data: [{x: (new Date(expense.date)).toLocaleDateString(), y: expense.amount}],
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                });
            } else {
                sets[categories.indexOf(expense.category)].data.push({x: (new Date(expense.date)).toLocaleDateString(), y: expense.amount});
            }
        }
            //difficulty in getting categorical graphing was solved by creating two lists one of just the name and then one that holds the data in it
        //console.log(sets);        

        // Prepare data for chart

        const data =
        {
            labels: labels,
            datasets: sets,
        }

        /*
        const data = 
            {
                labels: labels,
                datasets:
                [
                {
                    label: 'Here is your spending!',
                    data: dataPoints,
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                },
                ],
            };
        */

        // Chart options
        const options = 
            {
                maintainAspectRatio: true,
                scales: {
                x: {
                    type: 'category',
                    title: 
                    {
                    display: true,
                    text: 'Day of expense',
                    },
                },
                y: 
                {
                    title: 
                    {
                    display: true,
                    text: 'Amount',
                    },
                    beginAtZero: true,
                },
                },
            };
//<h2>input dates and categories here</h2>
        return (
            <div popover="auto" id="chart" className="chart-container"> {/* Render Line chart */}
                <Line data={data}  options={options} width={800} height={500} />
                
            </div>
        
        );
    };

export default ExpenseChart;
