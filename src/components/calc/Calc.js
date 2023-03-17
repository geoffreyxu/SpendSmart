// This version of the calculator is functional but prone to an error which occurs when the user inputs percentages
// that sum to less than 100%. The output is incorrect. 
import React, { useState } from 'react';
import Header from '../header/Header';

function Calc() {
    const [budget, setBudget] = useState('');
    const [categories, setCategories] = useState('');
    const [percentages, setPercentages] = useState('');
    const [amounts, setAmounts] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // split the categories and percentages into arrays
        const categoryArr = categories.split(',');
        const percentageArr = percentages.split(',');

        // calculate the amount for each category
        const totalPercentage = percentageArr.reduce((acc, curr) => acc + Number(curr), 0);
        const amountsArr = percentageArr.map((percentage) => (percentage / totalPercentage) * budget);

        // update the amounts state
        setAmounts(amountsArr);
    };

    return (
        <div>
            <Header />
            <h1>Budget Calculator</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Budget:
                    <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
                </label>
                <label>
                    Categories (comma separated):
                    <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} />
                </label>
                <label>
                    Percentages (comma separated):
                    <input type="text" value={percentages} onChange={(e) => setPercentages(e.target.value)} />
                </label>
                <button type="submit">Calculate</button>
            </form>
            {amounts.length > 0 && (
                <div>
                    <h2>Amounts to Spend:</h2>
                    <ul>
                        {amounts.map((amount, index) => (
                            <li key={index}>
                                {categories.split(',')[index]}: {amount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Calc;
