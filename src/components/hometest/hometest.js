import { useState } from "react";
import React from 'react'
import { Container, Stack, Button, Navbar, Row, Col } from "react-bootstrap";
import Header from '../header/Header'
import AddExpense from "./AddExpense";
import Balance from "./Balance"
import AddIncome from "./AddIncome";
import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";
import { doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";
import { sendEmailVerification, getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from '../../context/UserAuthContext'


function HomeTest() { 
/*  return (
    <>
      <Header></Header>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary">Add Income</Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>
        <BalanceCard name="Balance" amount={0}></BalanceCard>
      </Container>
    </>
  )
}*/

  const [expenseId, setExpenseId] = useState("");
  const [incomeId, setIncomeId] = useState("");

  const getExpenseIdHandler = (id, uid) => {
    console.log("The ID of document to be edited: ", id);
    setExpenseId(id);
  };

  const getIncomeIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setIncomeId(id);
  };
  return (
    <>
    <Header></Header>
    
            <Balance/>
            <AddExpense id={expenseId} setExpenseId={setExpenseId} />
            <AddIncome id={incomeId} setIncomeId={setIncomeId} />
            <ExpenseList getExpenseId={getExpenseIdHandler} />
            <IncomeList getIncomeId={getIncomeIdHandler} />
    </>
  );
}
export default HomeTest;


