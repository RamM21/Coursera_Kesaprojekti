import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import pic from '../logo512.png'
import style from './recipe.module.css'
import Rating from '@mui/material/Rating'
import Card from '@mui/material/Card';
import {useAlert} from 'react-alert'
import jsPdf from 'jspdf'
import {Buffer} from 'buffer'

export default function Recipe(){
    
    
    const ref = useRef(null)
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

    //If information empty get information with get functions
    useEffect(()=>{
            if(arr.length===0){
            getRecipes()
            getReviews()
        }
    })
    //Getting specified recipe documents information from database
    async function getRecipes(){
        await axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-recipes.json?id="+location.state)
            .then(response=>{
                let arr = response.data.result
                arr[0].doc._attachments.image.data = image(arr[0].doc._attachments.image.data)
                if(sessionStorage.getItem("id")===arr[0].doc.userId){
                    setOptions(true)
                }
                setArr(arr)
                
            })
            .catch(err=>{
                console.log(err)
            })
    }
    //Getting specified recipes reviews from database
    async function getReviews(){
        await axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-reviews.json?recipeId="+location.state)
        .then((response)=>{
            let arr = response.data.result.docs
            setReviews(arr)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //Changing document attachment image from base64 to usable blob
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
    //Getting sentiment to review comment from IBM language understanding service
    async function handleSubmit(){
        let document={
            text:comment
        }
        await axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/watson.json",document)
        .then((response)=>{
            sendReview(response.data.result.label)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //Sending review document of recipe to database
    async function sendReview(sentiment){
        let document={
            save:{
                userId:sessionStorage.getItem("id"),
                rating:rating,
                comment:comment,
                sentiment:sentiment,
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
    //Deleting review document from database
    async function delReview(data){
        let document={
            review:{
                id:data._id,
                rev:data._rev
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
    //Deleting recipe document from database
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
    //Updating recipe document with new or same information to database
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
    //Giving file data to image handling functions
    function handleImage(e){
        setFile(URL.createObjectURL(e.target.files[0]))
        imgtobase64(e)
    }
    //Reading recipe document with IBM text to speech service
    function textToSpeech(){
        let document = {
            tTop:{
                text:arr[0].doc.title+" description "+arr[0].doc.desc+" preparations and time to make "+arr[0].doc.prepntime+" serving size "+arr[0].doc.servings+" ingredients "+arr[0].doc.ingredients+" instructions "+arr[0].doc.instructions
            }
        }
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/watson.json",document)
        .then((response)=>{
            const buffer = Buffer.from(response.data.result)
            const blob = new Blob([buffer])
            const url = URL.createObjectURL(blob)
            let audio = new Audio(url)
            audio.play()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //Translating document to finnish with IBM language translator service
    function translatePage(){
        let document={
            translate:{
                text:[arr[0].doc.title,arr[0].doc.desc,arr[0].doc.prepntime,arr[0].doc.ingredients,arr[0].doc.instructions]
            }
        }
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/watson.json",document)
        .then((response)=>{
            let ar = [{
                doc:{
                    title:response.data.result[0].translation,
                    desc:response.data.result[1].translation,
                    prepntime:response.data.result[2].translation,
                    ingredients:response.data.result[3].translation,
                    servings:arr[0].doc.servings,
                    instructions:response.data.result[4].translation,
                    _attachments:arr[0].doc._attachments
                }
            }]
            setArr(ar)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    //Changing image file data to base64 to attach usable data to document
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
    //If update button pressed, putting old information to be used or changed rather than start document from nothing
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
    //Downloading a PDF of recipe document
    function downloadPdf(){
        const content = ref.current
        const doc = new jsPdf()
        doc.html(content,{
            callback:function (doc){
                doc.save(arr[0].doc.title+'.pdf')
            },
            width:100,
            windowWidth:450
        })
    }
    
    return(
        <div>
            {options ? <div>
                {update ? 
                <div className={style.page}>
                <div>  
                <input className={style.titleinput} defaultValue={title} onChange={(event)=>setTitle(event.target.value)} placeholder='Title of recipe' type='text'/>
                </div>
                {file ? <img src={file} alt='' className={style.img}></img>:<img src={pic} alt='' className={style.img}></img>}
                <div><input type='file' onChange={handleImage}/></div>
                <div style={{borderBottom:"2px solid black"}}/>
                <h3 className={style.title2}>Description</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} defaultValue={desc} onChange={(event)=>setDesc(event.target.value)}/>
                <p className={style.text}>Serving size <input style={{width:"100px"}} defaultValue={servings} onChange={(event)=>setServings(event.target.value)}/></p>
                <h3 className={style.title2}>Preparing and make time</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} defaultValue={prepntime} onChange={(event)=>setPrepntime(event.target.value)}/>
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
                        <button className={style.pdfBut} onClick={()=>downloadPdf()}>Download pdf</button>
                        <button className={style.pdfBut} onClick={()=>translatePage()}>Translate to finnish</button>
                        <button className={style.pdfBut} onClick={()=>textToSpeech()}>Read File</button>
                    </div>
                <div ref={ref} className={style.page}>  
                    <h1 className={style.title}>{arr[0].doc.title}</h1>
                    <img src={arr[0].doc._attachments.image.data} alt='' className={style.img}></img>
                    <div style={{borderBottom:"2px solid black"}}/>
                    <h3 className={style.title2}>Description</h3>
                    <p className={style.text}>{arr[0].doc.desc}</p>
                    <p className={style.text}>Serving size {arr[0].doc.servings}</p>
                    <h3 className={style.title2}>Preparing and make time</h3>
                    <p className={style.text}>{arr[0].doc.prepntime}</p>
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
                {reviews.map(e=><div>{userid===e.userId ? <Card className={style.reviewBox}>
                    <div style={{display:"flex"}}>
                    <div>
                    <div className={style.reviewHead}>Rating</div>
                    <Rating className={style.reviewRating} readOnly={true} value={e.rating} />
                    </div>
                    <img style={{width:"50px",marginLeft:"auto",marginRight:"30px"}} alt='' src={"/"+e.sentiment+".png"} />
                    </div>
                    <div className={style.reviewHead}>Review comment</div>
                    <textarea disabled={true} className={style.reviewComment} defaultValue={e.comment} />
                    <button className={style.delReview} onClick={()=>delReview(e)}>delete</button>
                </Card>:<Card className={style.reviewBox}>
                    <div style={{display:"flex"}}>
                    <div>
                    <div className={style.reviewHead}>Rating</div>
                    <Rating className={style.reviewRating} readOnly={true} value={e.rating} />
                    </div>
                    <img style={{width:"50px",marginLeft:"auto",marginRight:"30px"}} alt='' src={"/"+e.sentiment+".png"} />
                    </div>
                    <div className={style.reviewHead}>Review comment</div>
                    <textarea disabled={true} className={style.reviewComment} defaultValue={e.comment} />
                </Card>}</div>)}
            </div>:<div/>}</div>}
            </div>:
            <div>
            {arr.length ? <div>
                <div>
                <button className={style.pdfBut} onClick={()=>downloadPdf()}>Download pdf</button>
                <button className={style.pdfBut} onClick={()=>translatePage()}>Translate to finnish</button>
                <button className={style.pdfBut} onClick={()=>textToSpeech()}>Read File</button>
                </div>
                <div ref={ref} className={style.page}>  
                <h1 className={style.title}>{arr[0].doc.title}</h1>
                <img src={arr[0].doc._attachments.image.data} alt='' className={style.img}></img>
                <div style={{borderBottom:"2px solid black"}}/>
                <h3 className={style.title2}>Description</h3>
                <p className={style.text}>{arr[0].doc.desc}</p>
                <p className={style.text}>Serving size {arr[0].doc.servings}</p>
                <h3 className={style.title2}>Preparing and make time</h3>
                <p className={style.text}>{arr[0].doc.prepntime}</p>
                <h3 className={style.title2}>Ingredients</h3>
                <p className={style.text}>{arr[0].doc.ingredients}</p>
                <h3 className={style.title2}>Instructions</h3>
                <p className={style.text}>{arr[0].doc.instructions}</p>
            </div></div>
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
                {reviews.map(e=><div>{userid===e.userId ? <Card className={style.reviewBox}>
                    <div style={{display:"flex"}}>
                    <div>
                    <div className={style.reviewHead}>Rating</div>
                    <Rating className={style.reviewRating} readOnly={true} value={e.rating} />
                    </div>
                    <img style={{width:"50px",marginLeft:"auto",marginRight:"30px"}} alt='' src={"/"+e.sentiment+".png"} />
                    </div>
                    <div className={style.reviewHead}>Review comment</div>
                    <textarea disabled={true} className={style.reviewComment} defaultValue={e.comment} />
                    <button className={style.delReview} onClick={()=>delReview(e)}>delete</button>
                </Card>:<Card className={style.reviewBox}>
                    <div style={{display:"flex"}}>
                    <div>
                    <div className={style.reviewHead}>Rating</div>
                    <Rating className={style.reviewRating} readOnly={true} value={e.rating} />
                    </div>
                    <img style={{width:"50px",marginLeft:"auto",marginRight:"30px"}} alt='' src={"/"+e.sentiment+".png"} />
                    </div>
                    <div className={style.reviewHead}>Review comment</div>
                    <textarea disabled={true} className={style.reviewComment} defaultValue={e.comment} />
                </Card>}</div>)}
            </div>:<div/>}
            </div>}
        </div>
    )
}