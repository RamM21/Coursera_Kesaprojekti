import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar'
import style from './signup.module.css'


export default function Signup(){
    
    const navigate = useNavigate()
    const[email,setEmail]=useState('')
    const[name,setName]=useState('')
    const[done,setDone]=useState(false)
    
    function handlesingup(){
        console.log(email+" "+name)
        setDone(true)
    }

    useEffect(()=>{
        if(done){
            navigate("/login")
        }
    })

        return (
            <div>
                <Navbar />
                <div className={style.box}>
                    <form>
                        <h1 className={style.title}>Sign up</h1>
                        <div>
                        <h3 className={style.title2}>Email</h3>
                        <input onChange={(event)=>setEmail(event.target.value)} className={style.input}/>
                        <h3 className={style.title2}>Name</h3>
                        <input onChange={(event)=>setName(event.target.value)} className={style.input}/>
                        </div>
                        <button onClick={()=>handlesingup()} className={style.but}>Sign up</button>
                    </form>
                </div>
            </div>
        )
}