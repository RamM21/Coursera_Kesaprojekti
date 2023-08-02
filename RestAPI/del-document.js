const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

//Delete files from Cloudant databse
async function main(params) {

    const authenticator = new IamAuthenticator({ apikey: "apikey"})//Your Cloudant database apikey here
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl("URL");//Your Cloudant database service URL here
    //Checking which database document needs to be deleted
    if(params.custom){
        let promise = await delCustom(cloudant,"custom",params.custom)
        return promise
    }else if(params.recipe){
        let promise = await delRecipe(cloudant,"recipes",params.recipe)
        return promise
    }else if(params.review){
        let promise = await delReview(cloudant,"reviews",params.review)
        return promise
    }else{
        let promise = await delTtrpg(cloudant,"dnd",params.ttrpg)
        return promise
    }
}
//Deleting document from custom database
function delCustom(cloudant,dbname,custom) {
    console.log(custom)
     return new Promise((resolve, reject) => {
         cloudant.deleteDocument({ db: dbname, docId:custom.id,rev:custom.rev})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }
 //Deleting document from recipe database
 function delRecipe(cloudant,dbname,recipe) {
     return new Promise((resolve, reject) => {
         cloudant.deleteDocument({ db: dbname, docId:recipe.id, rev:recipe.rev})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }
 //Deleting document from review database
 function delReview(cloudant,dbname,review) {
     return new Promise((resolve, reject) => {
         cloudant.deleteDocument({ db: dbname, docId:review.id, rev:review.rev})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }
 //Deleting document from ttrpg database
 function delTtrpg(cloudant,dbname,ttrpg) {
     return new Promise((resolve, reject) => {
         cloudant.deleteDocument({ db: dbname, docId:ttrpg.id, rev:ttrpg.rev})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }