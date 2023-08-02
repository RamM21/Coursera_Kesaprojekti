import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import style from './signup.module.css'
import {useAlert} from 'react-alert'


export default function Signup(){
    const alert=useAlert()
    const[email,setEmail]=useState('')
    const[name,setName]=useState('')
    const[done,setDone]=useState(false)
    const navigate=useNavigate()
    //Sending email to be checked if exists. If doesn't exist make user with email and name
    async function handlesingup(){
        let document={
            save:{
                email:email,
                name:name
            }
        }
        await axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/post-user.json",document)
        .then((response)=>{
            if(response.data.result.ok===true){
                alert.success("Account made succesfully")
                setTimeout(()=>{
                    setDone(true)
                },5000)
            }else{
                setDone(false)
                alert.error("User with email "+email+" already exists")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //If user creation successful redirect user to login page
    useEffect(()=>{
        if(done){
            alert.show("redirecting to login")
            setTimeout(()=>{
                navigate("/login")
            },5000)
        }
    },[done,alert,navigate])

        return (
            <div>
                <div className={style.box}>
                    <div>
                        <h1 className={style.title}>Sign up</h1>
                        <div>
                        <h3 className={style.title2}>Email</h3>
                        <input onChange={(event)=>setEmail(event.target.value)} className={style.input}/>
                        <h3 className={style.title2}>Name</h3>
                        <input onChange={(event)=>setName(event.target.value)} className={style.input}/>
                        </div>
                        <button onClick={()=>handlesingup()} className={style.but}>Sign up</button>
                    </div>
                </div>
            </div>
        )
}