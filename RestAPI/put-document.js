const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

//Update document in database
async function main(params) {
    const authenticator = new IamAuthenticator({ apikey: "apikey"})//Your Cloudant database apikey here
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl("URL");//Your Cloudant database service URL here
    //Check which database document needs to be updated
    if(params.custom){
        let promise = await putCustom(cloudant,"custom",params.id,params.rev,params.custom)
        return promise
    }else if(params.recipe){
        let promise = await putRecipe(cloudant,"recipes",params.id,params.rev,params.recipe)
        return promise
    }else{
        let promise = await putTtrpg(cloudant,"dnd",params.id,params.rev,params.ttrpg)
        return promise
    }
}
//Update custom document in database
function putCustom(cloudant,dbname,id,rev,document) {
     return new Promise((resolve, reject) => {
         cloudant.putDocument({ db: dbname, docId:id,rev:rev, document:document})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }
 //Update recipe document in database
 function putRecipe(cloudant,dbname,id,rev,document) {
     return new Promise((resolve, reject) => {
         cloudant.putDocument({ db: dbname, docId:id, rev:rev, document:document})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }
 //Update ttrpg document in database
 function putTtrpg(cloudant,dbname,id,rev,document) {
     return new Promise((resolve, reject) => {
         cloudant.putDocument({ db: dbname, docId:id, rev:rev, document:document})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }