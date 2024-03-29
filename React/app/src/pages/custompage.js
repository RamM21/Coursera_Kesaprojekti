import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import style from './custompage.module.css'
import pic from '../logo512.png'
import {useAlert} from 'react-alert'
import jsPdf from 'jspdf'
import {Buffer} from 'buffer'

export default function Custom(){
    
    const ref = useRef(null)
    let alert=useAlert()
    var location = useLocation()
    const [arr,setArr]=useState([])
    const [options,setOptions]=useState(false)
    const [update,setUpdate]=useState(false)
    const [title,setTitle]=useState("")
    const [file,setFile]=useState()
    const [text,setText]=useState("")
    const [img,setImage]=useState()

    //If no information found. Get specified custom documents information from database
    useEffect(()=>{
            if(arr.length===0){
                axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-custom.json?id="+location.state)
                .then(response=>{
                    let arr = response.data.result
                    arr[0].doc._attachments.image.data = image(arr[0].doc._attachments.image.data)
                    if(sessionStorage.getItem("id")===arr[0].doc.userid){
                        setOptions(true)
                    }
                    setArr(arr)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    })

    //Giving file data to image handling functions
    function handleImage(e){
        setFile(URL.createObjectURL(e.target.files[0]))
        imgtobase64(e)
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
    //Delete specified custom document from database
    function delCustom(){
        let document={
            "custom":{
                rev:arr[0].doc._rev,
                id:arr[0].id
            }
        }
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/del-document.json",document)
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
    //Updating custom document with new or same information to database
    function upCustom(){
        let document={
            rev:arr[0].doc._rev,
            id:arr[0].id,
            custom:{
            title:title,
            paragraph:text,
            userid:sessionStorage.getItem("id"),
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
    //Reading custom document with IBM text to speech service
    function textToSpeech(){
        let document = {
            tTop:{
                text:arr[0].doc.title+" "+arr[0].doc.paragraph
            }
        }
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/watson.json",document)
        .then((response)=>{
            const buffer = Buffer.from(response.data.result)
            const blob = new Blob([buffer])
            const url = URL.createObjectURL(blob)
            console.log(url)
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
                text:[arr[0].doc.title,arr[0].doc.paragraph]
            }
        }
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/watson.json",document)
        .then((response)=>{
            let ar = [{
                doc:{
                    title:response.data.result[0].translation,
                    paragraph:response.data.result[1].translation,
                    _attachments:arr[0].doc._attachments
                }
            }]
            setArr(ar)
        })
        .catch(err=>{
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
    //If update button pressed, putting old information to be used or changed rather than start document from nothing
    function updateCheck(){
        setUpdate(true)
        setFile(arr[0].doc._attachments.image.data)
        setText(arr[0].doc.paragraph)
        setTitle(arr[0].doc.title)
    }
    //Downloading a PDF of custom document
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
            
            {arr.length>0 ? <div>
            {options ? 
                <div>
                {update ? <div>
                    <div className={style.page}>  
                        <h1 className={style.title} >Title</h1>
                        <input className={style.inputTitle} defaultValue={title} onChange={(event=>setTitle(event.target.value))} type="text" placeholder='The title of save'/>
                        <h2 className={style.image}>Image</h2>
                        {file ? <img src={file} alt='' className={style.img}></img>:<img src={pic} alt='' className={style.img}></img>}
                        <div><input style={{marginBottom:"1%"}} type="file" onChange={handleImage}/></div>
                        <div style={{borderBottom:"2px solid black"}}/>
                        <div>
                            <textarea className={style.textarea} defaultValue={text} onChange={(event=>setText(event.target.value))} placeholder='Write your text here'/>
                        </div>
                        <button className={style.button} onClick={()=>upCustom()}>Update</button>
                    </div>
                </div>:
                <div>
                <div style={{display:"flex"}}>
                    <button className={style.putBut} onClick={()=>updateCheck()}>Edit file</button>
                    <button className={style.delBut} onClick={()=>delCustom()}>Delete file</button>
                    <button className={style.pdfBut} onClick={()=>downloadPdf()}>Download pdf</button>
                    <button className={style.pdfBut} onClick={()=>translatePage()}>Translate to finnish</button>
                    <button className={style.pdfBut} onClick={()=>textToSpeech()}>Read File</button>
                </div>
                <div ref={ref} className={style.page}>  
                <h1 className={style.title}>{arr[0].doc.title}</h1>
                <img className={style.img} alt='' src={arr[0].doc._attachments.image.data}></img>
                <div style={{borderBottom:"2px solid black"}}></div>
                <div className={style.desc}>{arr[0].doc.paragraph}</div>
            </div></div>}</div>:<div>
                <div>
                <button className={style.pdfBut} onClick={()=>downloadPdf()}>Download pdf</button>
                <button className={style.pdfBut} onClick={()=>translatePage()}>Translate to finnish</button>
                <button className={style.pdfBut} onClick={()=>textToSpeech()}>Read file</button>
                </div>
                <div ref={ref} className={style.page}>  
                <h1 className={style.title}>{arr[0].doc.title}</h1>
                <img className={style.img} alt='' src={arr[0].doc._attachments.image.data}></img>
                <div style={{borderBottom:"2px solid black"}}></div>
                <div className={style.desc}>{arr[0].doc.paragraph}</div>
            </div></div>}
            </div>:<div/>}
        </div>
    )
}