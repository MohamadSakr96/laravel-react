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
    const [input, setInput] = useState({ 
        name: '',
        email: ''
    });
    const [error, setError] = useState({
        name: '',
        email: '',
        isValid: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
        validateInput(name, value);
    };

    const validateInput = (name, value) => {
        if (name === "name" || name == "message"){
            if (value.length < 2){
                setError(prevState => ({
                    ...prevState,
                    [name]: "must be at least 2 letters long"
                }));
            }else {
                setError(prevState => ({
                    ...prevState,
                    [name]: ""
                }));
            }
        }
        if (name === "email") {
            if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                setError(prevState => ({
                    ...prevState,
                    [name]: "email is not valid!"
                }));
            }else {
                setError(prevState => ({
                    ...prevState,
                    [name]: ""
                }));
            }
        }
        if (error[name] !== '') {
            setError(prevState => ({
                ...prevState,
                ["isValid"]: "not Valid"
            }));
        }else {
            setError(prevState => ({
                ...prevState,
                ["isValid"]: ""
            }));
        }
    }
    
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
                    onChange={handleChange}
                    onBlur={handleChange}
                    error = {Boolean(error?.name)}
                    helperText = {error?.name}
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
                    onChange={handleChange}
                    onBlur={handleChange}
                    error = {Boolean(error?.email)}
                    helperText = {error?.email}
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
                disabled={Boolean(error?.isValid)}
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