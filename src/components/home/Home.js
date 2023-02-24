import React from 'react'
import './Home.css'
import { useAuth } from '../../context/UserAuthContext'
import { Link, useNavigate } from "react-router-dom"
import Header from '../header/Header'

const Home = () => {

  const { logout } = useAuth()
  const navigate = useNavigate()

  const Balance = () => {
    return (
      <section classname="balance">
        <div classname="balance-box">
          <h2>Balance: $1,000</h2>
        </div>
      </section>
    );
  }
  const Icons = () => {
    return (
      <section className="icons">
        <div className="icon">
          <i className="fas fa-shopping-cart"></i>
          <p>Shop</p>
        </div>
      </section>
    );
  };

  return (
    <>
     <Header></Header>
      <h1>Welcome to the home page</h1>
      <Balance />
      <Icons />
    </>
  )
}

export default Home