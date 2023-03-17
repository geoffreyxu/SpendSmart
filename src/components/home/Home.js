/*
import React from 'react'
import './Home.css'
import Header from '../header/Header'
import { useAuth } from '../../context/UserAuthContext'
import { Link, useNavigate } from "react-router-dom"

const Home = () => {

  const { logout } = useAuth()
  const navigate = useNavigate()

  const Balance = () => {
    return (
      <section className="balance">
          <h2>
            <Link
               className="balance-box"
               to="/profile">
               Balance: $100,000
            </Link>
         </h2>
        <div>
          <h4>
            <Link
               className="add-balance"
               to="/profile">
               Add Budget
            </Link>
            <Link
               className="add-expense"
               to="/profile">
               Add Expense
            </Link>
          </h4>
        </div>
      </section>
    );
  }
  const Menu = () => {
    return (
    <div> 
      <Link
         className="icon deg-0"
         to="/profile">
         <svg xmlns="http://www.w3.org/2000/svg" 
         width="48" 
         height="48" 
         viewBox="0 0 24 24">
         <path fill="currentColor" d="M7 22q-.825 0-1.413-.588T5 20q0-.825.588-1.413T7 18q.825 0 1.413.588T9 20q0 .825-.588 1.413T7 22Zm10 0q-.825 0-1.413-.588T15 20q0-.825.588-1.413T17 18q.825 0 1.413.588T19 20q0 .825-.588 1.413T17 22ZM6.15 6l2.4 5h7l2.75-5H6.15ZM7 17q-1.125 0-1.7-.988t-.05-1.962L6.6 11.6L3 4H1.975q-.425 0-.7-.288T1 3q0-.425.288-.713T2 2h1.625q.275 0 .525.15t.375.425L5.2 4h14.75q.675 0 .925.5t-.025 1.05l-3.55 6.4q-.275.5-.725.775T15.55 13H8.1L7 15h11.025q.425 0 .7.288T19 16q0 .425-.288.713T18 17H7Zm1.55-6h7h-7Z"/>
         </svg>         
      </Link> 
      <Link
         className="icon deg-45"
         to="/profile">
         <svg xmlns="http://www.w3.org/2000/svg" 
         width="50" 
         height="50" 
         viewBox="0 0 512 512">
         <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M314.56 48s-22.78 8-58.56 8s-58.56-8-58.56-8a31.94 31.94 0 0 0-10.57 1.8L32 104l16.63 88l48.88 5.52a24 24 0 0 1 21.29 24.58L112 464h288l-6.8-241.9a24 24 0 0 1 21.29-24.58l48.88-5.52L480 104L325.13 49.8a31.94 31.94 0 0 0-10.57-1.8Z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M333.31 52.66a80 80 0 0 1-154.62 0"/>
         </svg>         
      </Link> 
      <Link
         className="icon deg-90"
         to="/profile">
         <svg xmlns="http://www.w3.org/2000/svg" 
         width="48" 
         height="48" 
         viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M17 11h1a3 3 0 0 1 0 6h-1m-8-5v6m4-6v6m1-10.5c-1 0-1.44.5-3 .5s-2-.5-3-.5s-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5s1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"/><path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/></g>
         </svg>         
      </Link> 
      <Link
         className="icon deg-135"
         to="/profile">
         <svg xmlns="http://www.w3.org/2000/svg" 
         width="48" 
         height="48" 
         viewBox="0 0 24 24">
         <path fill="currentColor" d="M6 19v1q0 .425-.288.713T5 21H4q-.425 0-.713-.288T3 20v-8l2.1-6q.15-.45.537-.725T6.5 5h11q.475 0 .863.275T18.9 6l2.1 6v8q0 .425-.287.713T20 21h-1q-.425 0-.713-.288T18 20v-1H6Zm-.2-9h12.4l-1.05-3H6.85L5.8 10ZM5 12v5v-5Zm2.5 4q.625 0 1.063-.438T9 14.5q0-.625-.438-1.063T7.5 13q-.625 0-1.063.438T6 14.5q0 .625.438 1.063T7.5 16Zm9 0q.625 0 1.063-.438T18 14.5q0-.625-.438-1.063T16.5 13q-.625 0-1.063.438T15 14.5q0 .625.438 1.063T16.5 16ZM5 17h14v-5H5v5Z"/>
         </svg>         
      </Link> 
      <Link
         className="icon deg-180"
         to="/profile">
         <svg xmlns="http://www.w3.org/2000/svg" 
         width="48" 
         height="48" 
         viewBox="0 0 24 24">
         <path fill="currentColor" d="M5 20v-8H2l10-9l4 3.6V4h3v5.3l3 2.7h-3v8h-6v-6h-2v6Zm2-2h2v-6h6v6h2v-7.8l-5-4.5l-5 4.5Zm2-6h6h-6Zm1-1.975h4q0-.8-.6-1.313Q12.8 8.2 12 8.2q-.8 0-1.4.512q-.6.513-.6 1.313Z"/>
         </svg>         
      </Link> 
      <Link
         className="icon deg-225"
         to="/profile">
         <svg xmlns="http://www.w3.org/2000/svg" 
         width="48" 
         height="48" 
         viewBox="0 0 24 24">
          <path fill="currentColor" d="M10 20h4v-1h-4v1Zm-3 3q-.825 0-1.413-.588T5 21V3q0-.825.588-1.413T7 1h10q.825 0 1.413.588T19 3v18q0 .825-.588 1.413T17 23H7Zm0-5v3h10v-3H7Zm0-2h10V6H7v10ZM7 4h10V3H7v1Zm0 14v3v-3ZM7 4V3v1Z"/>
         </svg>         
      </Link> 
      <Link
         className="icon deg-270"
         to="/profile">
         <svg xmlns="http://www.w3.org/2000/svg" 
         width="48" 
         height="48" 
         viewBox="0 0 256 256">
         <path fill="currentColor" d="M216 64h-40v-8a24.1 24.1 0 0 0-24-24h-48a24.1 24.1 0 0 0-24 24v8H40a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16ZM96 56a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm120 152H40V80h176v128Zm-52-64a8 8 0 0 1-8 8h-20v20a8 8 0 0 1-16 0v-20h-20a8 8 0 0 1 0-16h20v-20a8 8 0 0 1 16 0v20h20a8 8 0 0 1 8 8Z"/>
         </svg>         
      </Link> 
      <Link
         className="icon deg-315"
         to="/profile">
         <svg xmlns="http://www.w3.org/2000/svg" 
         width="48" 
         height="48" 
         viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m15 15l3.379-3.379a2.121 2.121 0 0 1 1.5-.621H20a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2h4.515a6 6 0 0 1 4.242 1.757L15 15zM3 15h18v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2z"/><path d="M12 4c-4.623 0-8.432 1.756-8.942 6c-.066.55.39 1 .942 1h16c.552 0 1.008-.45.942-1c-.51-4.244-4.319-6-8.942-6zM7.001 8H7m8.001-1H15m-2.999 1H12"/></g>
         </svg>         
      </Link> 
    </div>
    );
  };
/*          <i className="fas fa-cart"></i>
          <p>Shopping</p>
          <i className="fas fa-clothes"></i>
          <p>Clothing</p>
          <i className="fas fa-food"></i>
          <p>Food</p>  
          <i className="fas fa-beer"></i>
          <p>Entertainment</p>          
          <i className="fas fa-car"></i>
          <p>Car</p>
          <i className="fas fa-home"></i>
          <p>Home</p>
          <i className="fas fa-phone"></i>
          <p>Phone</p>      
          <i className="fas fa-thermometer"></i>
          <p>Medical</p>      
          <i className="fas fa-thermometer"></i>
          <p>Misc.</p> */
  return (
    <>
    <Header></Header>  
    <Balance />
    <Menu />
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