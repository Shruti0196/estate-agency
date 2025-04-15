import React from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const FormCard = ({ formData, onChange, onSubmit }) => {
    console.log(formData)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value); // Pass data back to the parent
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Form Card</Typography>
                <form onSubmit={onSubmit}>
                    {
                        Object.entries(formData).map(([key, value]) => {
                            console.log(`Key: ${key}, Value: ${value}`);
                            return (<TextField
                                label={key}
                                name={key}
                                value={value}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />)
                        })
                    }
                    <Button type="submit" variant="contained">Submit</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default FormCard;
