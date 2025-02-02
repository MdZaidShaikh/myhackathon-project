class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:zaid@localhost/Conuhacks'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'your_secret_key'
    EMAIL_HOST = 'smtp.example.com'
    EMAIL_PORT = 587
    EMAIL_USER = 'your_email@example.com'
    EMAIL_PASS = 'your_email_password'
    GOOGLE_CLIENT_ID = 'your_google_client_id'
    GOOGLE_CLIENT_SECRET = 'your_google_client_secret'
    FACEBOOK_CLIENT_ID = 'your_facebook_client_id'
    FACEBOOK_CLIENT_SECRET = 'your_facebook_client_secret'
    APPLE_CLIENT_ID = 'your_apple_client_id'
    APPLE_CLIENT_SECRET = 'your_apple_client_secret'