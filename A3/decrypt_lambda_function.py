import json

from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
import base64

def lambda_handler(event, context):
    print(event)
    message = event["message"]
    message =base64.b64decode(message)
    f1 = open('private_key.txt', 'rb')
    private_key = f1.read()
    RSAprivateKey = RSA.importKey(private_key)
    
    OAEP_cipher = PKCS1_OAEP.new(RSAprivateKey)
    decryptedMsg = OAEP_cipher.decrypt(message)
    
    print('The original text:', decryptedMsg)
    
    return {"response": decryptedMsg.decode()}

