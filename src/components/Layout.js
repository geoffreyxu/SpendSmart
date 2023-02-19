import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'

const Layout = () => {
    return (
        <>
           
            <main style={{
                marginTop:"150px"
            }}>
                <Outlet></Outlet>
            </main>
        </>
    )
}

export default Layout
