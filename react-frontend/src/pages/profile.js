import React from 'react';
import '../components/Profile/profile.css';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authenticate, forget } from '../features/auth/authSlice';


const theme = createTheme();


export default function Profile(props) {

    const dispatch = useDispatch();

    const HandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        UpdateUser(data);
    };
    
    function UpdateUser(object) {
        axios
            .post('http://127.0.0.1:8000/api/auth/update', {
                name: object.get('name'),  
                email: object.get('email'),
                password: object.get('password'),
                password_confirmation: object.get('password_confirmation'),
            },
            {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('user')}` 
                }
            })
            .then((response) => {
                dispatch(forget());
                dispatch(authenticate());
            }).catch(error => {
                console.log(error);
        });
    }

    return (
        <div className='profile-container'>
            <div className="card">
                <div className='img-container'>
                    <img src="https://www.pngitem.com/pimgs/m/24-248631_blue-profile-logo-png-transparent-png.png" className="card-img-top" alt="Profile Pic"/>
                </div>
                <div className="card-body">
                    <h3 className="card-title">{props.user[0]}</h3>
                    <p className="card-text">{props.user[1]}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><a href='https://github.com/MohamadSakr96'>Github</a></li>
                    <li className="list-group-item"><a href='https://www.linkedin.com/in/mohamadsakr96/'>LinkedIn</a></li>
                </ul>
                <div className="card-body">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Edit Profile
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
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
                                    Update Profile Info
                                    </Typography>
                                    <Box component="form" onSubmit={HandleSubmit} sx={{ mt: 3 }}>
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
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
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
                                        />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Update
                                    </Button>
                                    </Box>
                                </Box>
                                </Container>
                            </ThemeProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}