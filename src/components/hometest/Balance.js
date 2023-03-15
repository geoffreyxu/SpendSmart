import React, { useEffect, useState } from "react";
import './balance.css'
import ExpenseDataService from "./expense.services";
import IncomeDataService from "./income.services";
import { db, auth } from "../../firebase.config";

    

function Balance() {

  const [expense, setExpense] = useState([]);
  const [totalExpense, getTotalExpense] = useState(0);
  const [income, setIncome] = useState([]);
  const [totalIncome, getTotalIncome] = useState(0);
  useEffect(() => {
    getIncome();
    getExpense();
  }, []);

  const getIncome = async () => {
    const userId = auth.currentUser.uid; // get the current user's ID
    const data = await IncomeDataService.getAllIncome();
    console.log(data.docs);
    setIncome(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((income) => income.userId === userId)); // filter budgets based on userId
    const filteredIncomes = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((income) => income.userId === auth.currentUser.uid);
    const total = filteredIncomes.reduce(
      (accumulator, income) => accumulator + parseFloat(income.amount),
      0
    );
    getTotalIncome(total);
  };
  const getExpense = async () => {
    const userId = auth.currentUser.uid; // get the current user's ID
    const data = await ExpenseDataService.getAllExpense();
    console.log(data.docs);
    setExpense(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((expense) => expense.userId === userId)); // filter budgets based on userId
    const filteredExpenses = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((expense) => expense.userId === auth.currentUser.uid);
    const total = filteredExpenses.reduce(
      (accumulator, expense) => accumulator + parseFloat(expense.amount),
      0
    );
    getTotalExpense(total);
  };
  const balance = (totalIncome - totalExpense).toFixed(2);


return (
    <div className="balance-home">
        <div className="balance-header">
      <h2>Your Balance</h2>
      </div>
      <h3>${balance}</h3>
      <div className="income-expense-home">
        <div className="plus-home">
          <h3>Income</h3>
          <div className="income-number">+${totalIncome.toFixed(2)}</div>
        </div>
        <div className="minus-home">
          <h3>Expenses</h3>
          <div className="minus-number">-${totalExpense.toFixed(2)}</div>
        </div>
      </div>
      <div className="mb-2">
        <button variant="primary" type="Submit" onClick={() => {
          getIncome();
          getExpense();
        }}>
          Refresh Balance
        </button>
      </div>
    </div>
  );
};
export default Balance;
