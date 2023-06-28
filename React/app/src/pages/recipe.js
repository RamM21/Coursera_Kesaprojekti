import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link,useLocation } from 'react-router-dom'
import Navbar from './navbar'
import pic from '../logo512.png'
import style from './recipe.module.css'

export default function Recipe(){
    
    var location = useLocation()
    const [arr,setArr]=useState([])

    useEffect(()=>{
            if(arr.length==0){
            axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-recipes.json?id="+location.state)
            .then(response=>{
                let arr = response.data.result
                arr[0].doc._attachments.image.data = image(arr[0].doc._attachments.image.data)
                setArr(arr)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })

    function image(data){
        const byteCharacters = atob(data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        let image = new Blob([byteArray], { type: 'image/jpeg' });
        let imageUrl = URL.createObjectURL(image);
        return imageUrl
    }
    
    return(
        <div>
            {arr.length ? <div className={style.page}>  
                <h1 className={style.title}>{arr[0].doc.title}</h1>
                <img src={arr[0].doc._attachments.image.data} className={style.img}></img>
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