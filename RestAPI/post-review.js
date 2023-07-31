const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

//Post document to review database
async function main(params) {
    const authenticator = new IamAuthenticator({ apikey: "apikey"})//Your Cloudant database apikey here
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl("URL");//Your Cloudant database service URL here

    let Promise = await postRecipe(cloudant,"reviews",params.save);
    return Promise
    
}
//Upload document to database
function postRecipe(cloudant,dbname,document) {
     return new Promise((resolve, reject) => {
         cloudant.postDocument({ db: dbname, document:document})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }