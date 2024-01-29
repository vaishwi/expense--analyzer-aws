/**
 * @author Vaishwi Patel (B00914336)
 * A React component that displays user information and allows the user to edit their profile.
 * @returns A React component that displays user information and allows the user to edit their profile.
 */
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from "react-router";

import {
    Container,
    Grid,
    Paper,
    Typography,
    createTheme,
} from "@mui/material";
import {
    Phone,
    Business,
    PersonAdd,
} from "@mui/icons-material";


const theme = createTheme();



/**
 * Defines the styles for a component using the makeStyles hook from Material-UI.
 * @returns An object containing the CSS styles for the component.
 */
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    avatar: {
        margin: `${theme.spacing(3)} 0`,
    },
    contactInfo: {
        padding: theme.spacing(3),
    },
    contactInfoItem: {
        display: "flex",
        alignItems: "center",
        margin: `${theme.spacing(2)} 0`,
    },
    subscribeButton: {
        display: "flex",
        margin: `${theme.spacing(3)} 0`,
        alignItems: "center",
    },
    contactInfoIcon: {
        marginRight: theme.spacing(1),
    },
}));



const DataAnalysisResultComponent = (analyzedReceiptData) => {

    const receiptData = analyzedReceiptData.data

    const classes = useStyles();
    const userEmail = localStorage.getItem("userEmail");



    return (
        <Container sx={{ ml: 10 ,mt:10}}>

            <h1> {} </h1>
            <Grid container spacing={3}>

                <Grid>
                    <Paper elevation={3} style={{ margin: "16px 0px" }}  >
                        <img src={`data:image/jpeg;base64,${receiptData.image}`} width={400} height={400} alt="Uploaded Image" />
                    </Paper>
                </Grid>

                <Grid xs></Grid>

                <Grid>
                    <Paper elevation={3} className={classes.contactInfo}>
                        <Typography variant="h5" align="center">
                            Receipt Data
                        </Typography>
                        <Typography variant="h5" align="center">
                            {receiptData.fileName}
                        </Typography>
                        {receiptData.NAME && (
                        <div className={classes.contactInfoItem}>
                           

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                                className={classes.contactInfoIcon}>
                                VENDOR NAME :
                            </Typography>
                            <Typography variant="subtitle1" sx={{ ml: 1 }}>
                                {receiptData.NAME}
                            </Typography>
                            
                        </div>
                        )}
                        
                        {receiptData.VENDER_PHONE && (
                        <div className={classes.contactInfoItem}>
                            <Phone />
                            <Typography variant="subtitle1" sx={{ ml: 2 }}>
                                {receiptData.VENDER_PHONE}
                            </Typography>
                        </div>
                        )}
                         {receiptData.DATE && (
                        <div className={classes.contactInfoItem}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                                className={classes.contactInfoIcon}>
                                DATE :
                            </Typography>
                            <Typography variant="subtitle1" sx={{ ml: 2 }}>

                                {receiptData.DATE}
                            </Typography>
                        </div>
                         )}
                          {receiptData.TOTAL && (
                        <div className={classes.contactInfoItem}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                                className={classes.contactInfoIcon}>
                                TOTAL SPENT :
                            </Typography>
                            <Typography variant="subtitle1" sx={{ ml: 2 }}>

                                {receiptData.TOTAL}
                            </Typography>
                        </div>
                          )}
                           {receiptData.DISCOUNT && (
                        <div className={classes.contactInfoItem}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                                className={classes.contactInfoIcon}>
                                TOTAL SAVED :
                            </Typography>
                            <Typography variant="subtitle1" sx={{ ml: 2 }}>

                                {receiptData.DISCOUNT}
                            </Typography>
                        </div>
                           )}
                            {receiptData.TAX && (
                        <div className={classes.contactInfoItem}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                                className={classes.contactInfoIcon}>
                                TAX PAID :
                            </Typography>
                            <Typography variant="subtitle1" sx={{ ml: 2 }}>

                                {receiptData.TAX}
                            </Typography>
                        </div>
                            )}
                        <div className={classes.contactInfoItem}>
                            <Business />
                            <Typography variant="subtitle1" sx={{ ml: 2 }}>
                                {/* {receiptData.ADDRESS + " " + receiptData.CITY + " " + receiptData.STATE + " " + receiptData.ZIP_CODE */}
                                {receiptData.ADDRESS}
                            </Typography>
                        </div>

                    </Paper>
                </Grid>

                
                <Grid xs></Grid>
                <Grid>
                    <Paper elevation={3} className={classes.contactInfo}>
                        <div className={classes.contactInfoItem}>


                            <div>
                                {receiptData.items.map((item,index) =>
                                <div>
                                    <Typography sx={{ fontWeight: "bold" }}>Item {index+1}</Typography>
                                    {Object.keys(item).map((key, index) =><p>{key + " - " + item[key]}</p>)}
                                    </div>
                                    
                                    
                                

                                   


                                )}
                            </div>


                        </div>
                    </Paper>
                </Grid>

            </Grid>

        </Container>
    );
};

export default DataAnalysisResultComponent;

