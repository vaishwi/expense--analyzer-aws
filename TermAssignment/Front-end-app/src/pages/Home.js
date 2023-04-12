import * as React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import DataAnalysisResultComponent from './DataAnalysisResultComponent';
import Logout from './Logout';


const APP_LINK = process.env.REACT_APP_API_LINK
// const S3_UPLOAD_URL = APP_LINK + "uploadimage"
const S3_UPLOAD_URL = APP_LINK + process.env.REACT_APP_S3_UPLOAD_PATH
// const RECEIPT_ANALYZE_URL = APP_LINK + "analyzereceipt"
const RECEIPT_ANALYZE_URL = APP_LINK + process.env.REACT_APP_RECEIPT_ANALYZE_PATH

const jwtToken = localStorage.getItem("jwtToken")

export default function Home() {

    const userEmail = localStorage.getItem("userEmail")
    const navigate = useNavigate()
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [imageUploadData, setImageUploadData] = useState(null)
    const [dataToAnalyze, setDataToAnalyze] = useState(null)
    const [analyzedReceiptData, setAnalyzedReceiptData] = useState(null)
    const [processMessage, setProcessMessage] = useState("")

    const [postImage, setPostImage] = useState({
        myFile: "",
    });

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        console.log(file)
        setImage(file);
        setImageName(file.name)
        const base64 = await convertToBase64(file);

        setPostImage({ ...postImage, myFile: base64 });
    };

    const uploadImagetoS3 = async (imageUploadData) => {

        console.log("In upload Image to s3")
        setProcessMessage("Uploading image to server....")
        await axios({
            url: S3_UPLOAD_URL,
            method: "POST",
            headers:{
                authorization:jwtToken
            },
            data: imageUploadData
        })
            // Handle the response from backend here
            .then((res) => {
                console.log("Image uploaded.")
                console.log(res)

                if (res.data.statusCode === 200) {
                    setProcessMessage("Successfully Uploaded Image. Analyzing image.....")
                    const data = {
                        
                        "file_name": imageName,
                        "userEmail": userEmail
                    }

                    analyzereceipt(data)
                }
                return res
            })
    }

    const analyzereceipt = (dataToAnalyze) => {

        console.log("In analyze receipt")

        axios({
            url: RECEIPT_ANALYZE_URL,
            method: "POST",
            headers:{
                authorization:jwtToken
            },
            data: dataToAnalyze
        }).then((res) => {
            console.log(res.data)
            const data = res.data
            data.image = postImage.myFile.split(",")[1]
            data.fileName = imageName
            setAnalyzedReceiptData(res.data)
            setProcessMessage("")
            return res.data
        })
    }

    const uploadImage = (event) => {
        console.log("in upload image")
        event.preventDefault();
        console.log(imageName)
        // console.log(postImage.myFile)

        const base64Image = postImage.myFile.split(",")[1]


        const upload_data = {
            imageData: base64Image,
            
            userEmail: userEmail,
            file_name: imageName
        }

        const data = {
            
            "file_name": imageName,
            "userEmail": userEmail
        }


        console.log(upload_data)
        setImageUploadData(upload_data)
        console.log(imageUploadData)

        setDataToAnalyze(data)

        const uploadResponse = uploadImagetoS3(upload_data)
        console.log("Return")
        console.log(uploadResponse)


    }



    return (<div>
        <Typography component="h1" variant="h3"
        >Expense Analyzer
        </Typography>

        <Box
            m={1}
            //margin
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
        // sx={boxDefault}
        >
            <Button variant="contained" color="primary" sx={{ height: 40 }} onClick={() => navigate("/receiptlist")}>
                History
            </Button>
        </Box>
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


        <div className="component" sx={{ mt: 20 }}>

            {/* <label htmlFor="input-text">Input image:</label> */}
            <Typography component="h1" variant="h4" sx={{ mb: 5 }}>Select Receipt</Typography>
            <form onSubmit={(event) => uploadImage(event)}>
                <input type="file" id="image-input" onChange={handleImage} />
                {/* <button>
              Upload
            </button> */}
                <Button variant="contained" color="primary" sx={{ height: 40 }} onClick={(event) => uploadImage(event)}>
                    Upload and Analyze
                </Button>
            </form>
        </div>
        <div>
            <Typography component="h2" variant="h5" >
                {processMessage}
            </Typography>
            {/* <input type="file" onChange={handleImageUpload} /> */}
            {image && (
                <div>
                    {/* <img src={URL.createObjectURL(image)} width={250} height={250} alt="Uploaded Image" /> */}
                   
                    {/* /<img src={postImage.myFile} width={250} height={250} alt="Uploaded Image" /> */}

                    {console.log(analyzedReceiptData)}
                    {analyzedReceiptData &&
                        <div>
                            <DataAnalysisResultComponent data={analyzedReceiptData} />

                        </div>
                    }

                </div>
            )}
        </div>
    </div>)
}