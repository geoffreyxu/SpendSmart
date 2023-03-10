/*
import React from 'react'
import Header from '../header/Header'
function HomeTest() {
    
        return(
            <div>
                <Header/>
                <h1>Home Test Page</h1>
            </div>
        )
    
}

export default HomeTest

*/

import { useState } from "react";
import React from 'react'
import { Container, Navbar, Row, Col } from "react-bootstrap";
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
  const [expenseId, setExpenseId] = useState("");
  const [incomeId, setIncomeId] = useState("");

  const getExpenseIdHandler = (id) => {
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
    
    
      <Container style={{width : "400px"}}>
        <Row>
          <Col>
            <AddExpense id={expenseId} setExpenseId={setExpenseId} />
            <AddIncome id={incomeId} setIncomeId={setIncomeId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <ExpenseList getExpenseId={getExpenseIdHandler} />
            <IncomeList getIncomeId={getIncomeIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeTest;
