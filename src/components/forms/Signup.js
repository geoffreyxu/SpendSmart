import { AuthErrorCodes } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../../context/UserAuthContext'
import './Signup.css'

const Signup = () => {
    const navigate = useNavigate()
    const { SignUp } = useAuth()
    const [err, setError] = useState("")
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const UserHandler = (e) => {
        const { name, value } = e.target;
        setUser((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const SubmitHandler = async (e) => {
        e.preventDefault()
        const { email, password, confirmPassword, FullName } = user
        if (password == "" || confirmPassword == "" || email == "" || FullName == "") {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Please fill all fields ")
        }
        else if (password !== confirmPassword) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password does not match")
        }
        else if (!password.length >= 6 || !confirmPassword.length >= 6) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password Must be Greater then 6 Length")
        }
        else {
            try {
                await SignUp(email, password)
                alert("WellCome New User Create successfully")
                navigate('/')
            } catch (err) {
                if (err.code === "auth/email-already-in-use") {
                    setInterval(() => {
                        setError("")
                    }, 5000)
                    setError("email already in use try another email")
                }
                else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {

                    setInterval(() => {
                        setError("")
                    }, 5000)
                    setError("Password Must be 6 charecter")
                }

                else {
                    setError(err.message)
                }
            }
        }
    }
    return (
<>
        <div className="forms-title">Welcome to&nbsp;<span class="colored-word">SpendSmart!</span> </div>
    
    <div className="forms-smaller">
      A budget app that helps you keep track of your expenses, set financial goals, and provide a breakdown on where your money is going.
    </div>
        <div className='box-forms'>
            {
                err && <p className='error-forms'>{err}</p>

            }
            
            <form onSubmit={SubmitHandler} className="form-forms">
                <h2>Registration Form</h2>
                <div className="inputfield-forms">
                    <input type="text" placeholder="Email" value={user.email} name='email' onChange={UserHandler} />
                </div>

                <div className="inputfield-forms">
                    <input type="password" placeholder="Password" value={user.password} name='password' onChange={UserHandler} />
                </div>
                <div className="inputfield-forms">
                    <input type="password" placeholder="Confirm Password" value={user.confirmPassword} name='confirmPassword' onChange={UserHandler} />
                </div>
                <div className="inputfield-forms">
                    <input type="submit" />
                </div>
                <p className="forget-forms">Already Have an account? <Link to={"/"} className="link">{"login"}</Link></p>
            </form>

        </div>
</>
    )
}

export default Signup