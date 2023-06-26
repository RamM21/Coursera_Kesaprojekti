import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link,useLocation } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import pic from '../logo512.png'
import style from './recipe.module.css'

export default function Recipe(){
    
    var location = useLocation()
    const [arr,setArr]=useState([])

    useEffect(()=>{
            if(arr.length==0){
            axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-recipes.json?id="+location.state)
            .then(response=>{
                console.log(response.data.result)
                setArr(response.data.result)
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
                <img src={arr[0].doc.image.file} className={style.img}></img>
                <div style={{borderBottom:"2px solid black"}}/>
                <h3 className={style.title2}>Description</h3>
                <p className={style.text}>{arr[0].doc.desc}</p>
                <h3 className={style.title2}>Preparing and make time</h3>
                <p className={style.text}>{arr[0].doc.prepntime}</p>
                <p className={style.text}>Serving size {arr[0].doc.servings}</p>
                <h3 className={style.title2}>Ingredients</h3>
                <p className={style.text}>{arr[0].doc.ingredients}</p>
                <h3 className={style.title2}>Instructions</h3>
                <p className={style.text}>{arr[0].doc.instructions}</p>
            </div>:<div/>}
            
        </div>
    )
}