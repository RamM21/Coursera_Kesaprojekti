const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function main(params) {
    const nodemailer = require('nodemailer');
    const crypto = require('crypto');
    
    const authenticator = new IamAuthenticator({ apikey: "apikey"})//Your Cloudant database apikey here
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl("URL");//Your Cloudant database service URL here

    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    auth: {
      user: 'email', //Your email needed to send OTP mail to users
      pass: 'password' //Your password or app password
    },
    tls:{
        ciphers:'SSLv3'
    },
    requireTLS:true
  });
  //Checking password from database and deleting it after
    if(params.password){
        let arr = await getPassword(cloudant,"otp")
        arr = JSON.parse(JSON.stringify(arr))
        if(arr.result.length>0){
            for(const x of arr.result){
            if(x.doc.otp==params.password){
                let promise = await getEmail(cloudant,"users",params.email)
                .then(await delPassword(cloudant,"otp",x.id,x.doc._rev))
                return promise
            }
        }
        return {ok:false}
        }else{
            return {ok:false}
        }
    }else{
  //Checking for user and if found send OTP to users email
    let ar = await getEmail(cloudant,"users",params.email)
    let arr = JSON.parse(JSON.stringify(ar))
    if(arr.result.docs.length>0){
        let otp = await getOtp(crypto)
        
        
        await postPassword(cloudant,"otp",otp.otp)
        .then(await sendMail(transporter,arr.result.docs[0],otp.otp))
         
        
        return {ok:true}
    }else{
        return {ok:false}
    }
    }
}
//Making one time password to send to user
function getOtp(crypto){
    return new Promise((resolve, reject) => {
        crypto.generateKey('hmac', { length: 40 }, (err, key) => {
                                  if (err){
                                      reject ({err:err})
                                  }else{ resolve({"otp":key.export().toString('hex')})}
                                });
    })
}
//Sending OTP to users email
function sendMail(transporter,data,otp) {
    console.log(data)
    var mailOptions = {
    from:'email', //Your email here
    to:data.email,
    subject:'One time login password',
    text:'one time login code '+otp
}
     return new Promise((resolve, reject) => {
         transporter.sendMail(mailOptions,function(err,result){
                if(err){
                    reject({ err: err });
                }else{
                    console.log("done1")
                    resolve({done:true})
                }
            })
        })
 }
 //Putting OTP to database to be checked later
function postPassword(cloudant,dbname,document){
     let time = new Date()
     console.log(time.getTime())
     let deltime = time.setTime(time.getTime()+2*60*1000)
     console.log(deltime)
     return new Promise((resolve, reject) => {
         cloudant.postDocument({ db: dbname, document:{"otp":document,"delTime":deltime}})            
             .then((result)=>{
                console.log("done2")
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }
 //Getting passwords from database
 function getPassword(cloudant,dbname){
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
 //Deleting used passwords
 function delPassword(cloudant,dbname,id,rev){
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
 //Getting user emails to check if user exists
 function getEmail(cloudant,dbname,userId) {
     const selector = {
      email: {
        '$eq': userId
      }
    };
    
    const sort = {
      email: 'desc'
    };
     return new Promise((resolve, reject) => {
         cloudant.postFind({ db: dbname, selector:selector,sort:[sort],limit:1,fields:["email","_id"]})            
             .then((result)=>{
               resolve({result:result.result});
             })
             .catch(err => {
                console.log(err);
                reject({ err: err });
             });
         })
 }