import secrets
import base64
import string
import random

def generate_password(length):
    chars = string.ascii_letters + string.digits + '!@#$%^&*()'
    return ''.join(random.choice(chars) for _ in range(length))

if __name__ == '__main__':
    password = generate_password(12)
    print(password)

def generate_secret():
    secret_key = base64.b64encode(secrets.token_bytes(64)).decode('utf-8')
    
    return secret_key
