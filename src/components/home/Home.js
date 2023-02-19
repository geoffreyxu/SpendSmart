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
      <div style={{ color: "black", fontSize: "50px" }}>Welcome to the home page</div>
    </>
  )
}

export default Home