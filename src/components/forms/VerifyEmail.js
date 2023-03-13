import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../context/UserAuthContext'
import './Signup.css'
const VerifyEmail = () => {
    const navigate = useNavigate()
    const {  emailVerification  } = useAuth()
    const [err, setError] = useState("")
    const [code, setCode] = useState("")
   
    const SubmitHandler = async (e) => {
        e.preventDefault()

        try {
            await emailVerification()
        } catch (error) {
            
        }
      }
  return (
    <div className='box-forms'>
    {
            err && <p className='error-forms'>{err}</p>
    }
    <form onSubmit={SubmitHandler} className="form-forms">
        <h2>Verify Your Email</h2>
        <div className="inputfield-forms">
            <input type="text"  
            placeholder="Enter Code Here" value={code} name='FullName' onChange={e=>(setCode(e.target.value))} />

            <p style={{color:"#fff", fontSize:"10px", marginTop:'3px',letterSpacing:"1px"}}>
                Please check your email to recieve a verification code.
            </p>
        </div>  
        <div className="inputfield-forms">
            <input type="submit"  value={"Verify"}></input>
        </div>
        <p className="forget-forms">Already Have an account? <Link to={"/"} className="link">{"login"}</Link></p>
    </form>

</div>
  )
}

export default VerifyEmail