import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

export default function Register() {
    const [input, setInput] = useState({ 
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        isValid: ''
    });

    const [ redirect, setRedirect ] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
        validateInput(name, value);
    };

    const validateInput = (name, value) => {
        if (name === "name"){
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
        if (name === "password") {
            if (value.length < 8 || !value.match("^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$")) {
                setError(prevState => ({
                    ...prevState,
                    [name]: "invalid password"
                }));
            }else {
                setError(prevState => ({
                    ...prevState,
                    [name]: ""
                }));
            }
        }
        if (name === "password_confirmation") {
            if (value !== input.password) {
                setError(prevState => ({
                    ...prevState,
                    [name]: "wrong password"
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);   
        createUser(data);
    };

    function createUser(object) {
        axios
            .post('http://127.0.0.1:8000/api/auth/register', {
            name: object.get('name'),  
            email: object.get('email'),
            password: object.get('password'),
            password_confirmation: object.get('password_confirmation'),
            })
            .then((response) => {
                setRedirect(true);
            }).catch(error => {
                setError(prevState => ({
                    ...prevState,
                    ["email"]: "email already exists!"
                }));
        });
    }

    if(redirect) {
        return <Redirect to={'/login'}/>;
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Create a New Account
            </Typography>
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
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                    onBlur={handleChange}
                    error = {Boolean(error?.password)}
                    helperText = {error?.password}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Password Confirmation"
                    type="password"
                    id="password_confirmation"
                    autoComplete="new-password"
                    onChange={handleChange}
                    onBlur={handleChange}
                    error = {Boolean(error?.password_confirmation)}
                    helperText = {error?.password_confirmation}
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
                Register
            </Button>
            <Grid container justifyContent="flex-start">
                <Grid item>
                <Link to={"/login"} variant="body2">
                    Already have an account? Login
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
    </ThemeProvider>
    );
}
