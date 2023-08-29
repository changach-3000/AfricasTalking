// Set your Africa's Talking API credentials
const credentials = {
    apiKey: 'your_api_key',
    username: 'your_username'
};

const AfricasTalking = require('africastalking')(credentials);
const voice = AfricasTalking.VOICE;

// Initialize the SDK
// AfricasTalking.initialize(credentials);

// Import the Google Text-to-Speech API client library and other required modules
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

// Set up the Google Text-to-Speech client
const ttsClient = new textToSpeech.TextToSpeechClient();

async function makeCall() {
    const options = {
        callFrom: '+254730731516',
        callTo: ['+254705493320']
    };

    // Generate a custom voice message using Google Text-to-Speech API
    const text = 'Your balance is 1234 Shillings. Have a great day!';
    const ttsRequest = {
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    try {
        const [ttsResponse] = await ttsClient.synthesizeSpeech(ttsRequest);
        const audioFile = 'custom_voice.mp3';

        // Save the audio file locally
        fs.writeFileSync(audioFile, ttsResponse.audioContent);

        // Set the audio file URL as the media for the call
        options.media = `https://your-website.com/${audioFile}`;

        // Make the call with the custom voice message
        const callResponse = await voice.call(options);
        console.log(callResponse);
    } catch (error) {
        console.error('Error making call:', error);
    }
}


makeCall();
