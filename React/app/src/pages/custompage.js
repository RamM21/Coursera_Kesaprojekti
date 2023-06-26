import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Await, Link,useLocation } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import pic from '../logo512.png'
import style from './custompage.module.css'

export default function Custom(){
    
    var location = useLocation()
    const [arr,setArr]=useState([])
    const [file,setFile]=useState()

    useEffect(()=>{
            if(arr.length==0){
            axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-custom.json?id="+location.state)
            .then(response=>{
                console.log(response.data.result)
                setArr(response.data.result)
                setFile(response.data.result[0].doc.image)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
    
    
    return(
        <div>
            {arr.length ? <div className={style.page}>  
                <h1 className={style.title}>{arr[0].doc.title}</h1>
                <img className={style.img} src={arr[0].doc.image.file}></img>
                <div style={{borderBottom:"2px solid black"}}></div>
                <div className={style.desc}>{arr[0].doc.paragraph}</div>
            </div>:<div/>}
        </div>
    )
}