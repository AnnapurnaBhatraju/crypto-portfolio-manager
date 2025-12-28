# email_alert.py

import smtplib
from email.message import EmailMessage


def send_risk_alert_email(user_email, coin_name, risk_status):
    """
    Sends email alert if risk status is Danger
    """

    if risk_status != "Danger":
        return

    msg = EmailMessage()
    msg["Subject"] = f"🔴 Risk Alert: {coin_name}"
    msg["From"] = "your_email@gmail.com"   # replace later
    msg["To"] = user_email

    msg.set_content(
        f"""
        Alert!

        The asset {coin_name} has entered DANGER zone.

        Risk Status: {risk_status}

        Please review your portfolio immediately.
        """
    )

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login("your_email@gmail.com", "your_app_password")  # replace later
            server.send_message(msg)
            print("Alert email sent successfully")

    except Exception as e:
        print("Error sending email:", e)
