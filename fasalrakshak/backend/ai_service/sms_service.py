from fastapi import APIRouter, Request, Response, HTTPException
from pydantic import BaseModel
import os
import json
import time
from typing import Optional

# To be replaced with Twilio actual import in production
# from twilio.twiml.messaging_response import MessagingResponse
# from twilio.rest import Client

router = APIRouter()

FARMER_DB = os.path.join("training_data", "farmers_sms.json")

def load_farmers():
    if os.path.exists(FARMER_DB):
        with open(FARMER_DB, 'r') as f:
            return json.load(f)
    return []

def save_farmers(farmers):
    os.makedirs(os.path.dirname(FARMER_DB), exist_ok=True)
    with open(FARMER_DB, 'w') as f:
        json.dump(farmers, f, indent=4)

@router.post("/sms")
async def handle_incoming_sms(request: Request):
    """
    Webhook for Twilio/SMS Provider.
    Expected form data: From, Body
    """
    form_data = await request.form()
    sender = form_data.get("From")
    body = form_data.get("Body", "").strip().upper()

    print(f"Incoming SMS from {sender}: {body}")

    response_text = ""
    
    if body.startswith("REGISTER"):
        # Format: REGISTER <CROP> <LOCATION>
        parts = body.split()
        if len(parts) >= 3:
            crop = parts[1]
            location = " ".join(parts[2:])
            
            farmers = load_farmers()
            # Check for duplicates
            if any(f['phone'] == sender for f in farmers):
                response_text = f"Already Registered! 🌾 You are receiving alerts for {crop} in {location}."
            else:
                farmers.append({
                    "phone": sender,
                    "crop": crop,
                    "location": location,
                    "registeredAt": time.time()
                })
                save_farmers(farmers)
                response_text = f"✅ Success! You are now registered for {crop} alerts in {location}. Happy Farming! 👨‍🌾"
        else:
            response_text = "⚠️ Invalid Format. Please use: REGISTER <CROP> <LOCATION> (e.g. REGISTER WHEAT GUJARAT)"
            
    elif body == "UNREGISTER":
        farmers = load_farmers()
        initial_len = len(farmers)
        farmers = [f for f in farmers if f['phone'] != sender]
        if len(farmers) < initial_len:
            save_farmers(farmers)
            response_text = "❌ You have been successfully unregistered from FasalRakshak Alerts."
        else:
            response_text = "You are not currently registered for alerts."
            
    else:
        response_text = "🙏 Welcome to FasalRakshak! \nTo register for alerts, reply: REGISTER <CROP> <LOCATION> \nTo stop, reply: UNREGISTER"

    # Twilio XML response format
    twiml = f'<?xml version="1.0" encoding="UTF-8"?><Response><Message>{response_text}</Message></Response>'
    return Response(content=twiml, media_type="application/xml")

class AlertRequest(BaseModel):
    crop: str
    location: str
    message: str

@router.post("/send-bulk-alert")
async def send_bulk_alert(alert: AlertRequest):
    """Admin endpoint to trigger personalized alerts to all matching farmers."""
    farmers = load_farmers()
    matching_farmers = [f for f in farmers if f['crop'].upper() == alert.crop.upper() and f['location'].upper() == alert.location.upper()]
    
    # In a real setup, we would loop and call Twilio API here:
    # client = Client(ACCOUNT_SID, AUTH_TOKEN)
    # for f in matching_farmers:
    #     client.messages.create(body=alert.message, from_=VIRTUAL_NUMBER, to=f['phone'])
    
    return {
        "status": "Alert Dispatched",
        "recipients_count": len(matching_farmers),
        "message_preview": alert.message
    }
