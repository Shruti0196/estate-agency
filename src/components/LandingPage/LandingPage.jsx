import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div>
            <img src='landing-page.png' alt='landing page' className='landing-page' />
            <div>
                <Typography>Roofix</Typography>
                {
                    isLogin ?
                        <Login></Login> :
                        <Signup></Signup>
                }
                <Button onClick={() => setIsLogin(true)}>Login</Button>
                <Button onClick={() => setIsLogin(false)}>Signup</Button>

            </div>
        </div>
    )
}

export default LandingPage