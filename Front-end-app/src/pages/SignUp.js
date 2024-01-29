import * as React from 'react';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Link} from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Userpool from '../UserPool';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();


// email
// : 
// "vaishwipatel82110@gmail.com"
// password
// : 
// "vaishwi1223"

export default function SignUp() {

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
        const name = data.get("name")
        var attributeList = [];

        var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
        var dataName = {
            Name: 'name',
            Value: name,
        };

        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
        
        attributeList.push(attributeName);
        console.log(attributeName)

        if(email==="" || password===""){
        setError("Email or password can not be empty.")
        }
        else{
            Userpool.signUp(email,password,attributeList,null,(err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    navigate("/signin")
                }
                console.log(data)
                setError(data)
            })
        ;
        }

   

  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Grid container component="main" sx={{ height: '100vh' }}> */}
        {/* <CssBaseline /> */}
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square> */}
            <Grid sx={{backgroundPosition: 'center'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                
                autoFocus
              />
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
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
