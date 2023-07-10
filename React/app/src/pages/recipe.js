import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import pic from '../logo512.png'
import style from './recipe.module.css'
import Rating from '@mui/material/Rating'
import Card from '@mui/material/Card';
import {useAlert} from 'react-alert'

export default function Recipe(){
    
    let alert = useAlert()
    var location = useLocation()
    const userid=sessionStorage.getItem("id")
    const [arr,setArr]=useState([])
    const [reviews,setReviews]=useState([])
    const [button,setButton]=useState(false)
    const [rating,setRating]=useState(1)
    const [comment,setComment]=useState("")

    
    const [options,setOptions]=useState(false)
    const [update,setUpdate]=useState(false)
    const [title,setTitle]=useState("")
    const [img,setImage]=useState()
    const [file,setFile]=useState()
    const [desc,setDesc]=useState("")
    const [prepntime,setPrepntime]=useState("")
    const [servings,setServings]=useState("")
    const [ingredients,setIngredients]=useState("")
    const [instructions,setInstructions]=useState("")

    useEffect(()=>{
            if(arr.length===0){
            getRecipes()
        }
    })

    async function getRecipes(){
        await axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-recipes.json?id="+location.state)
            .then(response=>{
                let arr = response.data.result
                arr[0].doc._attachments.image.data = image(arr[0].doc._attachments.image.data)
                if(sessionStorage.getItem("id")===arr[0].doc.userId){
                    setOptions(true)
                }
                setArr(arr)
                getReviews()
            })
            .catch(err=>{
                console.log(err)
            })
    }

    async function getReviews(){
        await axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-reviews.json?recipe="+location.state)
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

        let image = new Blob([byteArray], { type: 'image/png' });
        setImage(imgtobase64(image))
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

    async function delReview(data){
        let document={
            review:{
                id:data.doc._id,
                rev:data.doc._rev
            }
        }
        await axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/del-document.json",document)
        .then((response)=>{
            if(response.data.result.ok){
                alert.success("Review was deleted successfully")
            }
        })
        .catch((err)=>{
            console.log(err)
            alert.error("There was an error in deleting the review try again later")
        })
    }

    async function delRecipe(){
        let document={
            recipe:{
                id:arr[0].id,
                rev:arr[0].doc._rev
            }
        }
        await axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/del-document.json",document)
        .then((response)=>{
            if(response.data.result.ok){
                alert.success("File was deleted successfully")
            }
        })
        .catch((err)=>{
            console.log(err)
            alert.error("There was an error in deleting the file try again later")
        })
    }

    function upRecipe(){
        let document={
            rev:arr[0].doc._rev,
            id:arr[0].id,
            recipe:{
            title:title,
            desc:desc,
            prepntime:prepntime,
            servings:servings,
            ingredients:ingredients,
            instructions:instructions,
            userId:sessionStorage.getItem("id"),
            _attachments:{
                "image":{
                "content_type":img.type,
                "data":img.file
                }
                }
            }
            }

        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/put-document.json",document)
        .then(response=>{
            if(response.data.result.ok){
                alert.success("Data was successfully saved")
            }
        })
        .catch(err=>{
            alert.error("error happened try again later")
            console.log(err)
        })
    }

    function handleImage(e){
        setFile(URL.createObjectURL(e.target.files[0]))
        imgtobase64(e)
    }

    function imgtobase64(data){
        if(!data.target){
            const reader = new FileReader()
            reader.readAsDataURL(data)
            reader.onload = () => {
            setImage({
                type:data.type,
                file:reader.result.slice(22)
            })
            }
        }else{
        const reader = new FileReader()
        reader.readAsDataURL(data.target.files[0])

        reader.onload = () => {
        setImage({
            type:data.target.files[0].type,
            file:reader.result.slice(22)
        })
        }
    }
    }

    function updateCheck(){
        setUpdate(true)
        setFile(arr[0].doc._attachments.image.data)
        setTitle(arr[0].doc.title)
        setDesc(arr[0].doc.desc)
        setPrepntime(arr[0].doc.prepntime)
        setServings(arr[0].doc.servings)
        setIngredients(arr[0].doc.ingredients)
        setInstructions(arr[0].doc.instructions)
    }
    
    return(
        <div>
            {options ? <div>
                {update ? 
                <div className={style.page}>
                <div>  
                <input className={style.titleinput} defaultValue={title} onChange={(event)=>setTitle(event.target.value)} placeholder='Title of recipe' type='text'/>
                </div>
                {file ? <img src={file} className={style.img}></img>:<img src={pic} className={style.img}></img>}
                <div><input type='file' onChange={handleImage}/></div>
                <div style={{borderBottom:"2px solid black"}}/>
                <h3 className={style.title2}>Description</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} defaultValue={desc} onChange={(event)=>setDesc(event.target.value)}/>
                <h3 className={style.title2}>Preparing and make time</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} defaultValue={prepntime} onChange={(event)=>setPrepntime(event.target.value)}/>
                <p className={style.text}>Serving size <input style={{width:"100px"}} defaultValue={servings} onChange={(event)=>setServings(event.target.value)}/></p>
                <h3 className={style.title2}>Ingredients</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} defaultValue={ingredients} onChange={(event)=>setIngredients(event.target.value)}/>
                <h3 className={style.title2}>Instructions</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} defaultValue={instructions} onChange={(event)=>setInstructions(event.target.value)}/>
                <div><button style={{width:"150px",height:"50px",marginLeft:"45%",marginTop:"2%",marginBottom:"2%"}} onClick={()=>upRecipe()}>Update Recipe</button></div>
            </div>:
                <div>
                    <div style={{display:"flex"}}>
                        <button className={style.putBut} onClick={()=>updateCheck()}>Edit file</button>
                        <button className={style.delBut} onClick={()=>delRecipe()}>Delete file</button>
                    </div>
                <div className={style.page}>  
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
            </div>{sessionStorage.getItem("id") ? <button className={style.button} onClick={()=>setButton(!button)}>add Review</button>:<div></div>}
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
            :<div/>}
            {reviews ? <div>
                <div className={style.reviewsHead}>Reviews</div>
                {reviews.map(e=><div>{userid===e.doc.userId ? <Card className={style.reviewBox}>
                    <div className={style.reviewHead}>Rating</div>
                    <Rating className={style.reviewRating} readOnly={true} value={e.doc.rating} />
                    <div className={style.reviewHead}>Review comment</div>
                    <textarea disabled={true} className={style.reviewComment} defaultValue={e.doc.comment} />
                    <button className={style.delReview} onClick={()=>delReview(e)}>delete</button>
                </Card>:<Card className={style.reviewBox}>
                    <div className={style.reviewHead}>Rating</div>
                    <Rating className={style.reviewRating} readOnly={true} value={e.doc.rating} />
                    <div className={style.reviewHead}>Review comment</div>
                    <textarea disabled={true} className={style.reviewComment} defaultValue={e.doc.comment} />
                </Card>}</div>)}
            </div>:<div/>}</div>}
            </div>:
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
            :<div/>}
            {reviews ? <div>
                <div className={style.reviewsHead}>Reviews</div>
                {reviews.map(e=><div>{userid===e.doc.userId ? <Card className={style.reviewBox}>
                    <div className={style.reviewHead}>Rating</div>
                    <Rating className={style.reviewRating} readOnly={true} value={e.doc.rating} />
                    <div className={style.reviewHead}>Review comment</div>
                    <textarea disabled={true} className={style.reviewComment} defaultValue={e.doc.comment} />
                    <button className={style.delReview} onClick={()=>delReview(e)}>delete</button>
                </Card>:<Card className={style.reviewBox}>
                    <div className={style.reviewHead}>Rating</div>
                    <Rating className={style.reviewRating} readOnly={true} value={e.doc.rating} />
                    <div className={style.reviewHead}>Review comment</div>
                    <textarea disabled={true} className={style.reviewComment} defaultValue={e.doc.comment} />
                </Card>}</div>)}
            </div>:<div/>}
            </div>}
        </div>
    )
}