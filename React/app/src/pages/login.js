import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar'
import style from './login.module.css'


export default function Login(props){
        const navigate = useNavigate()
        const[email,setEmail]=useState('')
        const[login,setlogin]=useState(false)
    function handlelogin(){
        if(email!==""){
            sessionStorage.setItem("user",email)
            sessionStorage.setItem("id","2")
            setlogin(true)
        }
    }
    useEffect(()=>{
        if(login){
            props.log(true)
            navigate('/')
        }
    })

    
        return (
            <div>
                <div className={style.box}>
                    <h1 className={style.title}>Login</h1>
                    <div>
                    <h3 className={style.title2}>Email</h3>
                    <input onChange={(event)=>setEmail(event.target.value)} className={style.input} type='text' />
                    <button onClick={()=>handlelogin()} className={style.button}>Login</button>
                    </div>
                </div>
            </div>
        )
}