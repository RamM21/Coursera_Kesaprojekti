import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import style from './signup.module.css'


export default function signup(){
    
    const[email,setEmail]=useState('')

    function handlesingup(){
        sessionStorage.setItem("user",email)
    }

        return (
            <div>
                <Navbar />
                <div className={style.box}>
                    <form>
                        <h1 className={style.title}>Sign up</h1>
                        <div>
                        <h3 className={style.title2}>Email</h3>
                        <input onChange={(event)=>{()=>setEmail(event.target.value)}} className={style.input}/>

                        </div>
                        <Link className={style.link}><button >Sign up</button></Link>
                    </form>
                </div>
            </div>
        )
}