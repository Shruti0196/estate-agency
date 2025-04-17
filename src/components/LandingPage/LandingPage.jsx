import { Button, Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import './LandingPage.css'

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div className='landing-page'>
            <img src='landing-page.png' alt='landing page' className='display-image' />
            <div className='right-div'>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Roofix</Typography>

                        <Button onClick={() => setIsLogin(true)}>Login</Button>
                        <Button onClick={() => setIsLogin(false)}>Signup</Button>

                        {
                            isLogin ?
                                <Login></Login> :
                                <Signup></Signup>
                        }
                    </CardContent></Card>
            </div>

        </div>
    )
}

export default LandingPage