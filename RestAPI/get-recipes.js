const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

//get recipe files from Cloudant database
async function main(params) {
    const authenticator = new IamAuthenticator({ apikey: "apikey"})//Your Cloudant database apikey here
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl("URL");//Your Cloudant database service URL here
    
    if(params.userId){
        let dbListPromise = getUserRecords(cloudant,"recipes",params.userId);
        return dbListPromise;
    }else if(params.id){
        let dbListPromise = getRecord(cloudant,"recipes",params.id);
        return dbListPromise;
    }else{
        let dbListPromise = getAllRecords(cloudant,"recipes");
        return dbListPromise;
    }
}

//Gets all recipe files with images attached
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
 //Gets specified recipe with id
 function getRecord(cloudant,dbname,id) {
     return new Promise((resolve, reject) => {
         cloudant.postAllDocs({ db: dbname, includeDocs: true,key:id,attachments:true})            
             .then((result)=>{
               resolve({result:result.result.rows});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }
 //Gets specified users recipe files by user id
 function getUserRecords(cloudant,dbname,userId) {
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
               for(const x of result.result.docs){
                     cloudant.postAllDocs({db:dbname, includeDocs: true,key:x._id,attachments:true})
                     .then((res)=>{
                         x._attachments=res.result.rows[0].doc._attachments
                         resolve({result:result.result});
                     })
                     .catch((err)=>{
                         console.log(err);
                         reject({ err: err });
                     })
                 }
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }