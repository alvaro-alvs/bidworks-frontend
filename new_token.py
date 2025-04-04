import string
import random

def generate_password(length):
    chars = string.ascii_letters + string.digits + '!@#$%^&*()'
    return ''.join(random.choice(chars) for _ in range(length))

if __name__ == '__main__':
    password = generate_password(12)
    print(password)

