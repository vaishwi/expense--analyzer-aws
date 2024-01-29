# Expense Analyzer: Analyze Your Spending with Ease on AWS

## 1. Introduction

Expense Analyzer is your personal assistant for mastering your finances on the cloud. Built on the robust foundation of Amazon Web Services (AWS), Expense Analyzer empowers you to track expenses, gain valuable insights from receipts, and optimize your spending habits. This document delves deep into the technology and architecture powering this powerful platform.

## 2. Technologies

### Compute Engines:

- **EC2**: Offers flexibility and customization for deploying the front-end application.
- **AWS Lambda**: Enables serverless backend processes, allowing you to focus on core logic.

### Storage Solutions:

- **S3**: Provides unlimited space for receipt images (up to 5TB each) with organized structure.
- **DynamoDB**: Handles the diverse data extracted from receipts with its NoSQL flexibility.

### Networking:

- **API Gateway**: Connects Lambda functions and the front-end with secure and scalable APIs.

### Utility Services:

- **Amazon Textract**: Analyzes receipts for expense information tailored for expense tracking.
- **Amazon Cognito**: Provides secure user authentication and sign-in.

## 3. Deployment Model

- **Hybrid Cloud**: Combines cost-effectiveness of public cloud with enhanced security of community cloud for user information.
- **Current Deployment**: Leverages public cloud while ensuring data security through S3, DynamoDB, and backend API protection with JWT tokens.

## 4. Delivery Model

- **Software as a Service (SaaS)**: Access Expense Analyzer anytime, anywhere, without downloads or subscriptions.
- **Infrastructure as a Service (IaaS)**: EC2 provides virtualized resources for the front-end.
- **Function as a Service (FaaS)**: AWS Lambda handles backend processes without infrastructure management.

## 5. Architecture

- **Public URL**: Entry point provided by EC2.
- **Cognito**: Manages user authentication and JWT token generation.
- **API Gateway**: Routes requests to relevant Lambda functions.
- **S3Upload Lambda**: Uploads receipt images to S3.
- **Analyzereceipt Lambda**: Analyzes images with Textract and stores extracted data in DynamoDB.
- **Fetchhistory Lambda**: Retrieves past images and data from S3 and DynamoDB.

## 6. Data Storage

- **S3**: Stores receipt images with organized structure.
- **DynamoDB**: Stores extracted data with flexibility for varying information.

## 7. Programming Languages

- **Python**: Used for Lambda functions interacting with AWS services and Textract.
- **Shell Script**: Manages EC2 configuration, environment variables, and server startup.
- **React Js**: Front-end framework for fast and easy development.
- **YAML**: CloudFormation template scripting language.

## 8. System Deployment

- **Front-End**: Deployed on EC2 instance.
- **Backend**: Lambda functions and API Gateway endpoints for access.

## 9. Security

- **Compute Layer**: Secured with IAM groups and developer roles for EC2 access control.
- **Network Layer**: Secured through API Gateway with JWT token authorization.
- **Database Layer**: S3 bucket requires private access, VPC and subnets used for private data storage, Lambda functions and IAM manage resource access.

## 10. Future Plans

- Enhance security measures across all layers.
- Implement additional features like receipt categorization and expense tracking visualizations.
- Explore potential migration to private cloud based on user base and data sensitivity.

## 11. Monitoring

- CloudWatch used to monitor EC2 and API Gateway performance for cost control and optimization.
- Additional monitoring for other services to stay within budget.


## Setup

### Prerequisites

- Node.js and npm for React JS development.
- Python for the backend.
- AWS account with the necessary services provisioned.

