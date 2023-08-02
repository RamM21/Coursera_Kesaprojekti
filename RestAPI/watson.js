const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
  const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3')
  const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1')
  const { IamAuthenticator } = require('ibm-watson/auth')
  const {Buffer} = require('buffer')
  
//IBM Watson services that are used in frontend
async function main(params) {
    const textToSpeech = new TextToSpeechV1({
      authenticator: new IamAuthenticator({
        apikey: 'apikey', //Text to speech service apikey
      }),
      serviceUrl: 'URL', //Text to speech service URL
    })
    
	const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
      version: '2022-04-07',
      authenticator: new IamAuthenticator({
        apikey: 'apikey', //NaturalLanguageUnderstanding service apikey
      }),
      serviceUrl: 'URL', //NaturalLanguageUnderstanding service URL
    })
    
    const languageTranslator = new LanguageTranslatorV3({
      version: '2018-05-01',
      authenticator: new IamAuthenticator({
        apikey: 'apikey', //Language translator service apikey
      }),
      serviceUrl: 'URL', //Language translator service URL
    })

    //checking which service to be used
    if(params.tTop){
        const synthesizeParams = {
          text: params.tTop.text,
          accept: 'audio/wav',
          voice: 'en-US_AllisonV3Voice'
        }
         let promise = await synthesize(textToSpeech,synthesizeParams,fs)
         return promise
    }else if(params.translate){
        const translateParams = {
          text: params.translate.text,
          modelId: 'en-fi'
        }
        let promise = await translateText(languageTranslator,translateParams)
        return promise
    }else{
    const analyzeParams = {
      'text': params.text,
      'features': {
        'sentiment': {
          'targets': [
            params.text
          ]
        }
      }
    }
    let promise = analyze(naturalLanguageUnderstanding,analyzeParams)
    return promise
    }
}

//Translating given english text to finnish
function translateText(translator,param){
    return new Promise((resolve,reject)=>{
        translator.translate(param)
        .then(response=>{
            resolve({result:response.result.translations})
        })
        .catch(err=>{
            reject({err:err})
        })
    })
}
//Synthesizing speech from given text
function synthesize(synthesizer,param,fs){
    return new Promise((resolve, reject) => {
         synthesizer.synthesize(param)
         .then(response => {
             return synthesizer.repairWavHeaderStream(response.result);
          })
          .then(buffer => {
            fs.writeFileSync('file.wav', buffer)
            const file = path.join(__dirname,"file.wav")
            resolve({result:fs.readFileSync(file)})
          })
          .catch(err => {
            console.log('error:', err)
            reject({err:err})
          });
         })
}
//Analyzing given text and returning either positive,neutral or negative sentiment
function analyze(analyzer,param){
    return new Promise((resolve, reject) => {
         analyzer.analyze(param)            
             .then((result)=>{
               resolve({result:result.result.sentiment.document})
             })
             .catch(err => {
                console.log(err)
                reject({ err: err })
             });
         })
}