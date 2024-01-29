import json
import boto3
import base64
import os

BUCKET_NAME =os.environ['BUCKET_NAME']
def lambda_handler(event, context):
    print(event)
    encoded_data = event['imageData']
    # bucket = event['bucket']
    userEmail = event['userEmail']
    file_name = event['file_name']
    
    if("data" in encoded_data):
        encoded_data = encoded_data.split(",")[1]

    
    #decode base64 string data
    decoded_data=base64.b64decode((encoded_data))
    
    file_name = userEmail+"/"+file_name
    
    
    s3 = boto3.resource('s3')
    obj = s3.Object(BUCKET_NAME,file_name)
    obj.put(Body=base64.b64decode(encoded_data))
    
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully stored.')
    }
