import { CognitoUserPool } from "amazon-cognito-identity-js";

// const poolData = {
//     UserPoolId : "us-east-1_FjbPch0mq",
//     ClientId: "18rkn8elq63bur8p3n23pmopqb"
// }

const poolData ={
    UserPoolId: process.env.REACT_APP_USERPOOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID
}

export default new CognitoUserPool(poolData)