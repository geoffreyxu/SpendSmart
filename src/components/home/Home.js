/*
import React from 'react'
import { useAuth } from '../../context/UserAuthContext'
import { Link, useNavigate } from "react-router-dom"
import Header from '../header/Header'

const Home = () => {

  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
     <Header></Header>
      <h1>Welcome to the home page</h1>
    </>
  )
}

export default Home
*/
/*
import Header from '../header/Header'
import React from "react";
import Balance from "./Balance";
import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";
import AddTransaction from "./AddTransaction";
import { GlobalContextProvider } from "../homecontext/GlobalState";
import "./Home.css";

const Home = () => {
  return (
    <>
    <Header></Header>
    <GlobalContextProvider>
      <div className="container-home">
        <div className="app-wrapper-home">
          <Balance />
          <IncomeList />
          <ExpenseList />
          <AddTransaction />
        </div>
      </div>
    </GlobalContextProvider>
    </>
  );
};

export default Home;
*/