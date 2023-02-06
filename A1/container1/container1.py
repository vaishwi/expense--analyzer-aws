from flask import Flask
from flask import request
import hashlib
import requests
import pathlib
import os

app = Flask(__name__)
basePath = "/sharedFiles/"
@app.route('/checksum', methods = ['POST'])
def checksum():
    content = {}
    response = {}
    try:
        content = request.get_json()
        
    except:
        print("In except")
        response["file"] = None
        response["error"] = "Invalid JSON input."
        return response 

    if ("file" in content.keys()):
        fileName = content['file']
        print(fileName)
        response["file"] = content["file"]
        
        if not fileName:
            response["file"] = None
            response["error"] = "Invalid JSON format."
        
        elif(os.path.exists(basePath+fileName)):
           
            url = "http://container2:9000/checksum" 
            response = requests.post(url, fileName).json()

        else:
            response ["error"] = "File Not Found."
    else :
        print("In else")
        response["file"] = None
        response["error"] = "Invalid JSON input."

    return response

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
