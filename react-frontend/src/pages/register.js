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
        password_confirmation: ''
    });

    const [ redirect, setRedirect ] = React.useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        // createUser(data);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        console.log(data.get("name"));
        console.log(data.get("email"));
        console.log(data.get("password"));
        console.log(data.get("password_confirmation"));
        
        // createUser(data);
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
                console.log( response.data);
                setRedirect(true);
            }).catch(error => {
                console.log(error);
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
                />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
