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