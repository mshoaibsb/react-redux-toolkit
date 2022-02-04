import React from 'react'
import {
    Paper,
    Avatar,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Button
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import { loggin } from '../features/auth'
import {login} from '../services/index' 

const Login = (props) => {
    // Styles
    const paperStyle = {
        padding: 20,
        width: 280,
    }
    const avatarStyle = {
        backgroundColor : "green"
    }
    // Logics
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authentication = useSelector((state) => state.auth);
    console.log(authentication)

    const dispatch = useDispatch();
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login({email, password});
        
        dispatch(loggin({token:'adshfjksdaoi', loading: false, user:{_id:'1'}}))
        console.log(authentication)
    }
    return(
        <Grid container direction="column" alignItems="center" justifyContent="center">
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><LockIcon/></Avatar>
                <h2>{authentication.token}</h2>
            </Grid>  
            <form onSubmit={handleSubmit}>
            <TextField label="Email" type="email" placeholder="Enter email" variant="standard" fullWidth required id="email" onChange={handleEmail}/>
                <TextField label="Password" placeholder="Enter password" variant="standard" type="password" id="password" fullWidth required onChange={handlePassword}/>
                <FormControlLabel
                control = {
                    <Checkbox name="remeber" color="primary"/>
                }
                label = 'Rember me'
                />
                <Button type="submit" fullWidth variant="contained">Sign In</Button>
            </form>
        </Paper>
        </Grid>
    )
}

export default Login;