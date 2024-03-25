import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Form = ({ getUsers, handleClose, updateid }) => {
    const [updateUser, setUpdateUser] = useState("");
    const [formData, setFormData] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmpassword: ""
    });
    const schema = yup.object().shape({
        firstname: yup.string().required('First Name is required'),
        middlename: yup.string(),
        lastname: yup.string().required('Last Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'), 
        username: yup.string().required('Username is required').max(20, 'Username must be at most 20 characters'),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(16, 'Password must be at most 16 characters'),
        confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });
    const Updateschema = yup.object().shape({
        firstname: yup.string().required('First Name is required'),
        middlename: yup.string(),
        lastname: yup.string().required('Last Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'), 
        username: yup.string().required('Username is required').max(20, 'Username must be at most 20 characters'),
    });
       

    const getSchema = () => {
        if (updateid) {
            return Updateschema;
        } else {
            return schema;
        }
    };
    const formoptions = {
        resolver: yupResolver(getSchema())
    }
    if (updateid) {
        formoptions.defaultValues = updateUser
    }

    const { register, handleSubmit, formState: { errors } } = useForm(formoptions);

    const onSubmit = (data) => {
     
        if (updateid) {
            axios.put(`http://localhost:5001/updateusers/${updateid}`, data)
                .then((response) => {
                    if (response.data.result == true) {
                        toast.success(response.data.message);

                        setTimeout(() => {
                            handleClose();
                            getUsers();
                        }, 2000);
                    } else {
                      
                    }
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        } else {
            axios.post(`http://localhost:5001/add`, data)
                .then((response) => {
                    if (response.data.result == true) {
                        toast.success(response.data.message);

                        setTimeout(() => {
                            handleClose();
                            getUsers();
                        }, 2000);
                    }
                })
                .catch((error) => {
                });
        }
    };

   
    useEffect(() => {
   
        if (updateUser) {
            setFormData({
                firstname: updateUser.firstname,
                middlename: updateUser.middlename,
                lastname: updateUser.lastname,
                email: updateUser.email,
                username: updateUser.username,
                password: '', 
                confirmpassword: ''
            });
        }
    }, [updateUser,]); 

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="First Name"
                            {...register('firstname')}
                            error={!!errors.firstname}
                            helperText={errors.firstname?.message}
                            defaultValue={formData.firstname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Middle Name"
                            {...register('middlename')}
                            error={!!errors.middlename}
                            helperText={errors.middlename?.message}
                            defaultValue={formData.middlename}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            {...register('lastname')}
                            error={!!errors.lastname}
                            helperText={errors.lastname?.message}
                            defaultValue={formData.lastname}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            {...register('username')}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            defaultValue={formData.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            defaultValue={formData.email}
                        />
                    </Grid>
                    {/* { updateid ? */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Confirm Password"
                            {...register('confirmpassword')}
                            error={!!errors.confirmpassword}
                            helperText={errors.confirmpassword?.message}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ marginTop: 1, marginLeft: 2, display: 'flex', justifyContent: 'end' }}>
                        <Grid item xs={2}>
                            <Button type="reset" variant="outlined" color="secondary" fullWidth>
                                Clear
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                    
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Submit
                                </Button>

                        </Grid>
                    </Grid>
                </Grid>
            </form>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
};

export default Form;
