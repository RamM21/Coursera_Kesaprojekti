import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import style from './login.module.css'
import {useAlert} from 'react-alert'


export default function Login(props){

    const alert = useAlert()
    const navigate = useNavigate()
    const [email,setEmail]=useState('')
    const [login,setLogin]=useState(false)
    const [otp,setOtp]=useState(false)
    const [password,setPassword]=useState("")

    //Sending email to be checked and if found change to get one time password
    function handlelogin(){
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/login.json?email="+email)
        .then((response)=>{
            if(response.data.ok===false){
                alert.info("No user with email"+email+"found")
            }else{
                alert.success("A login link has been send to your email")
                setOtp(true)
            }
        })
        .catch((err)=>{
            alert.error("error happened try again later")
            console.log(err)
        })
    }
    //Sending one time password and if correct handle login change and storage users id and email
    async function handleOtp(){
        let document={
            email:email,
            password:password
        }
        await axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/login.json",document)
        .then((response)=>{
            if(response.data.ok===false){
                alert.info("Wrong password try again")
            }else{
                alert.success("login successfull")
                sessionStorage.setItem("user",response.data.result.docs[0].email)
                sessionStorage.setItem("id",response.data.result.docs[0]._id)
                setEmail("")
                setPassword("")
                setTimeout(()=>{
                    setLogin(true)
                },2000)
            }
        })
        .catch((err)=>{
            alert.error("error happened try again later")
            console.log(err)
        })
    }
    //If login is successful redirect user to main page
    useEffect(()=>{
        if(login){
            props.log(true)
            navigate('/')
        }
    },[login,navigate,props])

    
        return (
            
            <div>
                {otp ? <div className={style.passbox}>
                    <h1 className={style.pastitle}>One Time password</h1>
                    <div>
                    <h3 className={style.pastitle2}>Password</h3>
                    <input onChange={(event)=>setPassword(event.target.value)} value={password} className={style.pasinput} type='text' />
                    <button onClick={()=>handleOtp()} className={style.pasbutton}>Login</button>
                    <button onClick={()=>handlelogin()} className={style.newotpBut}>Send new one time password</button>
                    </div>
                </div>:<div className={style.box}>
                    <h1 className={style.title}>Login</h1>
                    <div>
                    <h3 className={style.title2}>Email</h3>
                    <input onChange={(event)=>setEmail(event.target.value)} value={email} className={style.input} type='text' />
                    <button onClick={()=>handlelogin()} className={style.button}>Login</button>
                    </div>
                </div>
                }
            </div>
        )
}