import React, { useEffect, useState } from 'react'
import axios from 'axios'
import pic from '../logo512.png'
import style from './newrecipe.module.css'
import {useAlert} from 'react-alert'
import MicRecorder from 'mic-recorder-to-mp3'
import {Buffer} from 'buffer'

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
    const [isRecording,setIsRecording]=useState(false)
    const [isBlocked,setIsBlocked]=useState(true)
    const [mp3Recorder,setMp3recorder]=useState(new MicRecorder({bitRate:128}))

    useEffect(()=>{
        if(isBlocked){
            navigator.getUserMedia({ audio: true },
                () => {
                  console.log('Permission Granted');
                  setIsBlocked(false)
                },
                () => {
                  console.log('Permission Denied');
                  setIsBlocked(true)
                },
              );
        }
        console.log("rendered")
    },[isBlocked])

    function handleImage(e){
        imgtobase64(e)
        setFile(URL.createObjectURL(e.target.files[0]))
    }

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

    function startRecording(){
        if(isBlocked){
            alert.info("Permission to record has been denied. To use speech to text allow use of microphone")
        }else{
            mp3Recorder.start()
            .then(()=>{
                setIsRecording(true)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    function stopRecording(place){
        mp3Recorder.stop()
        .getMp3()
        .then(([buffer,blob])=>{
            setIsRecording(false)
            const send = new File(buffer,"file.mp3")
            const sound = new Audio(URL.createObjectURL(send))
            sound.play()
            speechToText(buffer,place)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    function speechToText(file,place){
        console.log(Buffer.isBuffer(file))
        let document={
            pTot:{
                file:file
            }
        }
        console.log(document)
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/watson.json",document)
        .then(response=>{
            console.log(response.data)
        })
        .catch(err=>{
            console.log(err)
        })
        switch(place){
            case "description":
                console.log("description")
                break
            case "prepntime":
                console.log("prepntime")
                break
            case "ingredients":
                console.log("ingredients")
                break
            default:
                console.log("instructions")
                break
        }
    }

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
                <div style={{display:"flex"}}>
                <h3 className={style.title2}>Description</h3>
                <div style={{display:"flex",marginLeft:"auto",marginRight:"8%"}}>
                <button className={style.recordBut} disabled={isRecording} onClick={()=>startRecording()}>record</button>
                <button className={style.stopBut} disabled={!isRecording} onClick={()=>stopRecording("description")}>stop</button>
                </div>
                </div>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setDesc(event.target.value)}/>
                <p className={style.text}>Serving size <input style={{width:"100px"}} onChange={(event)=>setServings(event.target.value)}/></p>
                <div style={{display:"flex"}}>
                <h3 className={style.title2}>Preparing and make time</h3>
                <div style={{display:"flex",marginLeft:"auto",marginRight:"8%"}}>
                <button className={style.recordBut} disabled={isRecording} onClick={()=>startRecording()}>record</button>
                <button className={style.stopBut} disabled={!isRecording} onClick={()=>stopRecording("prepntime")}>stop</button>
                </div>
                </div>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setPrepntime(event.target.value)}/>
                <div style={{display:"flex"}}>
                <h3 className={style.title2}>Ingredients</h3>
                <div style={{display:"flex",marginLeft:"auto",marginRight:"8%"}}>
                <button className={style.recordBut} disabled={isRecording} onClick={()=>startRecording()}>record</button>
                <button className={style.stopBut} disabled={!isRecording} onClick={()=>stopRecording("ingredients")}>stop</button>
                </div>
                </div>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setIngredients(event.target.value)}/>
                <div style={{display:"flex"}}>
                <h3 className={style.title2}>Instructions</h3>
                <div style={{display:"flex",marginLeft:"auto",marginRight:"8%"}}>
                <button className={style.recordBut} disabled={isRecording} onClick={()=>startRecording()}>record</button>
                <button className={style.stopBut} disabled={!isRecording} onClick={()=>stopRecording("instructions")}>stop</button>
                </div>
                </div>
                <textarea style={{resize:"none",height:"200px",width:"90%",marginLeft:"2%"}} onChange={(event)=>setInstructions(event.target.value)}/>
                <div><button className={style.saveBut} onClick={()=>handleSave()}>Save Recipe</button></div>
            </div>
        </div>
    )
}