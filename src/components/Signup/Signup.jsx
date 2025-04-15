// Signup.js
import { useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import FormCard from '../FormCard/FormCard.jsx';
// FormCard

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Handle form data change
    const handleFormChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // await axios.post('http://localhost:8000/api/register/', formData);
        // alert('User registered! You can now log in.');
        console.log('Foorm', JSON.stringify(formData))
        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log('result', result)
            if (response.ok) {
                // setMessage('User registered successfully!');
                router.push('/login')
            }
        } catch (error) {
            // setMessage('An error occurred');
            console.error('Error:', error);
        }
    };

    return (
        // <form onSubmit={handleSubmit}>
        //     <input name="username" onChange={handleChange} placeholder="Username" />
        //     <input name="email" onChange={handleChange} placeholder="Email" />
        //     <input name="password" type="password" onChange={handleChange} placeholder="Password" />
        //     <button type="submit">Sign Up</button>
        // </form>
        <Container>
            <FormCard
                formData={formData}   // Pass current form data to FormCard
                onChange={handleFormChange}  // Pass the onChange handler to update parent state
                onSubmit={handleFormSubmit}  // Handle form submission in parent
            />
        </Container>
    );
};

export default Signup;

// import React, { useState } from 'react';
// import { Container } from '@mui/material';
// import FormCard from './FormCard'; // Assuming FormCard is in the same directory

// const ParentComponent = () => {
//   // Initialize state for the form data
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   // Handle form data change
//   const handleFormChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form submission
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Here you can process formData (e.g., send to API or process)
//     console.log('Form Data submitted:', formData);
//   };

//   return (
//     <Container>
//       <FormCard
//         formData={formData}   // Pass current form data to FormCard
//         onChange={handleFormChange}  // Pass the onChange handler to update parent state
//         onSubmit={handleFormSubmit}  // Handle form submission in parent
//       />
//     </Container>
//   );
// };

// export default ParentComponent;

