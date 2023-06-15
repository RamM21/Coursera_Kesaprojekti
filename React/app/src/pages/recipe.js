import React from 'react'
import axios from 'axios'
import { Link,useLocation } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import pic from '../logo512.png'
import style from './recipe.module.css'

export default function Recipe(){
    
    var location = useLocation()
    
    let arr = data.recipes.find(e=>e.id==location.state)
    console.log(arr)

    
    return(
        <div>
            <div className={style.page}>  
                <h1 className={style.title}>{arr.title}</h1>
                <img src={pic} className={style.img}></img>
                <div style={{borderBottom:"2px solid black"}}/>
                <h3 className={style.title2}>Description</h3>
                <p className={style.text}>{arr.desc}</p>
                <h3 className={style.title2}>Preparing and make time</h3>
                <p className={style.text}>{arr.prepntime}</p>
                <p className={style.text}>Serving size {arr.servings}</p>
                <h3 className={style.title2}>Ingredients</h3>
                <p className={style.text}>{arr.ingredients}</p>
                <h3 className={style.title2}>Instructions</h3>
                <p className={style.text}>{arr.instructions}</p>
            </div>
        </div>
    )
}