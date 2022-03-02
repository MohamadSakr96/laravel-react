import React, {useState, useEffect} from 'react';
import './contactus.css';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


const theme = createTheme();

export default function Contactus() {
    
    const [result, setResult] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        uploadMessage(data);
    };

    function uploadMessage(object) {
        axios
            .post('http://127.0.0.1:8000/api/auth/message', {
                name: object.get('name'),  
                email: object.get('email'),
                message: object.get('message'),
            })
            .then((response) => {
                setResult(response.data["message"]);
            }).catch(error => {
                setResult(error.message);
            });
    }
    
    return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="message"
                    label="Enter a message"
                    name="message"
                    multiline 
                    rows={5}
                />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Submit
            </Button>
            </Box>
        </Box>
        <div className='result'>
            {result}
        </div>
        </Container>
    </ThemeProvider>
    );
}