import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import DataAnalysisResultComponent from './DataAnalysisResultComponent';
import {Button, Typography, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';


const APP_LINK = process.env.REACT_APP_API_LINK
const FETCH_HISTORY_URL = APP_LINK+process.env.REACT_APP_FETCH_HISTORY_PATH
const jwtToken = localStorage.getItem("jwtToken")
export default function ReceiptList(){

    const naviagte = useNavigate();
    const userEmail = localStorage.getItem("userEmail")
    const [userHistory,setUserHistory] = useState([])
    const [messageToDisplay,setMessageToDisplay] = useState("Loading ...")


    useEffect(() => {
        const data_json = { userEmail: userEmail };
        console.log(data_json);
        axios({
          
          url: FETCH_HISTORY_URL,
          method: "POST",
          headers:{
            authorization:jwtToken
        },
          data: data_json,
        })
          
          .then((res) => {
           console.log(res)
           console.log(typeof(res.data.history))
           if(res.data.history.length === 0){
                setMessageToDisplay("No History yet.")
           }
           else{
            setMessageToDisplay("")
           }
           setUserHistory(res.data.history)
          })
    
          // Catch errors if any
          .catch((err) => {
            console.log(err);
          });
      }, [messageToDisplay]);

      const logout = ()=>{

      }

    return (
        <div>
            <Button variant="contained" align="left" color="primary" sx={{ height: 40 }} onClick={()=>naviagte("/home")}>
                HOME
            </Button>
            
            <Box
            m={1}
            //margin
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            // sx={boxDefault}
            >
            <Button variant="contained" color="primary" sx={{ height: 40 }} onClick={Logout}>
                LOGOUT
            </Button>
            
            </Box>
            <Typography>
                {messageToDisplay}
            </Typography>
            {userHistory && (
                userHistory.map((receipData)=>  <DataAnalysisResultComponent data = {receipData}/>)
            )}
        </div>
    )
}