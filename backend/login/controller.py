import pyotp
import smtplib
from email.mime.text import MIMEText
from server import app, db
from models import User

def generate_otp(contact):
    user = User.query.filter((User.phone == contact) | (User.email == contact)).first()
    if not user:
        user = User(phone=contact if '@' not in contact else None, email=contact if '@' in contact else None)
        # db.session.add(user)
        # db.session.commit()
    totp = pyotp.TOTP(user.otp_secret)
    otp = totp.now()
    print(f"OTP for {contact}: {otp}")  # In real-world, send OTP via SMS or Email
    if '@' in contact:
        send_email_otp(contact, otp)
    return otp

def verify_otp(contact, otp):
    user = User.query.filter((User.phone == contact) | (User.email == contact)).first()
    if not user:
        return False
    totp = pyotp.TOTP(user.otp_secret)
    return totp.verify(otp)

def send_email_otp(email, otp):
    msg = MIMEText(f"Your OTP is: {otp}")
    msg['Subject'] = 'Your OTP Code'
    msg['From'] = app.config['EMAIL_USER']
    msg['To'] = email

    try:
        server = smtplib.SMTP(app.config['EMAIL_HOST'], app.config['EMAIL_PORT'])
        server.starttls()
        server.login(app.config['EMAIL_USER'], app.config['EMAIL_PASS'])
        server.sendmail(app.config['EMAIL_USER'], email, msg.as_string())
        server.quit()
    except Exception as e:
        print(f"Error sending email: {e}")