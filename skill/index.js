/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const WebHookClient = require('webhookclient');

const LaunchHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {

    return handlerInput.responseBuilder
      .speak('Benvenuto nella vetrina intelligente. Chiedimi cosa visualizzare.')
      .reprompt('Cosa posso fare per te?')
      .getResponse();
  },
};

const OpenWebPageHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'OpenWebPageIntent';
  },
  async handle(handlerInput) {
    
    let url = handlerInput.requestEnvelope.request.intent.slots.urlWeb.value;
    
    await WebHookClient.openWebPage(url);
    
    const speechOutput = 'OK!'; 

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Mi puoi chiedere di aprire una pagina web per te. Prova chiedendo "Apri la pagina web ", seguito dall\'indirizzo web da aprire.')
      .reprompt('Sono ancora qui, come posso aiutarti?')
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('A presto!')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Mi dispiace, non ci sono riuscita.')
      .reprompt('Mi dispiace, non ci sono riuscita.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchHandler,
    OpenWebPageHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
