import React, { useState } from 'react'
import axios from 'axios'
import pic from '../logo512.png'
import style from './newrecipe.module.css'
import {useAlert} from 'react-alert'

export default function Newrecipe(){
    
    
    let alert = useAlert()
    const [title,setTitle]=useState("")
    const [image,setImage]=useState()
    const [file,setFile]=useState()
    const [desc,setDesc]=useState("")
    const [prepntime,setPrepntime]=useState("")
    const [servings,setServings]=useState("")
    const [ingredients,setIngredients]=useState("")
    const [instructions,setInstructions]=useState("")

    //Giving image file handling functions
    function handleImage(e){
        imgtobase64(e)
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    //Changing image file data to base64 to attach usable data to document
    function imgtobase64(data){
        const reader = new FileReader()
        reader.readAsDataURL(data.target.files[0])

        reader.onload = () => {
        setImage({
            name:data.target.files[0].name,
            type:data.target.files[0].type,
            file:reader.result.slice(22)
        })
        }
    }
    //Sending recipe document to be saved to database
    function handleSave(){
        let document={
            save:{
            title:title,
            desc:desc,
            prepntime:prepntime,
            servings:servings,
            ingredients:ingredients,
            instructions:instructions,
            userId:sessionStorage.getItem("id"),
            _attachments:{
                "image":{
                "content_type":image.type,
                "data":image.file
                }
                }
            }
            }
        
        
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/post-recipe.json",document)
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

    
    return(
        <div>
            <div className={style.page}>
                <div>  
                <input className={style.title} onChange={(event)=>setTitle(event.target.value)} placeholder='Title of recipe' type='text'/>
                </div>
                {file ? <img src={file} alt='' className={style.img}></img>:<img src={pic} alt='' className={style.img}></img>}
                <div><input type='file' onChange={handleImage}/></div>
                <div style={{borderBottom:"2px solid black"}}/>
                <h3 className={style.title2}>Description</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setDesc(event.target.value)}/>
                <p className={style.text}>Serving size <input style={{width:"100px"}} onChange={(event)=>setServings(event.target.value)}/></p>
                <h3 className={style.title2}>Preparing and make time</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setPrepntime(event.target.value)}/>
                <h3 className={style.title2}>Ingredients</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setIngredients(event.target.value)}/>
                <h3 className={style.title2}>Instructions</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setInstructions(event.target.value)}/>
                <div><button className={style.saveBut} onClick={()=>handleSave()}>Save Recipe</button></div>
            </div>
        </div>
    )
}