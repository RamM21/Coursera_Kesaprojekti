import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import style from './login.module.css'


export default function Login(){
    
        const[email,setEmail]=useState('')

    function login(){
        sessionStorage.setItem("user",email)
    }

    
        return (
            <div>
                <Navbar />
                <div className={style.box}>
                    <h1 className={style.title}>Login</h1>
                    <div>
                    <h3 className={style.title2}>Email</h3>
                    <input onChange={(event)=>setEmail(event.target.value)} className={style.input} type='text' />
                    <Link className={style.link} to='/'><button onClick={()=>login()} className={style.button}>Login</button></Link>
                    </div>
                </div>
            </div>
        )
}