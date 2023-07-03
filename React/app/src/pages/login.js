import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import style from './login.module.css'
import {useAlert} from 'react-alert'


export default function Login(props){

    const alert = useAlert()
    const navigate = useNavigate()
    const [email,setEmail]=useState('')
    const [login,setLogin]=useState(false)
    const [otp,setOtp]=useState()
    const [password,setPassword]=useState("")

    function handlelogin(){
        axios.post()
        .then((response)=>{
            if(response.data.ok==false){
                alert.info("No user with email"+email+"found")
            }else{
                alert.success("A login link has been send to your email")
            }
        })
        .catch((err)=>{
            alert.error("error happened try again later")
            console.log(err)
        })
    }

    function handleOtp(){

    }

    useEffect(()=>{
        if(login){
            props.log(true)
            navigate('/')
        }
    })

    
        return (
            
            <div>
                {otp ? <div className={style.passbox}>
                    <h1 className={style.pastitle}>One Time password</h1>
                    <div>
                    <h3 className={style.pastitle2}>Password</h3>
                    <input onChange={(event)=>setPassword(event.target.value)} className={style.pasinput} type='text' />
                    <button onClick={()=>handleOtp()} className={style.pasbutton}>Login</button>
                    </div>
                </div>:<div className={style.box}>
                    <h1 className={style.title}>Login</h1>
                    <div>
                    <h3 className={style.title2}>Email</h3>
                    <input onChange={(event)=>setEmail(event.target.value)} className={style.input} type='text' />
                    <button onClick={()=>handlelogin()} className={style.button}>Login</button>
                    </div>
                </div>
                }
            </div>
        )
}