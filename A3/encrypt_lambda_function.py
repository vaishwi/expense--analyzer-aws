import json

from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
import base64

def lambda_handler(event, context):
    print(event)
    message = event['message']
    message = str.encode(message)
    f = open('public_key.txt', 'rb')
    public_key = f.read()
    RSApublicKey = RSA.importKey(public_key)
    
    OAEP_cipher = PKCS1_OAEP.new(RSApublicKey)
    encryptedMsg = OAEP_cipher.encrypt(message)
    base64_bytes = base64.b64encode(encryptedMsg)
    
    return {"response": base64_bytes.decode()}
    