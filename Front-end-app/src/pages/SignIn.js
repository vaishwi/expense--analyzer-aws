import * as React from 'react';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useState } from 'react';
import UserPool from '../UserPool';


const theme = createTheme();

export default function SignIn() {
  
  const navigate = useNavigate()
  const [error,setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const email = data.get('email');
    const password =  data.get('password');
    

    const user =  new CognitoUser({
        Username: email,
        Pool: UserPool
    })

    const authDetails = new AuthenticationDetails({
        Username:email,
        Password:password
    })

    
    if(email==="" || password===""){
      setError("Email or password can not be empty.")
    }
    else{
        user.authenticateUser(authDetails,{
            onSuccess:(data)=>{
                console.log("On success: ",data)
                console.log(data.idToken.jwtToken)
                const jwtToken = data.idToken.jwtToken
                localStorage.setItem("userEmail",email)
                localStorage.setItem("jwtToken",jwtToken)
                setError("")
                navigate("/home")
            },
            onFailure:(err)=>{
                console.log(err)
                console.log(typeof(err))
                console.log(Object.keys(err))
                console.log(err.name)
                console.log(err.code)
                console.log(Object.values(err))
                setError("Incorrect username or password")
                // setError(err)
            },
            newPasswordRequired:(data)=>{
                console.log("New password required: ",data)
            }
        })
    }

  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          
          sm={4}
          md={7}
        //   sx={{
        //     backgroundImage: 'url(https://source.unsplash.com/random)',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundColor: (t) =>
        //       t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //   }}
        >
            <Typography>Expense Analyzer</Typography>
        </Grid> */}
        <Grid item xs={12} sm={8} md={5} >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h3"
            >Expense Analyzer
            </Typography>
            <Typography component="h1" variant="h5" sx={{mt:10}}>
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Typography color={'red'}>{error}</Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have Account? Sign Up
                </Link>
              </Grid>
            </Grid>

            </Box>
          </Box>
        </Grid>
      {/* </Grid> */}
    </ThemeProvider>
  );
}
