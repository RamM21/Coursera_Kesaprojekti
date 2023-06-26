import React, { useState } from 'react'
import axios from 'axios'
import pic from '../logo512.png'
import style from './newrecipe.module.css'

export default function Newrecipe(){
    
    const [title,setTitle]=useState("")
    const [image,setImage]=useState()
    const [file,setFile]=useState()
    const [desc,setDesc]=useState("")
    const [prepntime,setPrepntime]=useState("")
    const [servings,setServings]=useState("")
    const [ingredients,setIngredients]=useState("")
    const [instructions,setInstructions]=useState("")

    function handleImage(e){
        setImage({
            name:e.target.files[0].name,
            type:e.target.files[0].type,
            file:e.target.files[0]
        })
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    function revoke(e){
        console.log(e)
        URL.revokeObjectURL()
    }

    function handleSave(){
        let document={
            save:{
            title:title,
            image:image,
            desc:desc,
            prepntime:prepntime,
            servings:servings,
            ingredients:ingredients,
            instructions:instructions,
            userId:sessionStorage.getItem("id")
            }
        }
        console.log(image)
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/post-recipe.json",document)
        .then(response=>{
            console.log(response)
            setTimeout(() => {
                revoke(response.data.result)
            }, 100);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    
    return(
        <div>
            <div className={style.page}>
                <div>  
                <input className={style.title} onChange={(event)=>setTitle(event.target.value)} placeholder='Title of recipe' type='text'/>
                </div>
                {file ? <img src={file} className={style.img}></img>:<img src={pic} className={style.img}></img>}
                <div><input type='file' onChange={handleImage}/></div>
                <div style={{borderBottom:"2px solid black"}}/>
                <h3 className={style.title2}>Description</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setDesc(event.target.value)}/>
                <h3 className={style.title2}>Preparing and make time</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setPrepntime(event.target.value)}/>
                <p className={style.text}>Serving size <input style={{width:"100px"}} onChange={(event)=>setServings(event.target.value)}/></p>
                <h3 className={style.title2}>Ingredients</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setIngredients(event.target.value)}/>
                <h3 className={style.title2}>Instructions</h3>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setInstructions(event.target.value)}/>
                <div><button style={{width:"150px",height:"50px",marginLeft:"45%",marginTop:"2%",marginBottom:"2%"}} onClick={()=>handleSave()}>Save Recipe</button></div>
            </div>
        </div>
    )
}