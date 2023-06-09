import React from 'react'
import axios from 'axios'
import { Link,useLocation } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import pic from '../logo512.png'
import style from './custompage.module.css'

export default function Custom(){
    
    var location = useLocation()
    
    let arr = data.custom.find(e=>e.id==location.state)
    console.log(arr)

    
    return(
        <div>
            <Navbar />
            <div className={style.page}>  
                
            </div>
        </div>
    )
}