from flask import Flask
from flask import request
import hashlib
import requests
import pathlib
import os
import boto3
from awsconfig import getSession

app = Flask(__name__)
FILE_NAME = 'profData.txt'
BUCKET_NAME = 'csci5409-assignment2'

@app.route('/', methods = ['GET'])
def baseRoute():
    return "HEllo"
@app.route("/start", methods = ['GET'])
def startApp():
    # post to rob's URL
    return "Started"

@app.route('/storedata', methods = ['POST'])
def storeDataToS3():
    content = {}
    response = {}
    try:
        content = request.get_json()
    except:
        print("In except")
        response["error"] = "Invalid JSON input."
        return response
    
    session = getSession()
    s3 = session.client("s3")
    
    f = open("profData.txt", "w")
    f.write(content["data"])
    f.close()
    
    s3.upload_file(
        Filename = "./"+FILE_NAME,
        Bucket = BUCKET_NAME,
        Key = FILE_NAME,
    )
    # https://csci5409-assignment2.s3.amazonaws.com/profData.txt
    s3uri = "https://"+BUCKET_NAME+".s3.amazonaws.com/"+FILE_NAME
    
    return {"statuscode":200,"s3uri": s3uri}
    
@app.route("/appenddata", methods = ["POST"])
def appenddataToS3File():

    content = {}
    response = {}
    try:
        content = request.get_json()
    except:
        print("In except")
        response["error"] = "Invalid JSON input."
        return response

    session = getSession()
    appendData = content['data']

    s3 = session.resource("s3")
    fileObject = s3.Object(BUCKET_NAME,FILE_NAME)
    data = fileObject.get()['Body'].read()
    data = data.decode("utf-8")
    newData = data + appendData

    f = open("profData.txt", "a")
    f.write(appendData)
    f.close()
    s3 = session.client("s3")
    s3.upload_file(
        Filename = "./"+FILE_NAME,
        Bucket = BUCKET_NAME,
        Key = FILE_NAME,
    )

    response = {"statuscode":200}
    
    return response

@app.route("/deletefile", methods = ["POST"])
def deleteS3File():

    content = {}
    response = {}
    try:
        content = request.get_json()
    except:
        print("In except")
        response["error"] = "Invalid JSON input."
        return response

    session = getSession()

    fileURL = content['s3uri']
    s3 = session.resource('s3')
    fileName = fileURL.split("/")[-1]
    s3.Object(BUCKET_NAME, fileName).delete()

    return "Delete file"
    
# https://csci5409-assignment2.s3.amazonaws.com/profData.txt

# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=80)