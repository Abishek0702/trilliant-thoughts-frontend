import React, { useState } from 'react';
import { Container, Typography, Button, Grid, TextField, Box, FormControl, InputAdornment, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { doSignInWithEmailAndPassword } from '../firebase/auth';
import { doSignInWithEmailAndPassword } from '../../src/firebase/auth';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    });
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;
            await doSignInWithEmailAndPassword(email, password);
            localStorage.setItem("user",data.email)
            toast.success("Login Succesfully");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <>
            <Box sx={{ bgcolor: '#014DAD', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ bgcolor: '#368EF8', color: "white", display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h4" component="h1" gutterBottom> Welcome  </Typography>
                            <Typography variant="h5" gutterBottom>to online help center!</Typography>
                            <Grid container sx={{ display: 'flex', flexDirection: "row", alignItems: 'flex-start', justifyContent: 'center', marginTop: '10px' }} >
                                <CheckCircleIcon sx={{ marginRight: '10px' }} />
                                <Typography variant="body1" gutterBottom sx={{ marginLeft: '10px' }}>secure and reliable for users .</Typography>
                            </Grid>
                            <Grid container sx={{ display: 'flex', flexDirection: "row", alignItems: 'flex-start', justifyContent: 'center', marginTop: '10px' }} >
                                <CheckCircleIcon sx={{ marginRight: '10px' }} />
                                <Typography variant="body1" gutterBottom sx={{ marginLeft: '10px' }}> Even your grandma can use it</Typography>
                            </Grid>
                            <Grid container sx={{ display: 'flex', flexDirection: "row", alignItems: 'flex-start', justifyContent: 'center', marginTop: '10px' }} >
                                <CheckCircleIcon sx={{ marginRight: '10px' }} />
                                <Typography variant="body1" gutterBottom sx={{ marginLeft: '10px' }}> works 15% faster than others. </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ bgcolor: 'white', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                            <Grid container direction="column" spacing={2} alignItems="center" sx={{ padding: 5 }}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    label="Email"
                                                    variant="outlined"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <EmailIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    error={!!errors.email}
                                                    helperText={errors.email?.message}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                            </FormControl>
                                        )}
                                    />
                                    <Controller
                                        name="password"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    label="Password"
                                                    variant="outlined"
                                                    type={showPassword ? 'text' : 'password'}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PasswordIcon />
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={togglePasswordVisibility}>
                                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    error={!!errors.password}
                                                    helperText={errors.password?.message}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                            </FormControl>
                                        )}
                                    />
                                    <Button fullWidth variant="contained" type="submit"> Log in </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" gutterBottom sx={{ color: "white", display: "flex", justifyContent: 'flex-end' }}> Don't have an account? Contact us </Typography>
                </Container>
            </Box>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
};

export default Login;
