/*
import React from 'react'
import Header from '../header/Header'


function Calc() {
    
        return(
            <div>
                <Header/>
                <h1>Calculator Page</h1>
            </div>
        )
    
}

export default Calc
*/
import React, { useState } from 'react';
import Header from '../header/Header';
import "./Calc.css"
import { Form, Alert, Container, InputGroup, Button, Table, ButtonGroup } from "react-bootstrap";
function Calc() {
    const [budget, setBudget] = useState('');
    const [categories, setCategories] = useState('');
    const [percentages, setPercentages] = useState('');
    const [amounts, setAmounts] = useState([]);
    const [message, setMessage] = useState({ error: false, msg: "" });

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage("");
    if (budget === "" || categories === "" || percentages === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

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
        <>
        <Header />
        <Container style={{width : "500px" }}>
        <div className="p-4 box" >
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

            <div className="calc-header-font">
            Budget Calculator
            </div>
            <div className="calc-font-small">
            Plan your spending by using this calculator and personalizing it to your needs!</div>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBudgetAm">   
            <InputGroup>
            <InputGroup.Text id="formBudgetAm" style={{ backgroundColor: "green"}}>B</InputGroup.Text>
              <Form.Control
                type="test" value={budget} placeholder="Budget Amount" onChange={(e) => setBudget(e.target.value)} />
                
                </InputGroup>
                </Form.Group>

            
            <Form.Group className="mb-3" controlId="formBudgetCat">   
            <InputGroup>
            <InputGroup.Text id="formBudgetCat" style={{ backgroundColor: "green"}}>C</InputGroup.Text>
              <Form.Control
                type="text" value={categories} placeholder="Budget Categories (comma separated)" onChange={(e) => setCategories(e.target.value)} />
                
                </InputGroup>
                </Form.Group>

            <Form.Group className="mb-3" controlId="formBudgetPer">   
            <InputGroup>
            <InputGroup.Text id="formBudgetPer" style={{ backgroundColor: "green"}}>P</InputGroup.Text>
              <Form.Control
                type="text" value={percentages} placeholder="Budget Percentages (comma separated)" onChange={(e) => setPercentages(e.target.value)} />
                
                </InputGroup>
                </Form.Group>

                
                
                <Button type="submit" style={{ }}>Calculate</Button>
            </Form>
            </div>
            {amounts.length > 0 && (
                <div>
                    <div className="calc-amount-head">
                    <h2>Amounts to Spend:</h2>
                    </div>
                    <div className="amounts">
                    
                        {amounts.map((amount, index) => (
                            <li key={index}>
                                {categories.split(',')[index]}: ${amount}
                            </li>
                        ))}
                    
                    </div>
                </div>
            )}
            </Container>
        </>
    );
}

export default Calc;