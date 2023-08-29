// Import the Africa's Talking SDK
const Africastalking = require('africastalking');

// Initialize the Africa's Talking SDK
const username = "your_username";    // Replace with your Africa's Talking API username
const apiKey = "your_api_key";       // Replace with your Africa's Talking API key
const AT = Africastalking({username: username, apiKey: apiKey});

// Create a function to initiate the voice call for user authorization
function initiateVoiceCall(phoneNumber) {
  // Get the voice instance
  const voice = AT.VOICE;

  // Customize the voice call
  const callOptions = {
    callFrom: "+254730731516", 
    callTo: phoneNumber,
    enqueue: true,
  };

  // Make the voice call
  voice.call(callOptions)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(`Error making voice call: ${error}`);
    });
}


// Sample user authorization process
function authorizeUser(phoneNumber) {
  
  // Initiate the voice call for the user to enter the OTP
  initiateVoiceCall(phoneNumber);
}

// Call the function with the user's phone number for authorization
const phoneNumberToAuthorize = "+254796537064"; 
authorizeUser(phoneNumberToAuthorize);
