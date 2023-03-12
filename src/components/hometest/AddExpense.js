import { FirebaseError } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import ExpenseDataService from "./expense.services";
import { useAuth } from '../../context/UserAuthContext'
import "./expense.css"
import { db, auth } from '../../firebase.config';
import { AlignVerticalBottom } from "@mui/icons-material";



const AddExpense = ({ id, setExpenseId }) => {
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
    const newExpense = {
      name,
      amount,
      date,
      userId: auth.currentUser.uid,
    };
    console.log(newExpense);

    try {
      if (id !== undefined && id !== "") {
        await ExpenseDataService.updateExpense(id, newExpense);
        setExpenseId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await ExpenseDataService.addExpense(newExpense);
        setMessage({ error: false, msg: "New Expense added successfully!" });
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
      const docSnap = await ExpenseDataService.getExpense(id);
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
    <div className="transaction-container">
    <div className="add-expense">
      <div className="p-4 box">
        {message?.msg && (
          <alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </alert>
        )}

        <form onSubmit={handleSubmit}>
          
            <label>
            Expense:
              <input 
                type="text"
                placeholder="Expense Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              </label>
            
          

          <label>
            Amount:
            <input
                type="text"
                placeholder="Expense Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              </label>

          <label>
            Date 
            <input
                type="text"
                placeholder="Date in in form mm/dd/yyy"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              </label>
          




          
          <div className="d-grid gap-2">
            <button variant="primary" type="Submit" >
              Add/Update
            </button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </>
  );
};

export default AddExpense;
