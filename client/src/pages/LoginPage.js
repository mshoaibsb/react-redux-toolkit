const { Grid, Typography } = require("@mui/material")
const { default: Login } = require("../components/Login")


const LoginPage = () => {
    return(
        <Grid container alignItems="center" justifyContent="center" direction="column" style={{ minHeight : "100vh" }}>
            <Grid item>
                <Login/>
            </Grid>
        </Grid>
    )
}

export default LoginPage;