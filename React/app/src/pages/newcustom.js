import React, { useState } from 'react'
import axios from 'axios'
import pic from '../logo512.png'
import style from './newcustom.module.css'
import {useAlert} from 'react-alert'

export default function Newcustom(){
    
    let alert = useAlert()
    const [title,setTitle]=useState('')
    const [text,setText]=useState('')
    const [file,setFile]=useState()
    const [image,setImage]=useState()
    
    //Giving image file handling functions
    function handleImage(e){
        imgtobase64(e)
        setFile(URL.createObjectURL(e.target.files[0]))
    }
    //Changing image file data to base64 to attach usable data to document
    function imgtobase64(data){
        const reader = new FileReader()
        console.log(data.target.files[0])
        reader.readAsDataURL(data.target.files[0])

        reader.onload = () => {
        console.log('called: ', reader)
        setImage({
            name:data.target.files[0].name,
            type:data.target.files[0].type,
            file:reader.result.slice(22)
        })
        }
    }
    //Sending custom document to be saved to database
    function handleSubmit(){
        console.log(image)
        let document={
            save:{
            title:title,
            paragraph:text,
            userid:sessionStorage.getItem("id"),
            _attachments:{
                "image":{
                "content_type":image.type,
                "data":image.file
                }
                }
            }
            }
        
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/post-custom.json",document)
        .then(response=>{
            if(response.data.result.ok){
                alert.success("Data was successfully saved")
            }
            console.log(response.data)
        })
        .catch(err=>{
            alert.error("error happened try again later")
            console.log(err)
        })
    }

    return(
        <div>
            <div className={style.page}>  
                <h1 className={style.title} >Title</h1>
                <input className={style.inputTitle} onChange={(event=>setTitle(event.target.value))} type="text" placeholder='The title of save'/>
                <h2 className={style.image}>Image</h2>
                {file ? <img src={file} alt='' className={style.img}></img>:<img src={pic} alt='' className={style.img}></img>}
                <div><input style={{marginBottom:"1%"}} type="file" onChange={handleImage}/></div>
                <div style={{borderBottom:"2px solid black"}}/>
                <div>
                    <textarea className={style.textarea} onChange={(event=>setText(event.target.value))} placeholder='Write your text here'/>
                </div>
                <button className={style.button} onClick={()=>handleSubmit()}>Save</button>
            </div>
        </div>
    )
}