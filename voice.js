// Set your app credentials
const credentials = {
    apiKey: 'your_api_key',
    username: 'your_username'
}

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the voice service
const voice = AfricasTalking.VOICE;

function makeCall() {
    const options = {
        // Set your Africa's Talking phone number in international format
        callFrom: '+254730731516',
        // Set the numbers you want to call to in a comma-separated list
        callTo: ['+254705493320']
       
    }

    // Customize the voice response using XML
    const voiceResponse = `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <Say voice="en-US-Standard-C" playBeep="false">Your balance is 1234 Shillings</Say>
        </Response>`;

    // Make the call with the custom voice response
    options.media = voiceResponse;
   
    // Make the call
    voice.call(options)
        .then(console.log)
        .catch(console.log);
}

makeCall();
