import React, { useState } from 'react'
import axios from 'axios'
import { Link,useLocation } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import pic from '../logo512.png'
import style from './newcustom.module.css'

export default function Custom(){
    
    const [title,setTitle]=useState('')
    const [text,setText]=useState('')
    const [file,setFile]=useState()
    
    function handleImage(e){
        console.log(e.target.files[0].name);
        console.log(e.target.files[0].type);
        setFile(e.target.files[0])
    }
    function handleSubmit(){
        console.log(title);
        console.log(text);
        console.log(file);
    }

    return(
        <div>
            <div className={style.page}>  
                <h1 className={style.title} >Title</h1>
                <input className={style.inputTitle} onChange={(event=>setTitle(event.target.value))} type="text" placeholder='The title of save'/>
                <h2 className={style.image}>Image</h2>
                <input className={style.img} type="file" onChange={handleImage}/>
                <div>
                    <textarea className={style.textarea} onChange={(event=>setText(event.target.value))} placeholder='Write your text here'/>
                </div>
                <button className={style.button} onClick={()=>handleSubmit()}>Save</button>
            </div>
        </div>
    )
}