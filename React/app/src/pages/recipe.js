import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link,useLocation } from 'react-router-dom'
import Navbar from './navbar'
import pic from '../logo512.png'
import style from './recipe.module.css'
import Rating from '@mui/material/Rating'
import Card from '@mui/material/Card';
import {useAlert} from 'react-alert'

export default function Recipe(){
    
    let alert = useAlert()
    var location = useLocation()
    const [arr,setArr]=useState([])
    const [reviews,setReviews]=useState([])
    const [button,setButton]=useState(false)
    const [rating,setRating]=useState(1)
    const [comment,setComment]=useState("")
    sessionStorage.setItem("id","2")

    useEffect(()=>{
            if(arr.length==0){
            axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-recipes.json?id="+location.state)
            .then(response=>{
                let arr = response.data.result
                arr[0].doc._attachments.image.data = image(arr[0].doc._attachments.image.data)
                setArr(arr)
                getReviews()
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })

    function getReviews(){
        axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-reviews.json?recipe="+location.state)
        .then((response)=>{
           
            let arr = response.data.result.filter(e=>e.id!=="_design/51ab035d1c4caacddd22c5982a903909c3d7b47b")
            arr = arr.filter(e=>e.id!=="_design/fdcf31ef4d2bbfda2d3636361a9d00c93559a322")
            setReviews(arr)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

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

    function handleSubmit(){
        let document={
            save:{
                userId:sessionStorage.getItem("id"),
                rating:rating,
                comment:comment,
                recipe:arr[0].doc._id
            }
        }
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/post-review.json",document)
        .then((response)=>{
            if(response.data.result.ok){
                alert.success("review send successfully")
            }
        })
        .catch((err)=>{
            console.log(err)
            alert.error("error happened try again later")
        })
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
            </div>
            :<div/>}
            {sessionStorage.getItem("id") ? <button className={style.button} onClick={()=>setButton(!button)}>add Review</button>:<div></div>}
            {button ? 
            <div className={style.addReviewBox}>
                <div className={style.head}>Review of recipe</div>
                <div className={style.head2}>Rating</div>
                <Rating
                size='large'
                className={style.rating}
                onChange={(event)=>setRating(event.target.value)}
                value={rating}
                />
                <div className={style.head2}>Comment</div>
                <textarea placeholder='Write your comments about the recipe here' className={style.comment} onChange={(event)=>setComment(event.target.value)}/>
                <button className={style.submit} onClick={()=>handleSubmit()}>Submit review</button>
            </div>
            :<div></div>}
            {reviews ? <div>
                <div className={style.reviewsHead}>Reviews</div>
                {reviews.map(e=><Card className={style.reviewBox}>
                    <div className={style.reviewHead}>Rating</div>
                    <Rating className={style.reviewRating} readOnly={true} value={e.doc.rating} />
                    <div className={style.reviewHead}>Review comment</div>
                    <textarea disabled={true} className={style.reviewComment} defaultValue={e.doc.comment} />
                </Card>)}
            </div>:<div></div>}
        </div>
    )
}