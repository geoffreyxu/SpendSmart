import { FirebaseError } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BudgetDataService from "./budget.services";
import { useAuth } from '../../context/UserAuthContext'
import "./Plans.css";
import { db, auth } from '../../firebase.config';
import { AlignVerticalBottom } from "@mui/icons-material";



const AddBudget = ({ id, setBudgetId }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("")
  

  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || amount === "" || date === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newBudget = {
      name,
      amount,
      date,
      userId: auth.currentUser.uid,
    };
    console.log(newBudget);

    try {
      if (id !== undefined && id !== "") {
        await BudgetDataService.updateBudget(id, newBudget);
        setBudgetId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BudgetDataService.addBudget(newBudget);
        setMessage({ error: false, msg: "New Budget added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setAmount("");
    setDate("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BudgetDataService.getBudget(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setAmount(docSnap.data().amount);
      setDate(docSnap.data().date)
      
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  
  return (
    <>
      <div className="p-4 box">
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
            Budget Planner
            </div>
            <div className="calc-font-small">
            Create future budgets to help stay organized as you spend.</div>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBudgetName">
            <InputGroup>
            <InputGroup.Text id="formBudgetName">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Budget Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
          </Form.Group>
            
          

          <Form.Group className="mb-3" controlId="formBudgetAmount">
            <InputGroup>
              <InputGroup.Text id="formBudgetAmount">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Budget Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
               </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBudgetDate">
            <InputGroup>
              <InputGroup.Text id="formBudgetDate">D</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Date in in form mm/dd/yyy"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              </InputGroup>
          </Form.Group>
          




          
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit" >
              Add/Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBudget;
