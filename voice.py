import africastalking

# Initialize the Africa's Talking API
username = "SafeWithUs"  
api_key = "277b32adc1f72b63760191621b4f2e1f16be6c18c2ae4224874890decacc8726"   
africastalking.initialize(username, api_key)

# Create a function to make a call
def make_call(phone_number):
    # Get the voice API instance
    voice = africastalking.Voice

    # Set the phone number to call
    call_params = {
        "to": phone_number,
        "from": "+254705493320",  
        "enqueue": False
    }

    # Make the call
    try:
        call_response = voice.call(call_params)
        print(call_response)
    except Exception as e:
        print(f"Error making call: {e}")

# Call the function with the phone number you want to call
phone_number_to_call = "+254796537064"  
make_call(phone_number_to_call)