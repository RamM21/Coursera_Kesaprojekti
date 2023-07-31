const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

//Post new user to database
async function main(params) {
    const authenticator = new IamAuthenticator({ apikey: "apikey"})//Your Cloudant database apikey here
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl("URL");//Your Cloudant database service URL here
    //Check if user with email already exists
    let check = await getUserRecords(cloudant,"users",params.save.email);
    if(check.result.docs.length>0){
        return {"result":{
            "ok":false
        }}
    }else{
        let Promise = postUser(cloudant,"users",params.save)
        return Promise
    }
    
}
//Upload new user to database
function postUser(cloudant,dbname,document) {
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
 //Get user info by email
 function getUserRecords(cloudant,dbname,userId) {
     const selector = {
      email: {
        '$eq': userId
      }
    };
    
    const sort = {
      email: 'desc'
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