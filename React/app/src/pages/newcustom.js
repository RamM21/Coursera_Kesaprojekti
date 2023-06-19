import React, { useState } from 'react'
import axios from 'axios'
import { Link,useLocation } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import pic from '../logo512.png'
import style from './newcustom.module.css'

export default function Newcustom(){
    
    const [title,setTitle]=useState('')
    const [text,setText]=useState('')
    const [file,setFile]=useState()
    const [image,setImage]=useState()
    
    function handleImage(e){
        setImage({
            name:e.target.files[0].name,
            type:e.target.files[0].type,
            file:e.target.files[0]
        })
        setFile(URL.createObjectURL(e.target.files[0]))
    }
    function handleSubmit(){
        console.log(title);
        console.log(text);
        console.log(image);
    }

    return(
        <div>
            <div className={style.page}>  
                <h1 className={style.title} >Title</h1>
                <input className={style.inputTitle} onChange={(event=>setTitle(event.target.value))} type="text" placeholder='The title of save'/>
                <h2 className={style.image}>Image</h2>
                {file ? <img src={file} className={style.img}></img>:<img src={pic} className={style.img}></img>}
                <div><input style={{marginBottom:"1%"}} type="file" onChange={handleImage}/></div>
                <div style={{borderBottom:"2px solid black"}}/>
                <div>
                    <textarea className={style.textarea} onChange={(event=>setText(event.target.value))} placeholder='Write your text here'/>
                </div>
                <button className={style.button} onClick={()=>handleSubmit()}>Save</button>
            </div>
        </div>
    )
}