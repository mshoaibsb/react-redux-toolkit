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
import { useState } from 'react';

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
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }
    return(
        <Grid container direction="column" alignItems="center" justifyContent="center">
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><LockIcon/></Avatar>
                <h2>Sign In</h2>
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