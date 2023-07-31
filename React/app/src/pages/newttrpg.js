import React, { useState } from 'react'
import axios from 'axios'
import style from './newttrpg.module.css'
import {useAlert} from 'react-alert'

export default function Newttrpg(){

    let alert = useAlert()
    const [image,setImage]=useState({})    
    const [features,setFeatures]=useState([])
    const [featuretitle,setFeaturetitle]=useState('')
    const [featuredesc,setFeaturedesc]=useState('')
    const [additionalfeatures,setAdditionalfeatures]=useState([])
    const [name,setName]=useState('')
    const [clas,setClass]=useState('')
    const [level,setLevel]=useState('')
    const [background,setBackground]=useState('')
    const [player,setPlayer]=useState('')
    const [race,setRace]=useState('')
    const [aligment,setAligment]=useState('')
    const [experience,setExperience]=useState('')
    const [age,setAge]=useState('')
    const [height,setHeight]=useState('')
    const [weight,setWeight]=useState('')
    const [eyes,setEyes]=useState('')
    const [skin,setSkin]=useState('')
    const [hair,setHair]=useState('')
    const [allies,setAllies]=useState('')
    const [backstory,setBackstory]=useState('')
    const [appearance,setAppearance]=useState()
    const [proficiency,setProficiency]=useState(0)
    const [inspiration,setInspiration]=useState('')
    const [strength,setStrenght]=useState(0)
    const [strengthbonus,setStrenghtbonus]=useState(0)
    const [dexterity,setDexterity]=useState(0)
    const [dexteritybonus,setDexteritybonus]=useState(0)
    const [constitution,setConstitution]=useState(0)
    const [constitutionbonus,setConstitutionbonus]=useState(0)
    const [intelligence,setIntelligence]=useState(0)
    const [intelligencebonus,setIntelligencebonus]=useState(0)
    const [wisdom,setWisdom]=useState(0)
    const [wisdombonus,setWisdombonus]=useState(0)
    const [charisma,setCharisma]=useState(0)
    const [charismabonus,setCharismabonus]=useState(0)
    const [speed,setSpeed]=useState(0)
    const [armor,setArmor]=useState(0)
    const [hpmax,setHpmax]=useState(0)
    const [curhp,setCurhp]=useState(0)
    const [temphp,setTemphp]=useState(0)
    const [totalhitdice,setTotalhitdice]=useState(0)
    const [hitdice,setHitdice]=useState('')
    const [success1,setSuccess1]=useState(false)
    const [success2,setSuccess2]=useState(false)
    const [success3,setSuccess3]=useState(false)
    const [failure1,setFailure1]=useState(false)
    const [failure2,setFailure2]=useState(false)
    const [failure3,setFailure3]=useState(false)
    const [personality,setPersonality]=useState('')
    const [ideals,setIdeals]=useState('')
    const [bonds,setBonds]=useState('')
    const [flaws,setFlaws]=useState('')
    const [prof,setprof]=useState('')
    const [lang,setLang]=useState('')
    const [cp,setCp]=useState(0)
    const [sp,setSp]=useState(0)
    const [ep,setEp]=useState(0)
    const [gp,setGp]=useState(0)
    const [pp,setPp]=useState(0)
    const [weapon1,setWeapon1]=useState('')
    const [weapon2,setWeapon2]=useState('')
    const [weapon3,setWeapon3]=useState('')
    const [weapon1dmg,setWeapon1dmg]=useState('')
    const [weapon2dmg,setWeapon2dmg]=useState('')
    const [weapon3dmg,setWeapon3dmg]=useState('')
    const [weaponother,setWeaponother]=useState('')
    const [items,setItems]=useState('')
    const [treasure,setTreasure]=useState('')
    const [strengthsave,setStrenghtsave]=useState(false)
    const [dexteritysave,setDexteritysave]=useState(false)
    const [constitutionsave,setConstitutionsave]=useState(false)
    const [intelligencesave,setIntelligencesave]=useState(false)
    const [wisdomsave,setWisdomsave]=useState(false)
    const [charismasave,setCharismasave]=useState(false)
    const [athletics,setAthletics]=useState(false)
    const [acrobatics,setAcrobatics]=useState(false)
    const [sleightofhand,setSleightofhand]=useState(false)
    const [stealth,setStealth]=useState(false)
    const [arcana,setArcana]=useState(false)
    const [history,setHistory]=useState(false)
    const [investigation,setInvestigation]=useState(false)
    const [nature,setNature]=useState(false)
    const [religion,setReligion]=useState(false)
    const [animalhandling,setAnimalhandling]=useState(false)
    const [insight,setInsight]=useState(false)
    const [medicine,setMedicine]=useState(false)
    const [perception,setPerception]=useState(false)
    const [survival,setSurvival]=useState(false)
    const [deception,setDeception]=useState(false)
    const [intimidation,setIntimidation]=useState(false)
    const [performance,setPerformance]=useState(false)
    const [persuasion,setPersuasion]=useState(false)


    function handlefeature(){
        let arr = [...features]
        arr.push({
            title:featuretitle,
            desc:featuredesc
        })
        setFeatures(arr)
    }

    function handleadditionalfeature(){
        let arr = [...additionalfeatures]
        arr.push({
            title:featuretitle,
            desc:featuredesc
        })
        setAdditionalfeatures(arr)
    }

    function handleImage(e){
        imgtobase64(e)
        setAppearance(URL.createObjectURL(e.target.files[0]))
    }

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

    function handlesave(){
        let document ={
            save:{
            "userid":sessionStorage.getItem("id"),
            chardesc:{
                "name":name,
                "class":clas,
                "race":race,
                "level":level,
                "background":background,
                "player":player,
                "aligment":aligment,
                "experience":experience,
                "age":age,
                "height":height,
                "weight":weight,
                "eyes":eyes,
                "skin":skin,
                "hair":hair,
                "allies":allies,
                "backstory":backstory
            },
            "stats":{
                "proficiency":proficiency,
                "inspiration":inspiration,
                "strength":strength,
                "strengthbonus":strengthbonus,
                "dexterity":dexterity,
                "dexteritybonus":dexteritybonus,
                "constitution":constitution,
                "constitutionbonus":constitutionbonus,
                "intelligence":intelligence,
                "intelligencebonus":intelligencebonus,
                "wisdom":wisdom,
                "wisdombonus":wisdombonus,
                "charisma":charisma,
                "charismabonus":charismabonus,
                "speed":speed,
                "armor":armor,
                "hpmax":hpmax,
                "curhp":curhp,
                "temphp":temphp,
                "totalhitdice":totalhitdice,
                "hitdice":hitdice,
                "success1":success1,
                "success2":success2,
                "success3":success3,
                "failure1":failure1,
                "failure2":failure2,
                "failure3":failure3
            },
            "traits":{
                "personality":personality,
                "ideals":ideals,
                "bonds":bonds,
                "flaws":flaws,
                "features":features,
                "profnlang":{
                    "prof":prof,
                    "lang":lang
                },
                "additionalfeatures":additionalfeatures
            },
            "backpack":{
                "coins":{
                    "cp":cp,
                    "sp":sp,
                    "ep":ep,
                    "gp":gp,
                    "pp":pp
                },
                "attack":{
                    "weapon1":weapon1,
                    "weapon1dmg":weapon1dmg,
                    "weapon2":weapon2,
                    "weapon2dmg":weapon2dmg,
                    "weapon3":weapon3,
                    "weapon3dmg":weapon3dmg,
                    "other":weaponother
                },
                "items":items,
                "treasure":treasure
            },
            "skills":{
                "strengthsave":strengthsave,
                "dexteritysave":dexteritysave,
                "constitutionsave":constitutionsave,
                "intelligencesave":intelligencesave,
                "wisdomsave":wisdomsave,
                "charismasave":charismasave,
                "athletics":athletics,
                "acrobatics":acrobatics,
                "sleightofhand":sleightofhand,
                "stealth":stealth,
                "arcana":arcana,
                "history":history,
                "investigation":investigation,
                "nature":nature,
                "religion":religion,
                "animalhandling":animalhandling,
                "insight":insight,
                "medicine":medicine,
                "perception":perception,
                "survival":survival,
                "deception":deception,
                "intimidation":intimidation,
                "performance":performance,
                "persuasion":persuasion
            },
            _attachments:{
                "image":{
                    "content_type":image.type,
                    "data":image.file
                }
            }
        }
        }
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/post-ttrpg.json",document)
        .then(response=>{
            if(response.data.result.ok){
                alert.success("Data was successfully saved")
            }
            console.log(response)
        })
        .catch(err=>{
            alert.error("error happened try again later")
            console.log(err)
        })
    }
    
    return(
        <div>
            <div>
                <button style={{textAlign:"center",margin:"1%"}} onClick={()=>handlesave()}>save file</button>
            </div>
            <div className={style.page}>  
                <div className={style.pagetop}>
                        <div className={style.charnamebox}>
                            <div className={style.charnametext}><input placeholder='Character name' onChange={(event)=>setName(event.target.value)} type="text"/></div>
                            <div style={{textAlign:"center"}}>Character Name</div>
                        </div>
                        <div className={style.chardescbox}>
                            <div style={{display:'flex'}}>
                                <div className={style.charbox} style={{marginLeft:"5%"}}>
                                    <div style={{display:"flex"}}>
                                        <div ><input className={style.chartext} style={{marginLeft:"5%",width:"60px"}} placeholder='Class' onChange={(event)=>setClass(event.target.value)} type="text"/></div>
                                        <div ><input className={style.chartext} style={{marginLeft:"10%",width:"20px"}} placeholder='Lvl' onChange={(event)=>setLevel(event.target.value)} type="text"/></div>
                                    </div>
                                    <div className={style.charhead}>Class & Level</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"10%"}}>
                                    <div className={style.chartext}><input style={{width:"80px"}} placeholder='Background' onChange={(event)=>setBackground(event.target.value)} type="text"/></div>
                                    <div className={style.charhead}>Background</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"14%"}}>
                                    <div className={style.chartext}><input style={{width:"80px"}} placeholder='Player' onChange={(event)=>setPlayer(event.target.value)} type="text"/></div>
                                    <div className={style.charhead}>Player Name</div>
                                </div>
                            </div>
                            <div style={{display:'flex'}}>
                                <div className={style.charbox} style={{marginLeft:"5%"}}>
                                    <div className={style.chartext}><input style={{width:"60px"}} placeholder='Race' onChange={(event)=>setRace(event.target.value)} type="text"/></div>
                                    <div className={style.charhead}>Race</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"16%"}}>
                                    <div className={style.chartext}><input style={{width:"80px"}} placeholder='Aligment' onChange={(event)=>setAligment(event.target.value)} type="text"/></div>
                                    <div className={style.charhead}>Aligment</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"15%"}}>
                                    <div className={style.chartext}><input style={{width:"80px"}} placeholder='Experience' onChange={(event)=>setExperience(event.target.value)} type="text"/></div>
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
                                    +<input style={{width:"10px",marginRight:"5px"}} type="number" onChange={(event)=>setProficiency(event.target.value)}/>
                                </div>
                            </div>
                            <div className={style.insbox}>
                                <div className={style.instext}>
                                    inspiration
                                </div>
                                <div className={style.insbonus}>
                                    <input style={{width:"25px"}} type="text" onChange={(event)=>setInspiration(event.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setStrenghtbonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setStrenght(event.target.value)}/>
                                        </div>
                                        <div className={style.stattext}>
                                            strength
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={strengthsave} onChange={()=>setStrenghtsave(!strengthsave)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {strengthsave ? parseInt(strengthbonus)+parseInt(proficiency):strengthbonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={athletics} onChange={()=>setAthletics(!athletics)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {athletics ?  parseInt(strengthbonus)+parseInt(proficiency):strengthbonus}
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
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setDexteritybonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setDexterity(event.target.value)}/>
                                        </div>
                                        <div className={style.stattext}>
                                            dexterity
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={dexteritysave} onChange={()=>setDexteritysave(!dexteritysave)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {dexteritysave ? parseInt(dexteritybonus)+parseInt(proficiency):dexteritybonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={acrobatics} onChange={()=>setAcrobatics(!acrobatics)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {acrobatics ? parseInt(dexteritybonus)+parseInt(proficiency):dexteritybonus}
                                                </div>
                                                <div>
                                                    acrobatics
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={sleightofhand} onChange={()=>setSleightofhand(!sleightofhand)} type='checkbox'/>
                                                <div  className={style.skillbonus}>
                                                {sleightofhand ? parseInt(dexteritybonus)+parseInt(proficiency):dexteritybonus}
                                                </div>
                                                <div style={{textAlignLast:"right"}}>
                                                    sleight of hand
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={stealth} onChange={()=>setStealth(!stealth)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {stealth ? parseInt(dexteritybonus)+parseInt(proficiency):dexteritybonus}
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
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setConstitutionbonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setConstitution(event.target.value)}/>
                                        </div>
                                        <div className={style.stattext}>
                                            constitution
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={constitutionsave} onChange={()=>setConstitutionsave(!constitutionsave)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {constitutionsave ? parseInt(constitutionbonus)+parseInt(proficiency):constitutionbonus}
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
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setIntelligencebonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setIntelligence(event.target.value)}/>
                                        </div>
                                        <div className={style.stattext}>
                                            intelligence
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={intelligencesave} onChange={()=>setIntelligencesave(!intelligencesave)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {intelligencesave ? parseInt(intelligencebonus)+parseInt(proficiency):intelligencebonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={arcana} onChange={()=>setArcana(!arcana)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arcana ? parseInt(intelligencebonus)+parseInt(proficiency):intelligencebonus}
                                                </div>
                                                <div>
                                                    arcana
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={history} onChange={()=>setHistory(!history)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {history ? parseInt(intelligencebonus)+parseInt(proficiency):intelligencebonus}
                                                </div>
                                                <div>
                                                    history
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={investigation} onChange={()=>setInvestigation(!investigation)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {investigation ? parseInt(intelligencebonus)+parseInt(proficiency):intelligencebonus}
                                                </div>
                                                <div>
                                                    investigation
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={nature} onChange={()=>setNature(!nature)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {nature ? parseInt(intelligencebonus)+parseInt(proficiency):intelligencebonus}
                                                </div>
                                                <div>
                                                    nature
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={religion} onChange={()=>setReligion(!religion)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {religion ? parseInt(intelligencebonus)+parseInt(proficiency):intelligencebonus}
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
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setWisdombonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setWisdom(event.target.value)}/>
                                        </div>
                                        <div className={style.stattext}>
                                            wisdom
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={wisdomsave} onChange={()=>setWisdomsave(!wisdomsave)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {wisdomsave ? parseInt(wisdombonus)+parseInt(proficiency):wisdombonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={animalhandling} onChange={()=>setAnimalhandling(!animalhandling)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {animalhandling ? parseInt(wisdombonus)+parseInt(proficiency):wisdombonus}
                                                </div>
                                                <div>
                                                    animal handling
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={insight} onChange={()=>setInsight(!insight)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {insight ? parseInt(wisdombonus)+parseInt(proficiency):wisdombonus}
                                                </div>
                                                <div>
                                                    insight
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={medicine} onChange={()=>setMedicine(!medicine)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {medicine ? parseInt(wisdombonus)+parseInt(proficiency):wisdombonus}
                                                </div>
                                                <div>
                                                    medicine
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={perception} onChange={()=>setPerception(!perception)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {perception ? parseInt(wisdombonus)+parseInt(proficiency):wisdombonus}
                                                </div>
                                                <div>
                                                    perception
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={survival} onChange={()=>setSurvival(!survival)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {survival ? parseInt(wisdombonus)+parseInt(proficiency):wisdombonus}
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
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setCharismabonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} type="number" onChange={(event)=>setCharisma(event.target.value)}/>
                                        </div>
                                        <div className={style.stattext}>
                                            charisma
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={charismasave} onChange={()=>setCharismasave(!charismasave)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {charismasave ? parseInt(charismabonus)+parseInt(proficiency):charismabonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={deception} onChange={()=>setDeception(!deception)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {deception ? parseInt(charismabonus)+parseInt(proficiency):charismabonus}
                                                </div>
                                                <div>
                                                    deception
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={intimidation} onChange={()=>setIntimidation(!intimidation)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {intimidation ? parseInt(charismabonus)+parseInt(proficiency):charismabonus}
                                                </div>
                                                <div>
                                                    intimidation
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={performance} onChange={()=>setPerformance(!performance)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {performance ? parseInt(charismabonus)+parseInt(proficiency):charismabonus}
                                                </div>
                                                <div>
                                                    performance
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input checked={persuasion} onChange={()=>setPersuasion(!persuasion)} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {persuasion ? parseInt(charismabonus)+parseInt(proficiency):charismabonus}
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
                                <div className={style.perbonus}>{perception ? 8+parseInt(wisdombonus)+parseInt(proficiency):8+parseInt(wisdombonus)}</div>
                                <div style={{alignSelf:"center"}}>passive perception (wisdom)</div>
                            </div>
                            <div>
                                <div className={style.langbox}>
                                    <textarea placeholder='proficiencies here' onChange={(event)=>setprof(event.target.value)} style={{resize:"none",width:"250px",height:"100px",marginLeft:"5px",marginTop:"5px"}}/>
                                    <textarea placeholder='languages here' onChange={(event)=>setLang(event.target.value)} style={{resize:"none",width:"250px",height:"100px",marginLeft:"5px",marginTop:"5px"}}/>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>proficiencies & languages</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.box}>
                        <div style={{backgroundColor:"lightgray"}}>
                            <div style={{display:"flex"}}>
                                <div className={style.arbox}>
                                    <input style={{width:"25px",textAlign:"center"}} type='number' onChange={(event)=>setArmor(event.target.value)}/>
                                    <div style={{fontWeight:"bold"}}>armor</div>
                                </div>
                                <div className={style.chabox}>
                                    <div>{dexteritybonus}</div>
                                    <div style={{fontWeight:"bold"}}>initiative</div>
                                </div>
                                <div className={style.chabox}>
                                    <input style={{width:"25px",textAlign:"center"}} type='number' onChange={(event)=>setSpeed(event.target.value)}/>
                                    <div style={{fontWeight:"bold"}}>speed</div>
                                </div>
                            </div>
                            <div className={style.hpbox}>
                                <div style={{display:"flex",borderBottom:"1px solid black"}}>
                                    <div className={style.maxhptext}>hit poins maximum</div>
                                    <input style={{width:"25px",textAlign:"center"}} type='number' onChange={(event)=>setHpmax(event.target.value)}/>
                                </div>
                                <div>
                                    <input style={{width:"25px",textAlign:"center",marginLeft:"42%"}} type='number' onChange={(event)=>setCurhp(event.target.value)}/>
                                    <div className={style.curhptext}>current hit points</div>
                                </div>
                            </div>
                            <div className={style.tempbox}>
                                <input style={{width:"25px",textAlign:"center"}} type='number' onChange={(event)=>setTemphp(event.target.value)}/>
                                <div className={style.temphptext}>temporary hit points</div>
                            </div>
                            <div className={style.deathbox}>
                                <div className={style.hitdicebox}>
                                    <div style={{display:"flex",textDecoration:"underline"}}>
                                        <div className={style.hitdicetext}>total</div>
                                        <input style={{width:"25px",textAlign:"center"}} type='number' onChange={(event)=>setTotalhitdice(event.target.value)}/>
                                    </div>
                                    <div>
                                    <input style={{width:"25px",textAlign:"center"}} type='text' onChange={(event)=>setHitdice(event.target.value)}/>
                                        <div className={style.hitdicetext}>hit dice</div>
                                    </div>
                                </div>
                                <div className={style.deathsavebox}>
                                    <div style={{display:"flex"}}>
                                        <div className={style.deathtext}>successes</div>
                                        <div style={{display:"flex"}}>
                                            <input type='checkbox' checked={success1} onChange={()=>setSuccess1(!success1)}/>
                                            <input type='checkbox' checked={success2} onChange={()=>setSuccess2(!success2)}/>
                                            <input type='checkbox' checked={success3} onChange={()=>setSuccess3(!success3)}/>
                                        </div>
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <div className={style.deathtext} style={{marginRight:"12%"}}>failures</div>
                                        <div style={{display:"flex"}}>
                                            <input type='checkbox' checked={failure1} onChange={()=>setFailure1(!failure1)}/>
                                            <input type='checkbox' checked={failure2} onChange={()=>setFailure2(!failure2)}/>
                                            <input type='checkbox' checked={failure3} onChange={()=>setFailure3(!failure3)}/>
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
                                        <td className={style.weaponcolumn}><input style={{width:"40px"}} type='text' onChange={(event)=>setWeapon1(event.target.value)}/></td>
                                        <td className={style.weaponcolumn}>+<select><option>{strengthbonus}</option><option>{dexteritybonus}</option></select></td>
                                        <td className={style.weaponcolumn}><input style={{width:"90px"}} type='text' onChange={(event)=>setWeapon1dmg(event.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}><input style={{width:"40px"}} type='text' onChange={(event)=>setWeapon2(event.target.value)}/></td>
                                        <td className={style.weaponcolumn}>+<select><option>{strengthbonus}</option><option>{dexteritybonus}</option></select></td>
                                        <td className={style.weaponcolumn}><input style={{width:"90px"}} type='text' onChange={(event)=>setWeapon2dmg(event.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}><input style={{width:"40px"}} type='text' onChange={(event)=>setWeapon3(event.target.value)}/></td>
                                        <td className={style.weaponcolumn}>+<select><option>{strengthbonus}</option><option>{dexteritybonus}</option></select></td>
                                        <td className={style.weaponcolumn}><input style={{width:"90px"}} type='text' onChange={(event)=>setWeapon3dmg(event.target.value)}/></td>
                                    </tr>
                                </table>
                                <div>
                                    <textarea className={style.weaponother} placeholder='write other attack and spell attacks here' onChange={(event)=>setWeaponother(event.target.value)}></textarea>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>attacks and spellcasting</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.bagbox}>
                            <div style={{display:"flex"}}>
                                <div >
                                    <div className={style.coinbox}>
                                        <div>cp</div>
                                        <div className={style.coin}><input type='number' style={{width:"15px"}} onChange={(event)=>setCp(event.target.value)}/></div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>sp</div>
                                        <div className={style.coin}><input type='number' style={{width:"15px"}} onChange={(event)=>setSp(event.target.value)}/></div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>ep</div>
                                        <div className={style.coin}><input type='number' style={{width:"15px"}} onChange={(event)=>setEp(event.target.value)}/></div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>gp</div>
                                        <div className={style.coin}><input type='number' style={{width:"15px"}} onChange={(event)=>setGp(event.target.value)}/></div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>pp</div>
                                        <div className={style.coin}><input type='number' style={{width:"15px"}} onChange={(event)=>setPp(event.target.value)}/></div>
                                    </div>
                                </div>
                                <div>
                                    <textarea placeholder='write here all items' style={{width:"180px",height:"300px",resize:"none",marginLeft:"10px",marginTop:"5px"}} onChange={(event)=>setItems(event.target.value)}/>
                                </div>
                            </div>
                            <div className={style.backpacktext}>backpack</div>
                        </div>
                    </div>
                    <div className={style.box}> 
                        <div className={style.identitybox}>
                            <div className={style.idenbox} style={{borderTopLeftRadius:"20%",borderTopRightRadius:"20%"}}>
                                <textarea style={{resize:"none",marginLeft:"10px",marginTop:"10px",width:"220px",height:"55px"}} placeholder='personality traits here' onChange={(event)=>setPersonality(event.target.value)}/>
                                <div className={style.identext}>personality</div>
                            </div>
                            <div className={style.idenbox}>
                            <textarea style={{resize:"none",marginLeft:"10px",marginTop:"10px",width:"220px",height:"55px"}} placeholder='ideals traits here' onChange={(event)=>setIdeals(event.target.value)}/>
                                <div className={style.identext}>ideals</div>
                            </div>
                            <div className={style.idenbox}>
                            <textarea style={{resize:"none",marginLeft:"10px",marginTop:"10px",width:"220px",height:"55px"}} placeholder='bond traits here' onChange={(event)=>setBonds(event.target.value)}/>
                                <div className={style.identext}>bonds</div>
                            </div>
                            <div className={style.idenbox} style={{borderBottomLeftRadius:"20%",borderBottomRightRadius:"20%"}}>
                            <textarea style={{resize:"none",marginLeft:"10px",marginTop:"10px",width:"220px",height:"55px"}} placeholder='flaw traits here' onChange={(event)=>setFlaws(event.target.value)}/>
                                <div className={style.identext}>flaws</div>
                            </div>
                        </div>
                        <div className={style.traitbox}>
                            <div style={{height:"95%",overflowY:"auto"}}>
                                <div>
                                    <div>
                                    <input style={{marginLeft:"2%",marginTop:"2%"}} type='text' placeholder='feature title' onChange={(event)=>setFeaturetitle(event.target.value)}/>
                                    </div>
                                    <textarea style={{width:"250px",height:"50px",resize:"none",marginLeft:"2%",marginTop:"2%"}} placeholder='feature description' onChange={(event)=>setFeaturedesc(event.target.value)}/>
                                    <button style={{marginLeft:"2%"}} onClick={()=>handlefeature()}>add feature</button>
                                </div>
                                {features.map(e=><div className={style.traittext}>
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
                            <div className={style.charnametext}>{name}</div>
                            <div style={{textAlign:"center"}}>Character Name</div>
                        </div>
                    <div className={style.appdescbox}>
                        <div className={style.descbox}>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} placeholder='age' onChange={(event)=>setAge(event.target.value)} type="text"/>
                            <div className={style.deschead}>age</div>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} placeholder='eyes' onChange={(event)=>setEyes(event.target.value)} type="text"/>
                            <div className={style.deschead}>eyes</div>
                        </div>
                        <div className={style.descbox}>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} placeholder='height' onChange={(event)=>setHeight(event.target.value)} type="text"/>
                            <div className={style.deschead}>height</div>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} placeholder='skin' onChange={(event)=>setSkin(event.target.value)} type="text"/>
                            <div className={style.deschead}>skin</div>
                        </div>
                        <div className={style.descbox}>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} placeholder='weight' onChange={(event)=>setWeight(event.target.value)} type="text"/>
                            <div className={style.deschead}>weight</div>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} placeholder='hair' onChange={(event)=>setHair(event.target.value)} type="text"/>
                            <div className={style.deschead}>hair</div>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.imgbox}>
                        {appearance ? <img className={style.img} alt='' src={appearance}></img>:<input type='file' onChange={handleImage}/>}
                        <div className={style.imgtext}>character appearance</div>
                    </div>
                    <div className={style.alliesbox}>
                        <div className={style.alliestext}><textarea style={{resize:"none",height:"287px",width:"540px"}} placeholder='write allies and organizations here' onChange={(event)=>setAllies(event.target.value)}/></div>
                        <div className={style.allieshead}>allies & organization</div>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.backstorybox}>
                        <div className={style.backstorytext}><textarea style={{resize:"none",height:"460px",width:"285px"}} placeholder='character backstory here' onChange={(event)=>setBackstory(event.target.value)}/></div>
                        <div className={style.backstoryhead}>Character Backstory</div>
                    </div>
                    <div>
                        <div className={style.additionalbox}>
                            <div style={{overflowY:"auto",height:"87%"}}>
                            <input style={{margin:"1%"}} placeholder='feature title' onChange={(event)=>setFeaturetitle(event.target.value)}/>
                            <div></div>
                            <div style={{width:"545px"}}>
                            <textarea style={{margin:"1%",resize:"none",width:"520px",height:"50px"}} placeholder='feature description' onChange={(event)=>setFeaturedesc(event.target.value)}/>
                            </div>
                            <button style={{margin:"1%"}} onClick={()=>handleadditionalfeature()}>add feature</button>
                            {additionalfeatures.map(e=><div className={style.additionaltext}>
                                <div>{e.title}</div>
                                <div>{e.desc}</div>
                            </div>)}
                            </div>
                            <div className={style.additionalhead}>Additional Features & Traits</div>
                        </div>
                        <div className={style.treasurebox}>
                            <div className={style.treasuretext}><textarea placeholder='all characters treasures here' style={{resize:"none",width:"520px",height:"160px"}} onChange={(event)=>setTreasure(event.target.value)}/></div>
                            <div className={style.treasurehead}>Treasure</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}