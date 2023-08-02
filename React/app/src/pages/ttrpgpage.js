import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import style from './ttrpgpage.module.css'
import Upttrpg from './upttrpg'
import {useAlert} from 'react-alert'
import jsPdf from 'jspdf'

export default function Ttrpg(){
    
    const ref = useRef(null)
    const ref2 = useRef(null)
    let alert = useAlert()
    var location = useLocation()
    const [arr,setArr]=useState([])
    const [options,setOptions]=useState(false)
    const [update,setUpdate]=useState(false)
    const [img,setImage]=useState()
    
    //If no information found get specified ttrpg document from database
    useEffect(()=>{
            if(arr.length===0){
            axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-ttrpg.json?id="+location.state)
            .then(response=>{
                let arr=response.data.result
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
    //Delete specified ttrpg document from database
    async function delTtrpg(){
        let document={
            ttrpg:{
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
    //Downloading a PDF of ttrpg document
    function downloadPdf(){
        const content = ref.current
        const content2 = ref2.current
        const doc = new jsPdf()
        doc.html(content,{
            callback:function (doc){
                doc.addPage()
                doc.html(content2,{
                    callback:function (doc){
                        doc.save(arr[0].doc.chardesc.name+'.pdf')
                    },
                    width:105,
                    windowWidth:450,
                    autoPaging:false
                })
            },
            width:105,
            windowWidth:450,
            autoPaging:false
        })
        
    }
    
    return(
        <div>
            {arr.length ? 
            <div>{options ? <div>
                {update ? <Upttrpg data={arr} img={img}/>:<div>
                <div style={{display:"flex"}}>
                <button className={style.editBut} onClick={()=>setUpdate(true)}>Edit file</button>
                <button className={style.delBut} onClick={()=>delTtrpg()}>Delete file</button>
                <button className={style.pdfBut} onClick={()=>downloadPdf()}>Download pdf</button>
                </div>
                <div ref={ref}>
                <div className={style.page}>  
                <div className={style.pagetop}>
                        <div className={style.charnamebox}>
                            <div className={style.charnametext}>{arr[0].doc.chardesc.name}</div>
                            <div style={{textAlign:"center"}}>Character Name</div>
                        </div>
                        <div className={style.chardescbox}>
                            <div style={{display:'flex'}}>
                                <div className={style.charbox} style={{marginLeft:"5%"}}>
                                    <div style={{display:"flex"}}>
                                        <div className={style.chartext} style={{marginLeft:"5%"}}>{arr[0].doc.chardesc.class}</div>
                                        <div className={style.chartext} style={{marginLeft:"10%"}}>{arr[0].doc.chardesc.level}</div>
                                    </div>
                                    <div className={style.charhead}>Class & Level</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"10%"}}>
                                    <div className={style.chartext}>{arr[0].doc.chardesc.background}</div>
                                    <div className={style.charhead}>Background</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"14%"}}>
                                    <div className={style.chartext}>{arr[0].doc.chardesc.player}</div>
                                    <div className={style.charhead}>Player Name</div>
                                </div>
                            </div>
                            <div style={{display:'flex'}}>
                                <div className={style.charbox} style={{marginLeft:"5%"}}>
                                    <div className={style.chartext}>{arr[0].doc.chardesc.race}</div>
                                    <div className={style.charhead}>Race</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"20%"}}>
                                    <div className={style.chartext}>{arr[0].doc.chardesc.aligment}</div>
                                    <div className={style.charhead}>Aligment</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"15%"}}>
                                    <div className={style.chartext}>{arr[0].doc.chardesc.experience}</div>
                                    <div className={style.charhead}>Experience Points</div>
                                </div>
                            </div>
                        </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.box}>
                        <div>
                            <div className={style.profbox}>
                                <div className={style.proftext}>
                                    Proficiency Bonus
                                </div>
                                <div className={style.profbonus}>
                                    +{arr[0].doc.stats.proficiency}
                                </div>
                            </div>
                            <div className={style.insbox}>
                                <div className={style.instext}>
                                    inspiration
                                </div>
                                <div className={style.insbonus}>
                                    {arr[0].doc.stats.inspiration}
                                </div>
                            </div>
                            <div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.strengthbonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.strength}
                                        </div>
                                        <div className={style.stattext}>
                                            strength
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.strengthsave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {arr[0].doc.skills.strengthsave ? arr[0].doc.stats.strengthbonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.strengthbonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.athletics} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {arr[0].doc.skills.athletics ? arr[0].doc.stats.strengthbonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.strengthbonus}
                                                </div>
                                                <div>
                                                    athletics
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.dexteritybonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.dexterity}
                                        </div>
                                        <div className={style.stattext}>
                                            dexterity
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.dexteritysave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {arr[0].doc.skills.dexteritysave ? arr[0].doc.stats.dexteritybonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.dexteritybonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.acrobatics} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.acrobatics ? arr[0].doc.stats.dexteritybonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.dexteritybonus}
                                                </div>
                                                <div>
                                                    acrobatics
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.sleightofhand} type='checkbox'/>
                                                <div  className={style.skillbonus}>
                                                {arr[0].doc.skills.sleightofhand ? arr[0].doc.stats.dexteritybonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.dexteritybonus}
                                                </div>
                                                <div style={{textAlignLast:"right"}}>
                                                    sleight of hand
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.stealth} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.stealth ? arr[0].doc.stats.dexteritybonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.dexteritybonus}
                                                </div>
                                                <div>
                                                    stealth
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.constitutionbonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.constitution}
                                        </div>
                                        <div className={style.stattext}>
                                            constitution
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.constitutionsave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.constitutionsave ? arr[0].doc.stats.constitutionbonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.constitutionbonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.intelligencebonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.intelligence}
                                        </div>
                                        <div className={style.stattext}>
                                            intelligence
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.intelligencesave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.intelligencesave ? arr[0].doc.stats.intelligencebonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.arcana} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.arcana ? arr[0].doc.stats.intelligencebonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    arcana
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.history} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.history ? arr[0].doc.stats.intelligencebonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    history
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.investigation} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.investigation ? arr[0].doc.stats.intelligencebonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    investigation
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.nature} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.nature ? arr[0].doc.stats.intelligencebonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    nature
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.religion} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.religion ? arr[0].doc.stats.intelligencebonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    religion
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.wisdombonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.wisdom}
                                        </div>
                                        <div className={style.stattext}>
                                            wisdom
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.wisdomsave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.wisdomsave ? arr[0].doc.stats.wisdombonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.animalhandling} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.animalhandling ? arr[0].doc.stats.wisdombonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    animal handling
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.insight} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.insight ? arr[0].doc.stats.wisdombonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    insight
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.medicine} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.medicine ? arr[0].doc.stats.wisdombonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    medicine
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.perception} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.perception ? arr[0].doc.stats.wisdombonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    perception
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.survival} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.survival ? arr[0].doc.stats.wisdombonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    survival
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.charismabonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.charisma}
                                        </div>
                                        <div className={style.stattext}>
                                            charisma
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.charismasave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.charismasave ? arr[0].doc.stats.charismabonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.charismabonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.deception} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.deception ? arr[0].doc.stats.charismabonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.charismabonus}
                                                </div>
                                                <div>
                                                    deception
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.intimidation} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.intimidation ? arr[0].doc.stats.charismabonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.charismabonus}
                                                </div>
                                                <div>
                                                    intimidation
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.performance} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.performance ? arr[0].doc.stats.charismabonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.charismabonus}
                                                </div>
                                                <div>
                                                    performance
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.persuasion} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.persuasion ? arr[0].doc.stats.charismabonus+arr[0].doc.stats.proficiency:arr[0].doc.stats.charismabonus}
                                                </div>
                                                <div>
                                                    persuasion
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={style.perbox}>
                                <div className={style.perbonus}>{arr[0].doc.skills.perception ? 8+arr[0].doc.stats.wisdombonus+arr[0].doc.stats.proficiency:8+arr[0].doc.stats.wisdombonus}</div>
                                <div style={{alignSelf:"center"}}>passive perception (wisdom)</div>
                            </div>
                            <div>
                                <div className={style.langbox}>
                                    <div style={{overflowWrap:"break-word",overflowY:"auto"}}>{arr[0].doc.traits.profnlang.prof} {arr[0].doc.traits.profnlang.lang}</div>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>proficiencies & languages</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.box}>
                        <div style={{backgroundColor:"lightgray"}}>
                            <div style={{display:"flex"}}>
                                <div className={style.arbox}>
                                    <div>{arr[0].doc.stats.armor}</div>
                                    <div style={{fontWeight:"bold"}}>armor</div>
                                </div>
                                <div className={style.chabox}>
                                    <div>{arr[0].doc.stats.dexteritybonus}</div>
                                    <div style={{fontWeight:"bold"}}>initiative</div>
                                </div>
                                <div className={style.chabox}>
                                    <div>{arr[0].doc.stats.speed}</div>
                                    <div style={{fontWeight:"bold"}}>speed</div>
                                </div>
                            </div>
                            <div className={style.hpbox}>
                                <div style={{display:"flex",borderBottom:"1px solid black"}}>
                                    <div className={style.maxhptext}>hit poins maximum</div>
                                    <div className={style.maxhpnum}>{arr[0].doc.stats.hpmax}</div>
                                </div>
                                <div>
                                    <div className={style.curhpnum}>{arr[0].doc.stats.curhp}</div>
                                    <div className={style.curhptext}>current hit points</div>
                                </div>
                            </div>
                            <div className={style.tempbox}>
                                <div>{arr[0].doc.stats.temphp}</div>
                                <div className={style.temphptext}>temporary hit points</div>
                            </div>
                            <div className={style.deathbox}>
                                <div className={style.hitdicebox}>
                                    <div style={{display:"flex",textDecoration:"underline"}}>
                                        <div className={style.hitdicetext}>total</div>
                                        <div className={style.totalhitdice}>{arr[0].doc.stats.totalhitdice}</div>
                                    </div>
                                    <div>
                                        <div>{arr[0].doc.stats.hitdice}</div>
                                        <div className={style.hitdicetext}>hit dice</div>
                                    </div>
                                </div>
                                <div className={style.deathsavebox}>
                                    <div style={{display:"flex"}}>
                                        <div className={style.deathtext}>successes</div>
                                        <div style={{display:"flex"}}>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.success1}/>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.success2}/>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.success3}/>
                                        </div>
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <div className={style.deathtext} style={{marginRight:"12%"}}>failures</div>
                                        <div style={{display:"flex"}}>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.failure1}/>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.failure2}/>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.failure3}/>
                                        </div>
                                    </div>
                                    <div style={{textAlign:"center",}}>death saves</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={style.weaponbox}>
                                <table style={{backgroundColor:"lightgrey",marginBottom:"2%"}}>
                                    <tr>
                                        <th style={{backgroundColor:"beige"}}>name</th>
                                        <th style={{backgroundColor:"beige"}}>atk bonus</th>
                                        <th style={{backgroundColor:"beige"}}>dagame/type</th>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon1}</td>
                                        <td className={style.weaponcolumn}>+{arr[0].doc.stats.strengthbonus}</td>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon1dmg}</td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon2}</td>
                                        <td className={style.weaponcolumn}>+{arr[0].doc.stats.dexteritybonus}</td>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon2dmg}</td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon3}</td>
                                        <td className={style.weaponcolumn}>+{arr[0].doc.stats.dexteritybonus}</td>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon3dmg}</td>
                                    </tr>
                                </table>
                                <div>
                                    <textarea readOnly={true} className={style.weaponother} value={arr[0].doc.backpack.attack.other}></textarea>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>attacks and spellcasting</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.bagbox}>
                            <div style={{display:"flex"}}>
                                <div >
                                    <div className={style.coinbox}>
                                        <div>cp</div>
                                        <div className={style.coin}>{arr[0].doc.backpack.coins.cp}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>sp</div>
                                        <div className={style.coin}>{arr[0].doc.backpack.coins.sp}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>ep</div>
                                        <div className={style.coin}>{arr[0].doc.backpack.coins.ep}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>gp</div>
                                        <div className={style.coin}>{arr[0].doc.backpack.coins.gp}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>pp</div>
                                        <div className={style.coin}>{arr[0].doc.backpack.coins.pp}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className={style.backpack}>{arr[0].doc.backpack.items}</div>
                                </div>
                            </div>
                            <div className={style.backpacktext}>backpack</div>
                        </div>
                    </div>
                    <div className={style.box}> 
                        <div className={style.identitybox}>
                            <div className={style.idenbox} style={{borderTopLeftRadius:"20%",borderTopRightRadius:"20%"}}>
                                <div className={style.identext} style={{height:"75px"}}>{arr[0].doc.traits.personality}</div>
                                <div className={style.identext}>personality</div>
                            </div>
                            <div className={style.idenbox}>
                                <div className={style.identext} style={{height:"75px"}}>{arr[0].doc.traits.ideals}</div>
                                <div className={style.identext}>ideals</div>
                            </div>
                            <div className={style.idenbox}>
                                <div className={style.identext} style={{height:"75px"}}>{arr[0].doc.traits.bonds}</div>
                                <div className={style.identext}>bonds</div>
                            </div>
                            <div className={style.idenbox} style={{borderBottomLeftRadius:"20%",borderBottomRightRadius:"20%"}}>
                                <div className={style.identext} style={{height:"75px"}}>{arr[0].doc.traits.flaws}</div>
                                <div className={style.identext}>flaws</div>
                            </div>
                        </div>
                        <div className={style.traitbox}>
                            <div style={{height:"95%",overflowY:"auto"}}>
                                {arr[0].doc.traits.features.map(e=><div className={style.traittext}>
                                    <div>{e.title}</div>
                                    <div>{e.desc}</div>
                                </div>)}
                            </div>
                            <div className={style.traithead}>features & traits</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.page}>
                <div className={style.appearancebox}>
                    <div className={style.charnamebox}>
                            <div className={style.charnametext}>{arr[0].doc.chardesc.name}</div>
                            <div style={{textAlign:"center"}}>Character Name</div>
                        </div>
                    <div className={style.appdescbox}>
                        <div className={style.descbox}>
                            <div className={style.desctext}>{arr[0].doc.chardesc.age}</div>
                            <div className={style.deschead}>age</div>
                            <div className={style.desctext}>{arr[0].doc.chardesc.eyes}</div>
                            <div className={style.deschead}>eyes</div>
                        </div>
                        <div className={style.descbox}>
                            <div className={style.desctext}>{arr[0].doc.chardesc.height}</div>
                            <div className={style.deschead}>height</div>
                            <div className={style.desctext}>{arr[0].doc.chardesc.skin}</div>
                            <div className={style.deschead}>skin</div>
                        </div>
                        <div className={style.descbox}>
                            <div className={style.desctext}>{arr[0].doc.chardesc.weight}</div>
                            <div className={style.deschead}>weight</div>
                            <div className={style.desctext}>{arr[0].doc.chardesc.hair}</div>
                            <div className={style.deschead}>hair</div>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.imgbox}>
                        <img className={style.img} alt='' src={arr[0].doc._attachments.image.data}></img>
                        <div className={style.imgtext}>character appearance</div>
                    </div>
                    <div className={style.alliesbox}>
                        <div className={style.alliestext}>{arr[0].doc.chardesc.allies}</div>
                        <div className={style.allieshead}>allies & organization</div>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.backstorybox}>
                        <div className={style.backstorytext}>{arr[0].doc.chardesc.backstory}</div>
                        <div className={style.backstoryhead}>Character Backstory</div>
                    </div>
                    <div>
                        <div className={style.additionalbox}>
                            <div style={{overflowY:"auto",height:"87%"}}>
                            {arr[0].doc.traits.additionalfeatures.map(e=><div className={style.additionaltext}>
                                <div>{e.title}</div>
                                <div>{e.desc}</div>
                            </div>)}
                            </div>
                            <div className={style.additionalhead}>Additional Features & Traits</div>
                        </div>
                        <div className={style.treasurebox}>
                            <div className={style.treasuretext}>{arr[0].doc.backpack.treasure}</div>
                            <div className={style.treasurehead}>Treasure</div>
                        </div>
                    </div>
                </div>
            </div></div></div>}</div>:<div>
                <button className={style.pdfBut} onClick={()=>downloadPdf()}>Download pdf</button>
                <div >
                <div ref={ref} className={style.page}>  
                <div className={style.pagetop}>
                        <div className={style.charnamebox}>
                            <div className={style.charnametext}>{arr[0].doc.chardesc.name}</div>
                            <div style={{textAlign:"center"}}>Character Name</div>
                        </div>
                        <div className={style.chardescbox}>
                            <div style={{display:'flex'}}>
                                <div className={style.charbox} style={{marginLeft:"5%"}}>
                                    <div style={{display:"flex"}}>
                                        <div className={style.chartext} style={{marginLeft:"5%"}}>{arr[0].doc.chardesc.class}</div>
                                        <div className={style.chartext} style={{marginLeft:"10%"}}>{arr[0].doc.chardesc.level}</div>
                                    </div>
                                    <div className={style.charhead}>Class & Level</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"10%"}}>
                                    <div className={style.chartext}>{arr[0].doc.chardesc.background}</div>
                                    <div className={style.charhead}>Background</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"14%"}}>
                                    <div className={style.chartext}>{arr[0].doc.chardesc.player}</div>
                                    <div className={style.charhead}>Player Name</div>
                                </div>
                            </div>
                            <div style={{display:'flex'}}>
                                <div className={style.charbox} style={{marginLeft:"5%"}}>
                                    <div className={style.chartext}>{arr[0].doc.chardesc.race}</div>
                                    <div className={style.charhead}>Race</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"20%"}}>
                                    <div className={style.chartext}>{arr[0].doc.chardesc.aligment}</div>
                                    <div className={style.charhead}>Aligment</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"15%"}}>
                                    <div className={style.chartext}>{arr[0].doc.chardesc.experience}</div>
                                    <div className={style.charhead}>Experience Points</div>
                                </div>
                            </div>
                        </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.box}>
                        <div>
                            <div className={style.profbox}>
                                <div className={style.proftext}>
                                    Proficiency Bonus
                                </div>
                                <div className={style.profbonus}>
                                    +{arr[0].doc.stats.proficiency}
                                </div>
                            </div>
                            <div className={style.insbox}>
                                <div className={style.instext}>
                                    inspiration
                                </div>
                                <div className={style.insbonus}>
                                    {arr[0].doc.stats.inspiration}
                                </div>
                            </div>
                            <div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.strengthbonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.strength}
                                        </div>
                                        <div className={style.stattext}>
                                            strength
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.strengthsave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {arr[0].doc.skills.strengthsave ? parseInt(arr[0].doc.stats.strengthbonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.strengthbonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.athletics} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {arr[0].doc.skills.athletics ? parseInt(arr[0].doc.stats.strengthbonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.strengthbonus}
                                                </div>
                                                <div>
                                                    athletics
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.dexteritybonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.dexterity}
                                        </div>
                                        <div className={style.stattext}>
                                            dexterity
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.dexteritysave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {arr[0].doc.skills.dexteritysave ? parseInt(arr[0].doc.stats.dexteritybonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.dexteritybonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.acrobatics} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.acrobatics ? parseInt(arr[0].doc.stats.dexteritybonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.dexteritybonus}
                                                </div>
                                                <div>
                                                    acrobatics
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.sleightofhand} type='checkbox'/>
                                                <div  className={style.skillbonus}>
                                                {arr[0].doc.skills.sleightofhand ? parseInt(arr[0].doc.stats.dexteritybonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.dexteritybonus}
                                                </div>
                                                <div style={{textAlignLast:"right"}}>
                                                    sleight of hand
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.stealth} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.stealth ? parseInt(arr[0].doc.stats.dexteritybonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.dexteritybonus}
                                                </div>
                                                <div>
                                                    stealth
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.constitutionbonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.constitution}
                                        </div>
                                        <div className={style.stattext}>
                                            constitution
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.constitutionsave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.constitutionsave ? parseInt(arr[0].doc.stats.constitutionbonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.constitutionbonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.intelligencebonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.intelligence}
                                        </div>
                                        <div className={style.stattext}>
                                            intelligence
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.intelligencesave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.intelligencesave ? parseInt(arr[0].doc.stats.intelligencebonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.arcana} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.arcana ? parseInt(arr[0].doc.stats.intelligencebonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    arcana
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.history} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.history ? parseInt(arr[0].doc.stats.intelligencebonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    history
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.investigation} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.investigation ? parseInt(arr[0].doc.stats.intelligencebonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    investigation
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.nature} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.nature ? parseInt(arr[0].doc.stats.intelligencebonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    nature
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.religion} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.religion ? parseInt(arr[0].doc.stats.intelligencebonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    religion
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.wisdombonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.wisdom}
                                        </div>
                                        <div className={style.stattext}>
                                            wisdom
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.wisdomsave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.wisdomsave ? parseInt(arr[0].doc.stats.wisdombonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.animalhandling} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.animalhandling ? parseInt(arr[0].doc.stats.wisdombonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    animal handling
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.insight} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.insight ? parseInt(arr[0].doc.stats.wisdombonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    insight
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.medicine} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.medicine ? parseInt(arr[0].doc.stats.wisdombonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    medicine
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.perception} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.perception ? parseInt(arr[0].doc.stats.wisdombonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    perception
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.survival} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.survival ? parseInt(arr[0].doc.stats.wisdombonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    survival
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr[0].doc.stats.charismabonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr[0].doc.stats.charisma}
                                        </div>
                                        <div className={style.stattext}>
                                            charisma
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.charismasave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.charismasave ? parseInt(arr[0].doc.stats.charismabonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.charismabonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.deception} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.deception ? parseInt(arr[0].doc.stats.charismabonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.charismabonus}
                                                </div>
                                                <div>
                                                    deception
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.intimidation} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.intimidation ? parseInt(arr[0].doc.stats.charismabonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.charismabonus}
                                                </div>
                                                <div>
                                                    intimidation
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.performance} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.performance ? parseInt(arr[0].doc.stats.charismabonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.charismabonus}
                                                </div>
                                                <div>
                                                    performance
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr[0].doc.skills.persuasion} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr[0].doc.skills.persuasion ? parseInt(arr[0].doc.stats.charismabonus)+parseInt(arr[0].doc.stats.proficiency):arr[0].doc.stats.charismabonus}
                                                </div>
                                                <div>
                                                    persuasion
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={style.perbox}>
                                <div className={style.perbonus}>{arr[0].doc.skills.perception ? 8+parseInt(arr[0].doc.stats.wisdombonus)+parseInt(arr[0].doc.stats.proficiency):8+parseInt(arr[0].doc.stats.wisdombonus)}</div>
                                <div style={{alignSelf:"center"}}>passive perception (wisdom)</div>
                            </div>
                            <div>
                                <div className={style.langbox}>
                                    <div style={{overflowWrap:"break-word",overflowY:"auto"}}>{arr[0].doc.traits.profnlang.prof} {arr[0].doc.traits.profnlang.lang}</div>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>proficiencies & languages</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.box}>
                        <div style={{backgroundColor:"lightgray"}}>
                            <div style={{display:"flex"}}>
                                <div className={style.arbox}>
                                    <div>{arr[0].doc.stats.armor}</div>
                                    <div style={{fontWeight:"bold"}}>armor</div>
                                </div>
                                <div className={style.chabox}>
                                    <div>{arr[0].doc.stats.dexteritybonus}</div>
                                    <div style={{fontWeight:"bold"}}>initiative</div>
                                </div>
                                <div className={style.chabox}>
                                    <div>{arr[0].doc.stats.speed}</div>
                                    <div style={{fontWeight:"bold"}}>speed</div>
                                </div>
                            </div>
                            <div className={style.hpbox}>
                                <div style={{display:"flex",borderBottom:"1px solid black"}}>
                                    <div className={style.maxhptext}>hit poins maximum</div>
                                    <div className={style.maxhpnum}>{arr[0].doc.stats.hpmax}</div>
                                </div>
                                <div>
                                    <div className={style.curhpnum}>{arr[0].doc.stats.curhp}</div>
                                    <div className={style.curhptext}>current hit points</div>
                                </div>
                            </div>
                            <div className={style.tempbox}>
                                <div>{arr[0].doc.stats.temphp}</div>
                                <div className={style.temphptext}>temporary hit points</div>
                            </div>
                            <div className={style.deathbox}>
                                <div className={style.hitdicebox}>
                                    <div style={{display:"flex",textDecoration:"underline"}}>
                                        <div className={style.hitdicetext}>total</div>
                                        <div className={style.totalhitdice}>{arr[0].doc.stats.totalhitdice}</div>
                                    </div>
                                    <div>
                                        <div>{arr[0].doc.stats.hitdice}</div>
                                        <div className={style.hitdicetext}>hit dice</div>
                                    </div>
                                </div>
                                <div className={style.deathsavebox}>
                                    <div style={{display:"flex"}}>
                                        <div className={style.deathtext}>successes</div>
                                        <div style={{display:"flex"}}>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.success1}/>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.success2}/>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.success3}/>
                                        </div>
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <div className={style.deathtext} style={{marginRight:"12%"}}>failures</div>
                                        <div style={{display:"flex"}}>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.failure1}/>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.failure2}/>
                                            <input type='checkbox' disabled={true} checked={arr[0].doc.stats.failure3}/>
                                        </div>
                                    </div>
                                    <div style={{textAlign:"center",}}>death saves</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={style.weaponbox}>
                                <table style={{backgroundColor:"lightgrey",marginBottom:"2%"}}>
                                    <tr>
                                        <th style={{backgroundColor:"beige"}}>name</th>
                                        <th style={{backgroundColor:"beige"}}>atk bonus</th>
                                        <th style={{backgroundColor:"beige"}}>dagame/type</th>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon1}</td>
                                        <td className={style.weaponcolumn}>+{arr[0].doc.stats.strengthbonus}</td>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon1dmg}</td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon2}</td>
                                        <td className={style.weaponcolumn}>+{arr[0].doc.stats.dexteritybonus}</td>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon2dmg}</td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon3}</td>
                                        <td className={style.weaponcolumn}>+{arr[0].doc.stats.dexteritybonus}</td>
                                        <td className={style.weaponcolumn}>{arr[0].doc.backpack.attack.weapon3dmg}</td>
                                    </tr>
                                </table>
                                <div>
                                    <textarea readOnly={true} className={style.weaponother} value={arr[0].doc.backpack.attack.other}></textarea>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>attacks and spellcasting</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.bagbox}>
                            <div style={{display:"flex"}}>
                                <div >
                                    <div className={style.coinbox}>
                                        <div>cp</div>
                                        <div className={style.coin}>{arr[0].doc.backpack.coins.cp}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>sp</div>
                                        <div className={style.coin}>{arr[0].doc.backpack.coins.sp}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>ep</div>
                                        <div className={style.coin}>{arr[0].doc.backpack.coins.ep}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>gp</div>
                                        <div className={style.coin}>{arr[0].doc.backpack.coins.gp}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>pp</div>
                                        <div className={style.coin}>{arr[0].doc.backpack.coins.pp}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className={style.backpack}>{arr[0].doc.backpack.items}</div>
                                </div>
                            </div>
                            <div className={style.backpacktext}>backpack</div>
                        </div>
                    </div>
                    <div className={style.box}> 
                        <div className={style.identitybox}>
                            <div className={style.idenbox} style={{borderTopLeftRadius:"20%",borderTopRightRadius:"20%"}}>
                                <div className={style.identext} style={{height:"75px"}}>{arr[0].doc.traits.personality}</div>
                                <div className={style.identext}>personality</div>
                            </div>
                            <div className={style.idenbox}>
                                <div className={style.identext} style={{height:"75px"}}>{arr[0].doc.traits.ideals}</div>
                                <div className={style.identext}>ideals</div>
                            </div>
                            <div className={style.idenbox}>
                                <div className={style.identext} style={{height:"75px"}}>{arr[0].doc.traits.bonds}</div>
                                <div className={style.identext}>bonds</div>
                            </div>
                            <div className={style.idenbox} style={{borderBottomLeftRadius:"20%",borderBottomRightRadius:"20%"}}>
                                <div className={style.identext} style={{height:"75px"}}>{arr[0].doc.traits.flaws}</div>
                                <div className={style.identext}>flaws</div>
                            </div>
                        </div>
                        <div className={style.traitbox}>
                            <div style={{height:"95%",overflowY:"auto"}}>
                                {arr[0].doc.traits.features.map(e=><div className={style.traittext}>
                                    <div>{e.title}</div>
                                    <div>{e.desc}</div>
                                </div>)}
                            </div>
                            <div className={style.traithead}>features & traits</div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={ref2} className={style.page}>
                <div className={style.appearancebox}>
                    <div className={style.charnamebox}>
                            <div className={style.charnametext}>{arr[0].doc.chardesc.name}</div>
                            <div style={{textAlign:"center"}}>Character Name</div>
                        </div>
                    <div className={style.appdescbox}>
                        <div className={style.descbox}>
                            <div className={style.desctext}>{arr[0].doc.chardesc.age}</div>
                            <div className={style.deschead}>age</div>
                            <div className={style.desctext}>{arr[0].doc.chardesc.eyes}</div>
                            <div className={style.deschead}>eyes</div>
                        </div>
                        <div className={style.descbox}>
                            <div className={style.desctext}>{arr[0].doc.chardesc.height}</div>
                            <div className={style.deschead}>height</div>
                            <div className={style.desctext}>{arr[0].doc.chardesc.skin}</div>
                            <div className={style.deschead}>skin</div>
                        </div>
                        <div className={style.descbox}>
                            <div className={style.desctext}>{arr[0].doc.chardesc.weight}</div>
                            <div className={style.deschead}>weight</div>
                            <div className={style.desctext}>{arr[0].doc.chardesc.hair}</div>
                            <div className={style.deschead}>hair</div>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.imgbox}>
                        <img className={style.img} alt='' src={arr[0].doc._attachments.image.data}></img>
                        <div className={style.imgtext}>character appearance</div>
                    </div>
                    <div className={style.alliesbox}>
                        <div className={style.alliestext}>{arr[0].doc.chardesc.allies}</div>
                        <div className={style.allieshead}>allies & organization</div>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.backstorybox}>
                        <div className={style.backstorytext}>{arr[0].doc.chardesc.backstory}</div>
                        <div className={style.backstoryhead}>Character Backstory</div>
                    </div>
                    <div>
                        <div className={style.additionalbox}>
                            <div style={{overflowY:"auto",height:"87%"}}>
                            {arr[0].doc.traits.additionalfeatures.map(e=><div className={style.additionaltext}>
                                <div>{e.title}</div>
                                <div>{e.desc}</div>
                            </div>)}
                            </div>
                            <div className={style.additionalhead}>Additional Features & Traits</div>
                        </div>
                        <div className={style.treasurebox}>
                            <div className={style.treasuretext}>{arr[0].doc.backpack.treasure}</div>
                            <div className={style.treasurehead}>Treasure</div>
                        </div>
                    </div>
                </div>
            </div></div></div>}</div>:<div/>}
            
        </div>
    )
}