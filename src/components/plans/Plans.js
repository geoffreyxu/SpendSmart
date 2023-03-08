/*
import React from 'react'
import Header from '../header/Header'


function Plans() {
    
        return(
           
            <div>
                 <Header/>
                <h1>Budget Planning Page</h1>
            </div>
        )
    
}

export default Plans
*/
import { useState } from "react";
import React from 'react'
import { Container, Navbar, Row, Col } from "react-bootstrap";
import Header from '../header/Header'
import AddBudget from "./AddBudget";
import BudgetList from "./BudgetList";
import "./Plans.css";

function Plans() {
  const [budgetId, setBudgetId] = useState("");

  const getBudgetIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBudgetId(id);
  };
  return (
    <>
    <Header/>
      <Container style={{width : "400px"}}>
        <Row>
          <Col>
            <AddBudget id={budgetId} setBudgetId={setBudgetId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BudgetList getBudgetId={getBudgetIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Plans;
