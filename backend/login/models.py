from server import db
import pyotp

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(15), unique=True, nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=True)
    otp_secret = db.Column(db.String(16), nullable=False, default=lambda: pyotp.random_base32())
    is_verified = db.Column(db.Boolean, default=False)
    auth_provider = db.Column(db.String(50), nullable=True)