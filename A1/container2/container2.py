from flask import Flask
from flask import request
import hashlib
import pathlib
import os

app = Flask(__name__)
basePath = "/sharedFiles/"
@app.route('/checksum', methods = ['POST'])
def checksum():
    
    fileName = request.data.decode()
    response = {}
    response["file"] = fileName
    
    if (os.path.exists(basePath+fileName)):
        
        md5Checksum = hashlib.md5(open(basePath+fileName,'rb').read()).hexdigest()
        response["checksum"] = md5Checksum
        
    else:
        response ["error"] = "File Not Found."
        
    return response

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9000)
