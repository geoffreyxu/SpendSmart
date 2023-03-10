import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BudgetDataService from "./budget.services";
import { useAuth } from '../../context/UserAuthContext'
import "./Plans.css";
import { db, auth } from "../../firebase.config";
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



const BudgetList = ({ getBudgetId }) => {
  const [budget, setBudget] = useState([]);
  useEffect(() => {
    getBudget();
  }, []);

  const getBudget = async () => {
    const userId = auth.currentUser.uid; // get the current user's ID
    const data = await BudgetDataService.getAllBudgets();
    console.log(data.docs);
    setBudget(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((budget) => budget.userId === userId)); // filter budgets based on userId
  };

  const deleteHandler = async (id) => {
    await BudgetDataService.deleteBudget(id);
    getBudget();
  };


  
  return (
    <>
   
      <div className="mb-2">
        <Button variant="dark edit" onClick={getBudget}>
          Refresh List
        </Button>
      </div>



      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Budget Name</th>
            <th>Budget Amount</th>
            <th>Budget Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {budget.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.amount}</td>
                <td>{doc.date}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getBudgetId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BudgetList;









/*
import React, { useState, useEffect } from "react";
import BudgetDataService from "./budget.services";

const BudgetList = ({ userId }) => {
  const [budgets, setBudgets] = useState([]);
  const [message, setMessage] = useState({ error: false, msg: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BudgetDataService.getBudgetsByUser(userId);
        setBudgets(response.data);
      } catch (err) {
        setMessage({ error: true, msg: err.message });
      }
    };
    fetchData();
  }, [userId]);

  const deleteBudget = async (id) => {
    try {
      await BudgetDataService.deleteBudget(id);
      setBudgets(budgets.filter((budget) => budget.id !== id));
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  return (
    <div>
      {message.error ? (
        <div className="alert alert-danger">{message.msg}</div>
      ) : (
        ""
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.id}>
              <td>{budget.name}</td>
              <td>{budget.amount}</td>
              <td>{budget.date}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBudget(budget.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetList;
*/