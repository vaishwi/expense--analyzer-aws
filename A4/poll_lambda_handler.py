import json
import boto3

CONNECT_QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/162716223729/CONNECT"
PUBLISH_QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/162716223729/PUBLISH"
SUBSCRIBE_QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/162716223729/SUBSCRIBE" 
'''
Resourses I reffered: 
https://awstip.com/using-a-lambda-trigger-to-send-a-message-to-sqs-1db1090d5ba8
https://boto3.amazonaws.com/v1/documentation/api/latest/guide/sqs-example-sending-receiving-msgs.html
https://docs.aws.amazon.com/step-functions/latest/dg/tutorial-api-gateway.html

'''

def receiveAndDeleteMessage(sqs,queue_url):
    response = sqs.receive_message(
    QueueUrl=queue_url,
    AttributeNames=[
        'SentTimestamp'
    ],
    MaxNumberOfMessages=1,
    MessageAttributeNames=[
        'All'
    ],
    VisibilityTimeout=0,
    WaitTimeSeconds=20
    )
    print(response)
    message =""
    message = response['Messages'][0]
    receipt_handle = message['ReceiptHandle']
    
    # Delete received message from queue
    sqs.delete_message(
        QueueUrl=queue_url,
        ReceiptHandle=receipt_handle
    )
    print(message)
    return json.loads(message['Body'])
    

def lambda_handler(event, context):

    sqs = boto3.client('sqs')
    print(event)
    print(type(event['type']))
    if(event['type'] == "CONNECT"):
        print("in connect")
        queue_url = CONNECT_QUEUE_URL
        message = receiveAndDeleteMessage(sqs,queue_url)
        response = {"type": "CONNACK",
              "returnCode": 0,
              "username": message['username'],
              "password": message['password']
            }
    elif(event['type'] == "PUBLISH"):
        print("in publish")
        queue_url = PUBLISH_QUEUE_URL
        message = receiveAndDeleteMessage(sqs,queue_url)
        
        response = {
                "type": "PUBACK", 
                "returnCode": message['qos'], 
                "payload": message['payload']
                }
                
    elif(event['type'] == "SUBSCRIBE"):
        print("In subscribe")
        queue_url = SUBSCRIBE_QUEUE_URL
        message = receiveAndDeleteMessage(sqs,queue_url)
        response  =  {
              "type": "SUBACK",
              "returnCode":message['qos']
            }
    
    return response
