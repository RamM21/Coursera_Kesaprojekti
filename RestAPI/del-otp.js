const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

//Delete unused OTP password after specified time
//This action is to be made used by a periodic trigger
async function main(params) {

    const authenticator = new IamAuthenticator({ apikey: "apikey"})//Your Cloudant database apikey here
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl("URL");//Your Cloudant database service URL here
    //Getting old passwords and deleting them if delete time exeeded
    let arr = await getOtp(cloudant,"otp")
        arr = JSON.parse(JSON.stringify(arr))
        for(const x of arr.result){
            let time = new Date().getTime()
            if(x.doc.delTime<=time){
                console.log(x.id)
                await deleteOtp(cloudant,"otp",x.id,x.doc._rev)
            }
        }
    return arr
}
//Deleting old OTP by id
 function deleteOtp(cloudant,dbname,id,rev){
    return new Promise((resolve, reject) => {
        cloudant.deleteDocument({ db: dbname,docId:id,rev:rev})            
             .then((result)=>{
               resolve({result:result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
    }
//Getting passwords to be checked
 function getOtp(cloudant,dbname){
    return new Promise((resolve, reject) => {
         cloudant.postAllDocs({ db: dbname,includeDocs:true})            
             .then((result)=>{
               resolve({result:result.result.rows});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
}