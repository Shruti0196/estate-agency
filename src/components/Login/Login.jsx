// Login.js
import { useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import FormCard from '../FormCard/FormCard';
import { useNavigate } from 'react-router-dom';
// FormCard

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleFormChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('formmm', JSON.stringify(formData))
        const response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log('response', response)
        if (response.ok) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            navigate('homePage')
        }
    };

    return (
        <Container>
            <FormCard
                formData={formData}   // Pass current form data to FormCard
                onChange={handleFormChange}  // Pass the onChange handler to update parent state
                onSubmit={handleFormSubmit}  // Handle form submission in parent
            />
        </Container>
    );
};

export default Login;
