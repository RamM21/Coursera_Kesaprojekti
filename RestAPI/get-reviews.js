const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

//get recipe reviews from Cloudant database
async function main(params) {
    const authenticator = new IamAuthenticator({ apikey: "apikey"})//Your Cloudant database apikey here
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl("URL");//Your Cloudant database service URL here

    if(params.recipeId){
        let dbListPromise = getRecipeReviews(cloudant,"reviews",params.recipeId);
        return dbListPromise;
    }else if(params.userId){
        let dbListPromise = getUserReviews(cloudant,"reviews",params.userId);
        return dbListPromise;
    }else{
        let dbListPromise = getAllRecords(cloudant,"reviews");
        return dbListPromise;
    }
}
//Gets all reviews in database
function getAllRecords(cloudant,dbname) {
     return new Promise((resolve, reject) => {
         cloudant.postAllDocs({ db: dbname, includeDocs: true,attachments:true})            
             .then((result)=>{
               resolve({result:result.result.rows});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }
//Gets specified reviews made by user by useer id
function getUserReviews(cloudant,dbname,userId) {
     const selector = {
      userId: {
        '$eq': userId
      }
    };
    
    const sort = {
      userId: 'desc'
    };
     return new Promise((resolve, reject) => {
         cloudant.postFind({ db: dbname, selector:selector,sort:[sort]})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }
//Gets reviews by recipe id
 function getRecipeReviews(cloudant,dbname,userId) {
     const selector = {
      recipe: {
        '$eq': userId
      }
    };
    
    const sort = {
      recipe: 'desc'
    };
     return new Promise((resolve, reject) => {
         cloudant.postFind({ db: dbname, selector:selector,sort:[sort]})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }