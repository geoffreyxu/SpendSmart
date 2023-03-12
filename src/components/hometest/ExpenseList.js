import React, { useEffect, useState } from "react";
import "./hometest.css"
import ExpenseDataService from "./expense.services";
import IncomeDataService from "./income.services";
import { useAuth } from '../../context/UserAuthContext'
import "./expenselist.css"
import { db, auth } from "../../firebase.config";
import Balance from "./Balance";
import IncomeList from "./IncomeList"

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";



const ExpenseList = ({ getExpenseId, getIncomeId }) => {
  const [expense, setExpense] = useState([]);
  const [totalExpense, getTotalExpense] = useState(0);
  const [income, setIncome] = useState([]);
  const [totalIncome, getTotalIncome] = useState(0);

  useEffect(() => {
    getIncome();
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

  const deleteHandlerInc = async (id) => {
    await IncomeDataService.deleteIncome(id);
    getIncome();
  };
  useEffect(() => {
    getExpense();
  }, []);

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



  const deleteHandlerExp = async (id) => {
    await ExpenseDataService.deleteExpense(id);
    getExpense();
  };


  const balance = (totalIncome - totalExpense).toFixed(2);
  
  return (
    <>


<div className="balance-hometest">
    
      <h2>Your Balance</h2>
      <h3>${balance}</h3>
      <div className="income-expense-home">
        <div className="plus-home">
          <h3>Income</h3>
          <p>+${totalIncome}</p>
        </div>
        <div className="minus-home">
          <h3>Expenses</h3>
          <p>-${totalExpense}</p>
        </div>
      </div>
      
  </div>
  
  <div className="list-container">
      <div className="expenselist">
      <div className="mb-2">
        <button variant="primary" type="Submit" onClick={getExpense}>
          Refresh Expenses
        </button>
      </div>



    
      <table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Expense Name</th>
            <th>Expense Amount</th>
            <th>Expense Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.amount}</td>
                <td>{doc.date}</td>
                <td>
                  <button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getExpenseId(doc.id)}
                  >
                    Edit
                  </button>
                  <button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandlerExp(doc.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="expenselist">
      <div className="mb-2">

        <button variant="dark edit" onClick={getIncome}>
          Refresh Income
        </button>
      </div>



      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Income Name</th>
            <th>Income Amount</th>
            <th>Income Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {income.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.amount}</td>
                <td>{doc.date}</td>
                <td>
                  <button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getIncomeId(doc.id)}
                  >
                    Edit
                  </button>
                  <button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandlerInc(doc.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      </div>
      </div>
    </>
  );
};

export default ExpenseList;
