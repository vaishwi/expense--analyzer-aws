
from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
import base64

message = "this is a top secret message!"
message = str.encode(message)
f = open('public_key.txt', 'rb')
public_key = f.read()
RSApublicKey = RSA.importKey(public_key)

OAEP_cipher = PKCS1_OAEP.new(RSApublicKey)
encryptedMsg = OAEP_cipher.encrypt(message)
base64_bytes = base64.b64encode(encryptedMsg)

print('Encrypted text:', encryptedMsg)
print(base64_bytes)


base64_message =base64.b64decode(base64_bytes)

f1 = open('private_key.txt', 'rb')
private_key = f1.read()
RSAprivateKey = RSA.importKey(private_key)

OAEP_cipher = PKCS1_OAEP.new(RSAprivateKey)
decryptedMsg = OAEP_cipher.decrypt(base64_message)

print('The original text:', decryptedMsg)


# pip3 install pycrypto -t package
# pip3 install -U PyCryptodome -t package

# pip3 install -U PyCryptodome
# pip install pycrypto
# https://stackoverflow.com/questions/58569361/attributeerror-module-time-has-no-attribute-clock-in-python-3-8
# https://stackabuse.com/encoding-and-decoding-base64-strings-in-python/
# https://www.delftstack.com/howto/python/rsa-encryption-python/#rsa-encryption-in-python-using-cryptographic-padding?utm_content=anc-true