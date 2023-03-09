import React, { useContext } from "react";
import { GlobalContext } from "../homecontext/GlobalState"

const Balance = () => {
  const { incomeTransactions, expenseTransactions } = useContext(GlobalContext);

  const incomeAmounts = incomeTransactions.map(
    incomeTransaction => incomeTransaction.incomeAmount
  );

  const expenseAmounts = expenseTransactions.map(
    expenseTransaction => expenseTransaction.expenseAmount
  );

  const totalIncome = incomeAmounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const totalExpenses = expenseAmounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  return (
    <div className="balance-home">
      <h2>Your Balance</h2>
      <h3>${(totalIncome - totalExpenses).toFixed(2)}</h3>
      <div className="income-expense-home">
        <div className="plus-home">
          <h3>Income</h3>
          <p>+${totalIncome}</p>
        </div>
        <div className="minus-home">
          <h3>Expenses</h3>
          <p>-${totalExpenses}</p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
