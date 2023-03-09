import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BudgetDataService from "./budget.services";
import "./Plans.css";


const BudgetList = ({ getBudgetId }) => {
  const [budget, setBudget] = useState([]);
  useEffect(() => {
    getBudget();
  }, []);

  const getBudget = async () => {
    const data = await BudgetDataService.getAllBudgets();
    console.log(data.docs);
    setBudget(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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


      <div ClassName="search-bar">
      <div>search bar</div>
      
      </div>

      {/* <pre>{JSON.stringify(budget, undefined, 2)}</pre>} */}
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
