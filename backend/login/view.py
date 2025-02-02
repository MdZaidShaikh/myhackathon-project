from flask import request, jsonify, redirect, url_for
from server import app, google, db
from controller import generate_otp, verify_otp
from models import User
from flask_jwt_extended import create_access_token
import datetime

def generate_token(contact):
    expires = datetime.timedelta(hours=1)
    return create_access_token(identity={'contact': contact}, expires_delta=expires)

@app.route('/request-otp', methods=['POST'])
def request_otp():
    data = request.get_json()
    contact = data.get('contact')
    if not contact:
        return jsonify({'error': 'Phone number or email is required'}), 400
    generate_otp(contact)
    return jsonify({'message': 'OTP sent'}), 200

@app.route('/verify-otp', methods=['POST'])
def verify_otp_endpoint():
    data = request.get_json()
    contact = data.get('contact')
    otp = data.get('otp')
    if not contact or not otp:
        return jsonify({'error': 'Contact and OTP are required'}), 400
    if verify_otp(contact, otp):
        token = generate_token(contact)
        return jsonify({'message': 'OTP verified', 'token': token}), 200
    return jsonify({'error': 'Invalid OTP'}), 401

@app.route('/login/google')
def google_login():
    return google.authorize_redirect(url_for('google_auth', _external=True))

@app.route('/auth/google')
def google_auth():
    token = google.authorize_access_token()
    user_info = google.get('userinfo').json()
    email = user_info['email']
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(email=email, auth_provider='google')
        db.session.add(user)
        db.session.commit()
    jwt_token = generate_token(email)
    return jsonify({'message': 'Google login successful', 'token': jwt_token})
