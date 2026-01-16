import csv
import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# Securely load credentials from config.json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Navigate up to find config.json in the backend root
CONFIG_PATH = os.path.join(BASE_DIR,'config.json')

def get_email_credentials():
    """Loads email settings from the central config file."""
    try:
        with open(CONFIG_PATH) as f:
            config = json.load(f)
        return config.get("SENDER_EMAIL"), config.get("SENDER_PASSWORD")
    except Exception as e:
        print(f"CRITICAL: Could not load email config: {e}")
        return None, None

def generate_csv_report(user_email, holdings):
    """File Saver: Generates a clean text-only CSV for professional reporting."""
    report_dir = "reports"
    if not os.path.exists(report_dir):
        os.makedirs(report_dir)
        
    filename = f"Report_{user_email}.csv"
    filepath = os.path.join(report_dir, filename)
    
    # Text keys only to ensure Excel compatibility
    keys = ["coin", "amount", "live_price", "status"]
    with open(filepath, "w", newline="", encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        clean_holdings = [{k: h.get(k, "N/A") for k in keys} for h in holdings]
        writer.writerows(clean_holdings)
        
    return filepath

def send_danger_alert(user_email, coin_name):
    """Urgent Professional Alert triggered by AI risk thresholds."""
    sender_email, sender_password = get_email_credentials()
    
    if not sender_email or not sender_password:
        print("Alert skipped: Missing credentials.")
        return

    try:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = user_email
        msg['Subject'] = f"⚠️ ACTION REQUIRED: {coin_name} Risk Threshold Exceeded"

        body = f"""
Urgent Portfolio Update,

Our AI Risk Engine has identified a significant downward trend for {coin_name}. 
The asset has crossed into the 'DANGER' zone based on your purchase price.

Immediate action is recommended:
1. Log in to your CryptoManager AI dashboard.
2. Review your current profit/loss status.
3. Use the AI Strategy Mixer to rebalance your holdings.

Access your account: http://localhost:3000

Securely sent by,
CryptoManager AI Monitoring Service
        """
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print(f"--- Alert Successfully Sent to {user_email} for {coin_name} ---")
    except Exception as e:
        print(f"Email failed: {e}")