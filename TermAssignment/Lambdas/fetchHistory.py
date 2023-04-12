import json
import base64
import boto3
import os

dyn_client = boto3.client('dynamodb')

# TABLE_NAME = "receipt_extraction_data"
# BUCKET_NAME = "expense-project"
TABLE_NAME = os.environ['TABLE_NAME']
BUCKET_NAME =os.environ['BUCKET_NAME']

def convert_dynamoStrDict_to_dict(dynamoDict):
  responseDict = {}
  
  for key in dynamoDict.keys():
      responseDict[key] = dynamoDict[key]['S']
  return responseDict

def get_base64_image_data_from_s3(fileName):
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(BUCKET_NAME)
    obj = bucket.Object(key = fileName)      #pass your image Name to key
    response = obj.get()     #get Response
    img = response[u'Body'].read()        # Read the respone, you can also print it.
    #print(type(img))                      # Just getting type.
    myObj = [base64.b64encode(img)] 
    print(myObj)
    return myObj

def convert_dynamoData_str(history_records):
    output_records = []
    for record in history_records:
      items = record['Items']['L']
      newItems = []  
      for item in items:
        item = item['M']
        newItems.append(convert_dynamoStrDict_to_dict(item))
    
      record.pop('Items')
      print(record)
      responseDict = convert_dynamoStrDict_to_dict(record)
      responseDict['items'] = newItems
      print(responseDict)
      responseDict['image'] = get_base64_image_data_from_s3(responseDict['fileName'])
      responseDict['fileName'] = responseDict['fileName'].split("/")[1]
      print(responseDict)
      output_records.append(responseDict)
    return output_records



def getHistoryFromDatabase(userEmail):
    
    history = dyn_client.scan(TableName=TABLE_NAME, FilterExpression='userEmail = :userEmail',
                            ExpressionAttributeValues={
                                ':userEmail': {'S': userEmail}
                            })

    return history

def lambda_handler(event, context):
    # TODO implement
    userEmail = event["userEmail"]
    history = getHistoryFromDatabase(userEmail)
    print(history)
    
    if(history['Count']==0):
        response = []
    else:
        history_records = history['Items']
        response = convert_dynamoData_str(history_records)
    
    return {
        'statusCode': 200,
        'history': response
    }