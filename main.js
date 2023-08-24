'use strict';
const router = require('express').Router();
const { VoiceHelper } = require('./helper');

let AT_apiKey = "3c7d2f2d591eb61fb420e1a4067cfe6c01d635a448b2dcf0c5827979d42ca90d",
    AT_username = "SafeWithUs",
    AT_virtualNumber = "+254730731516",
    APP_URL ="https://11ce-41-139-168-163.ngrok-free.app" ;

const ATVoice = new VoiceHelper({
    AT_apiKey,
    AT_username,
    AT_virtualNumber,
});
router.get('/', async (req, res) => {
    res.render('keypad.html.ejs');
});



router.post('/callback_url', async (req, res) => {
    try {
        let clientDialedNumber = req.body.clientDialedNumber;
        let callActions, responseAction, redirectUrl, lastRegisteredClient;
        let callerNumber = req.body.callerNumber;
        let destinationNumber = req.body.destinationNumber;

        if (clientDialedNumber) {
            // assumes a browser tried to make a call to either virtualNumber(Dequeue) or a customer number(outgoing call)

            if (clientDialedNumber === AT_virtualNumber) {
                // Browser wants to dequeue a call - ignore this logic for now
            } 
        } else {
            // Here we assume the call is incoming from a customer to the hospital
            // Lead customer to survey form: DTMF
            callActions = ATVoice.survey({
                textPrompt: ` Hello and welcome to Data Junkies Health Care.We would like to use your data to further on health research.If you are willing to accept, press 1, if not, press 2.`,
                finishOnKey: '#',
                timeout: 7,
                callbackUrl: `${APP_URL}/survey`,
            });

            // callActions = ATVoice.converseViaBrowser({
            //     role: 'CUSTOMER_TO_VCC',
            //     lastRegisteredClient: ATVoice.generateATClientName({
            //         firstName: 'browser1',
            //     }),
            //     customerNumber: null,
            // });
        }

        responseAction = `<?xml version="1.0" encoding="UTF-8"?><Response>${callActions}</Response>`;
        console.log({ responseAction });
        return res.send(responseAction);
    } catch (error) {
        console.error({ error });
        return res.sendStatus(500);
    }
});

router.post('/survey', (req, res) => {
    let callActions,
        responseAction,
        done = false,
        pressedKey = req.body.dtmfDigits;
    if (pressedKey === 'undefined') {
        res.end();
    }
    if (!isNaN(pressedKey)) {
        pressedKey = Number(pressedKey);

        console.log(`Pressed ${pressedKey}`);
        if (pressedKey == 1) {
            console.log(`Here pass`);
            let callRepresentativeName = ATVoice.generateATClientName({
                firstName: 'browser1',
            });
            callActions = ATVoice.partialRecord({
                introductionText: `Our doctor is currently seeing another patient. He will attend to you shortly, In the meantime, tell us how you are feeling and then press the hashkey.`,
                audioProcessingUrl: null,
            });
            done = true;
        } else {
            callActions = ATVoice.saySomething({
                speech: 'Sorry, you did not press 1 nor 2. Goodbye.',
            });
            done = true;
        }
    }

    if (!done) {
        callActions = ATVoice.saySomething({
            speech: 'Sorry, you did not press 1 nor 2. Goodbye.',
        });
    }

    console.log(`[post]: for survey`);
    console.log({
        surveyBody: pressedKey,
    });

    responseAction = `<?xml version="1.0" encoding="UTF-8"?><Response>${callActions}</Response>`;
    return res.send(responseAction);
});

module.exports = router;