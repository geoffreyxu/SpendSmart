import React from 'react'
import Home from './components/home/Home'
import HomeTest from './components/hometest/hometest'
import Login from './components/forms/Login'
import Signup from './components/forms/Signup'
import Calc from './components/calc/Calc'
import Plans from './components/plans/Plans'
import Calendar from './components/calendar/Calendar'
import Profile from './components/profile/Profile'
import Layout from './components/Layout';
import Header from './components/header/Header';
import UserAuthContext from './context/UserAuthContext';
import ProtectedRoute from './components/forms/ProtectedRoute';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
    <Route index element={<Login />}></Route>
    <Route path='/Signup' element={<Signup />}></Route>
    <Route path='/home' element={<Home />}></Route>
    <Route path='/hometest' element={<HomeTest />}></Route>
    <Route path='/plans' element={<Plans />}></Route>
    <Route path='/calendar' element={<Calendar />}></Route>
    <Route path='/Calc' element={<Calc />}></Route>
    <Route path='/Profile' element={<Profile />}></Route>
  </Route>
));


function App() {
  return (
    
      <UserAuthContext> 
    <RouterProvider router={router} >
    </RouterProvider>
      </UserAuthContext>

  );
}

export default App;