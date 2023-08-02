import React, {  useState } from 'react'
import axios from 'axios'
import style from './newttrpg.module.css'
import {useAlert} from 'react-alert'

export default function UpTtrpg(props){

    let alert = useAlert()
    const [img,setImage]=useState(props.img)    
    const [features,setFeatures]=useState(props.data[0].doc.traits.features)
    const [featuretitle,setFeaturetitle]=useState('')
    const [featuredesc,setFeaturedesc]=useState('')
    const [additionalfeatures,setAdditionalfeatures]=useState(props.data[0].doc.traits.additionalfeatures)
    const [name,setName]=useState(props.data[0].doc.chardesc.name)
    const [clas,setClass]=useState(props.data[0].doc.chardesc.class)
    const [level,setLevel]=useState(props.data[0].doc.chardesc.level)
    const [background,setBackground]=useState(props.data[0].doc.chardesc.background)
    const [player,setPlayer]=useState(props.data[0].doc.chardesc.player)
    const [race,setRace]=useState(props.data[0].doc.chardesc.race)
    const [aligment,setAligment]=useState(props.data[0].doc.chardesc.aligment)
    const [experience,setExperience]=useState(props.data[0].doc.chardesc.experience)
    const [age,setAge]=useState(props.data[0].doc.chardesc.age)
    const [height,setHeight]=useState(props.data[0].doc.chardesc.height)
    const [weight,setWeight]=useState(props.data[0].doc.chardesc.weight)
    const [eyes,setEyes]=useState(props.data[0].doc.chardesc.eyes)
    const [skin,setSkin]=useState(props.data[0].doc.chardesc.skin)
    const [hair,setHair]=useState(props.data[0].doc.chardesc.hair)
    const [allies,setAllies]=useState(props.data[0].doc.chardesc.allies)
    const [backstory,setBackstory]=useState(props.data[0].doc.chardesc.backstory)
    const [appearance,setAppearance]=useState(props.data[0].doc._attachments.image.data)
    const [proficiency,setProficiency]=useState(props.data[0].doc.stats.proficiency)
    const [inspiration,setInspiration]=useState(props.data[0].doc.stats.inspiration)
    const [strength,setStrenght]=useState(props.data[0].doc.stats.strength)
    const [strengthbonus,setStrenghtbonus]=useState(props.data[0].doc.stats.strengthbonus)
    const [dexterity,setDexterity]=useState(props.data[0].doc.stats.dexterity)
    const [dexteritybonus,setDexteritybonus]=useState(props.data[0].doc.stats.dexteritybonus)
    const [constitution,setConstitution]=useState(props.data[0].doc.stats.constitution)
    const [constitutionbonus,setConstitutionbonus]=useState(props.data[0].doc.stats.constitutionbonus)
    const [intelligence,setIntelligence]=useState(props.data[0].doc.stats.intelligence)
    const [intelligencebonus,setIntelligencebonus]=useState(props.data[0].doc.stats.intelligencebonus)
    const [wisdom,setWisdom]=useState(props.data[0].doc.stats.wisdom)
    const [wisdombonus,setWisdombonus]=useState(props.data[0].doc.stats.wisdombonus)
    const [charisma,setCharisma]=useState(props.data[0].doc.stats.charisma)
    const [charismabonus,setCharismabonus]=useState(props.data[0].doc.stats.charismabonus)
    const [speed,setSpeed]=useState(props.data[0].doc.stats.speed)
    const [armor,setArmor]=useState(props.data[0].doc.stats.armor)
    const [hpmax,setHpmax]=useState(props.data[0].doc.stats.hpmax)
    const [curhp,setCurhp]=useState(props.data[0].doc.stats.curhp)
    const [temphp,setTemphp]=useState(props.data[0].doc.stats.temphp)
    const [totalhitdice,setTotalhitdice]=useState(props.data[0].doc.stats.totalhitdice)
    const [hitdice,setHitdice]=useState(props.data[0].doc.stats.hitdice)
    const [success1,setSuccess1]=useState(props.data[0].doc.stats.success1)
    const [success2,setSuccess2]=useState(props.data[0].doc.stats.success2)
    const [success3,setSuccess3]=useState(props.data[0].doc.stats.success3)
    const [failure1,setFailure1]=useState(props.data[0].doc.stats.failure1)
    const [failure2,setFailure2]=useState(props.data[0].doc.stats.failure2)
    const [failure3,setFailure3]=useState(props.data[0].doc.stats.failure3)
    const [personality,setPersonality]=useState(props.data[0].doc.traits.personality)
    const [ideals,setIdeals]=useState(props.data[0].doc.traits.ideals)
    const [bonds,setBonds]=useState(props.data[0].doc.traits.bonds)
    const [flaws,setFlaws]=useState(props.data[0].doc.traits.flaws)
    const [prof,setprof]=useState(props.data[0].doc.traits.profnlang.prof)
    const [lang,setLang]=useState(props.data[0].doc.traits.profnlang.lang)
    const [cp,setCp]=useState(props.data[0].doc.backpack.coins.cp)
    const [sp,setSp]=useState(props.data[0].doc.backpack.coins.sp)
    const [ep,setEp]=useState(props.data[0].doc.backpack.coins.ep)
    const [gp,setGp]=useState(props.data[0].doc.backpack.coins.gp)
    const [pp,setPp]=useState(props.data[0].doc.backpack.coins.pp)
    const [weapon1,setWeapon1]=useState(props.data[0].doc.backpack.attack.weapon1)
    const [weapon2,setWeapon2]=useState(props.data[0].doc.backpack.attack.weapon2)
    const [weapon3,setWeapon3]=useState(props.data[0].doc.backpack.attack.weapon3)
    const [weapon1dmg,setWeapon1dmg]=useState(props.data[0].doc.backpack.attack.weapon1dmg)
    const [weapon2dmg,setWeapon2dmg]=useState(props.data[0].doc.backpack.attack.weapon2dmg)
    const [weapon3dmg,setWeapon3dmg]=useState(props.data[0].doc.backpack.attack.weapon3dmg)
    const [weaponother,setWeaponother]=useState(props.data[0].doc.backpack.attack.other)
    const [items,setItems]=useState(props.data[0].doc.backpack.items)
    const [treasure,setTreasure]=useState(props.data[0].doc.backpack.treasure)
    const [strengthsave,setStrenghtsave]=useState(props.data[0].doc.skills.strengthsave)
    const [dexteritysave,setDexteritysave]=useState(props.data[0].doc.skills.dexteritysave)
    const [constitutionsave,setConstitutionsave]=useState(props.data[0].doc.skills.constitutionsave)
    const [intelligencesave,setIntelligencesave]=useState(props.data[0].doc.skills.intelligencesave)
    const [wisdomsave,setWisdomsave]=useState(props.data[0].doc.skills.wisdomsave)
    const [charismasave,setCharismasave]=useState(props.data[0].doc.skills.charismasave)
    const [athletics,setAthletics]=useState(props.data[0].doc.skills.athletics)
    const [acrobatics,setAcrobatics]=useState(props.data[0].doc.skills.acrobatics)
    const [sleightofhand,setSleightofhand]=useState(props.data[0].doc.skills.sleightofhand)
    const [stealth,setStealth]=useState(props.data[0].doc.skills.stealth)
    const [arcana,setArcana]=useState(props.data[0].doc.skills.arcana)
    const [history,setHistory]=useState(props.data[0].doc.skills.history)
    const [investigation,setInvestigation]=useState(props.data[0].doc.skills.investigation)
    const [nature,setNature]=useState(props.data[0].doc.skills.nature)
    const [religion,setReligion]=useState(props.data[0].doc.skills.religion)
    const [animalhandling,setAnimalhandling]=useState(props.data[0].doc.skills.animalhandling)
    const [insight,setInsight]=useState(props.data[0].doc.skills.insight)
    const [medicine,setMedicine]=useState(props.data[0].doc.skills.medicine)
    const [perception,setPerception]=useState(props.data[0].doc.skills.perception)
    const [survival,setSurvival]=useState(props.data[0].doc.skills.survival)
    const [deception,setDeception]=useState(props.data[0].doc.skills.deception)
    const [intimidation,setIntimidation]=useState(props.data[0].doc.skills.intimidation)
    const [performance,setPerformance]=useState(props.data[0].doc.skills.performance)
    const [persuasion,setPersuasion]=useState(props.data[0].doc.skills.persuasion)

    //Adding new character feature to array
    function handlefeature(){
        let arr = [...features]
        arr.push({
            title:featuretitle,
            desc:featuredesc
        })
        setFeatures(arr)
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
    //Adding new character additional feature to additional array
    function handleadditionalfeature(){
        let arr = [...additionalfeatures]
        arr.push({
            title:featuretitle,
            desc:featuredesc
        })
        setAdditionalfeatures(arr)
    }
    //Giving image file handling functions
    function handleImage(e){
        imgtobase64(e)
        setAppearance(URL.createObjectURL(e.target.files[0]))
    }
    //Updating ttrpg document with new or same information to database
    function handlesave(){
        let document ={
            id:props.data[0].doc._id,
            rev:props.data[0].doc._rev,
            ttrpg:{
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
                    "content_type":img.type,
                    "data":img.file
                }
            }
        }
        }
        axios.post("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/put-document.json",document)
        .then(response=>{
            if(response.data.result.ok){
                alert.success("File was successfully updated")
            }
            console.log(response)
        })
        .catch(err=>{
            alert.error("error happened updating the file try again later")
            console.log(err)
        })
    }
    
    return(
        <div>
            <div>
                <button style={{textAlign:"center",margin:"1%",fontSize:"large",backgroundColor:"lightseagreen"}} onClick={()=>handlesave()}>Update file</button>
            </div>
            <div className={style.page}>  
                <div className={style.pagetop}>
                        <div className={style.charnamebox}>
                            <div className={style.charnametext}><input defaultValue={name} placeholder='Character name' onChange={(event)=>setName(event.target.value)} type="text"/></div>
                            <div style={{textAlign:"center"}}>Character Name</div>
                        </div>
                        <div className={style.chardescbox}>
                            <div style={{display:'flex'}}>
                                <div className={style.charbox} style={{marginLeft:"5%"}}>
                                    <div style={{display:"flex"}}>
                                        <div ><input className={style.chartext} defaultValue={clas} style={{marginLeft:"5%",width:"60px"}} placeholder='Class' onChange={(event)=>setClass(event.target.value)} type="text"/></div>
                                        <div ><input className={style.chartext} defaultValue={level} style={{marginLeft:"10%",width:"20px"}} placeholder='Lvl' onChange={(event)=>setLevel(event.target.value)} type="text"/></div>
                                    </div>
                                    <div className={style.charhead}>Class & Level</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"10%"}}>
                                    <div className={style.chartext}><input style={{width:"80px"}} defaultValue={background} placeholder='Background' onChange={(event)=>setBackground(event.target.value)} type="text"/></div>
                                    <div className={style.charhead}>Background</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"14%"}}>
                                    <div className={style.chartext}><input style={{width:"80px"}} defaultValue={player} placeholder='Player' onChange={(event)=>setPlayer(event.target.value)} type="text"/></div>
                                    <div className={style.charhead}>Player Name</div>
                                </div>
                            </div>
                            <div style={{display:'flex'}}>
                                <div className={style.charbox} style={{marginLeft:"5%"}}>
                                    <div className={style.chartext}><input style={{width:"60px"}} defaultValue={race} placeholder='Race' onChange={(event)=>setRace(event.target.value)} type="text"/></div>
                                    <div className={style.charhead}>Race</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"16%"}}>
                                    <div className={style.chartext}><input style={{width:"80px"}} defaultValue={aligment} placeholder='Aligment' onChange={(event)=>setAligment(event.target.value)} type="text"/></div>
                                    <div className={style.charhead}>Aligment</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"15%"}}>
                                    <div className={style.chartext}><input style={{width:"80px"}} defaultValue={experience} placeholder='Experience' onChange={(event)=>setExperience(event.target.value)} type="text"/></div>
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
                                    +<input style={{width:"10px",marginRight:"5px"}} defaultValue={proficiency} type="number" onChange={(event)=>setProficiency(event.target.value)}/>
                                </div>
                            </div>
                            <div className={style.insbox}>
                                <div className={style.instext}>
                                    inspiration
                                </div>
                                <div className={style.insbonus}>
                                    <input style={{width:"25px"}} type="text" defaultValue={inspiration} onChange={(event)=>setInspiration(event.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={strengthbonus} type="number" onChange={(event)=>setStrenghtbonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={strength} type="number" onChange={(event)=>setStrenght(event.target.value)}/>
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
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={dexteritybonus} type="number" onChange={(event)=>setDexteritybonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={dexterity} type="number" onChange={(event)=>setDexterity(event.target.value)}/>
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
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={constitutionbonus} type="number" onChange={(event)=>setConstitutionbonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={constitution} type="number" onChange={(event)=>setConstitution(event.target.value)}/>
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
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={intelligencebonus} type="number" onChange={(event)=>setIntelligencebonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={intelligence} type="number" onChange={(event)=>setIntelligence(event.target.value)}/>
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
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={wisdombonus} type="number" onChange={(event)=>setWisdombonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={wisdom} type="number" onChange={(event)=>setWisdom(event.target.value)}/>
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
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={charismabonus} type="number" onChange={(event)=>setCharismabonus(event.target.value)}/>
                                        </div>
                                        <div className={style.statbonus}>
                                            <input style={{width:"25px",textAlign:"center"}} defaultValue={charisma} type="number" onChange={(event)=>setCharisma(event.target.value)}/>
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
                                    <textarea placeholder='proficiencies here' defaultValue={prof} onChange={(event)=>setprof(event.target.value)} style={{resize:"none",width:"250px",height:"100px",marginLeft:"5px",marginTop:"5px"}}/>
                                    <textarea placeholder='languages here' defaultValue={lang} onChange={(event)=>setLang(event.target.value)} style={{resize:"none",width:"250px",height:"100px",marginLeft:"5px",marginTop:"5px"}}/>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>proficiencies & languages</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.box}>
                        <div style={{backgroundColor:"lightgray"}}>
                            <div style={{display:"flex"}}>
                                <div className={style.arbox}>
                                    <input style={{width:"25px",textAlign:"center"}} defaultValue={armor} type='number' onChange={(event)=>setArmor(event.target.value)}/>
                                    <div style={{fontWeight:"bold"}}>armor</div>
                                </div>
                                <div className={style.chabox}>
                                    <div>{dexteritybonus}</div>
                                    <div style={{fontWeight:"bold"}}>initiative</div>
                                </div>
                                <div className={style.chabox}>
                                    <input style={{width:"25px",textAlign:"center"}} defaultValue={speed} type='number' onChange={(event)=>setSpeed(event.target.value)}/>
                                    <div style={{fontWeight:"bold"}}>speed</div>
                                </div>
                            </div>
                            <div className={style.hpbox}>
                                <div style={{display:"flex",borderBottom:"1px solid black"}}>
                                    <div className={style.maxhptext}>hit poins maximum</div>
                                    <input style={{width:"25px",textAlign:"center"}} defaultValue={hpmax} type='number' onChange={(event)=>setHpmax(event.target.value)}/>
                                </div>
                                <div>
                                    <input style={{width:"25px",textAlign:"center",marginLeft:"42%"}} defaultValue={curhp} type='number' onChange={(event)=>setCurhp(event.target.value)}/>
                                    <div className={style.curhptext}>current hit points</div>
                                </div>
                            </div>
                            <div className={style.tempbox}>
                                <input style={{width:"25px",textAlign:"center"}} defaultValue={temphp} type='number' onChange={(event)=>setTemphp(event.target.value)}/>
                                <div className={style.temphptext}>temporary hit points</div>
                            </div>
                            <div className={style.deathbox}>
                                <div className={style.hitdicebox}>
                                    <div style={{display:"flex",textDecoration:"underline"}}>
                                        <div className={style.hitdicetext}>total</div>
                                        <input style={{width:"25px",textAlign:"center"}} defaultValue={totalhitdice} type='number' onChange={(event)=>setTotalhitdice(event.target.value)}/>
                                    </div>
                                    <div>
                                    <input style={{width:"25px",textAlign:"center"}} defaultValue={hitdice} type='text' onChange={(event)=>setHitdice(event.target.value)}/>
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
                                        <td className={style.weaponcolumn}><input style={{width:"40px"}} defaultValue={weapon1} type='text' onChange={(event)=>setWeapon1(event.target.value)}/></td>
                                        <td className={style.weaponcolumn}>+<select><option>{strengthbonus}</option><option>{dexteritybonus}</option></select></td>
                                        <td className={style.weaponcolumn}><input style={{width:"90px"}} defaultValue={weapon1dmg} type='text' onChange={(event)=>setWeapon1dmg(event.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}><input style={{width:"40px"}} defaultValue={weapon2} type='text' onChange={(event)=>setWeapon2(event.target.value)}/></td>
                                        <td className={style.weaponcolumn}>+<select><option>{strengthbonus}</option><option>{dexteritybonus}</option></select></td>
                                        <td className={style.weaponcolumn}><input style={{width:"90px"}} defaultValue={weapon2dmg} type='text' onChange={(event)=>setWeapon2dmg(event.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}><input style={{width:"40px"}} defaultValue={weapon3} type='text' onChange={(event)=>setWeapon3(event.target.value)}/></td>
                                        <td className={style.weaponcolumn}>+<select><option>{strengthbonus}</option><option>{dexteritybonus}</option></select></td>
                                        <td className={style.weaponcolumn}><input style={{width:"90px"}} defaultValue={weapon3dmg} type='text' onChange={(event)=>setWeapon3dmg(event.target.value)}/></td>
                                    </tr>
                                </table>
                                <div>
                                    <textarea className={style.weaponother} defaultValue={weaponother} placeholder='write other attack and spell attacks here' onChange={(event)=>setWeaponother(event.target.value)}></textarea>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>attacks and spellcasting</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.bagbox}>
                            <div style={{display:"flex"}}>
                                <div >
                                    <div className={style.coinbox}>
                                        <div>cp</div>
                                        <div className={style.coin}><input type='number' defaultValue={cp} style={{width:"15px"}} onChange={(event)=>setCp(event.target.value)}/></div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>sp</div>
                                        <div className={style.coin}><input type='number' defaultValue={sp} style={{width:"15px"}} onChange={(event)=>setSp(event.target.value)}/></div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>ep</div>
                                        <div className={style.coin}><input type='number' defaultValue={ep} style={{width:"15px"}} onChange={(event)=>setEp(event.target.value)}/></div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>gp</div>
                                        <div className={style.coin}><input type='number' defaultValue={gp} style={{width:"15px"}} onChange={(event)=>setGp(event.target.value)}/></div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>pp</div>
                                        <div className={style.coin}><input type='number' defaultValue={pp} style={{width:"15px"}} onChange={(event)=>setPp(event.target.value)}/></div>
                                    </div>
                                </div>
                                <div>
                                    <textarea placeholder='write here all items' defaultValue={items} style={{width:"180px",height:"300px",resize:"none",marginLeft:"10px",marginTop:"5px"}} onChange={(event)=>setItems(event.target.value)}/>
                                </div>
                            </div>
                            <div className={style.backpacktext}>backpack</div>
                        </div>
                    </div>
                    <div className={style.box}> 
                        <div className={style.identitybox}>
                            <div className={style.idenbox} style={{borderTopLeftRadius:"20%",borderTopRightRadius:"20%"}}>
                                <textarea style={{resize:"none",marginLeft:"10px",marginTop:"10px",width:"220px",height:"55px"}} defaultValue={personality} placeholder='personality traits here' onChange={(event)=>setPersonality(event.target.value)}/>
                                <div className={style.identext}>personality</div>
                            </div>
                            <div className={style.idenbox}>
                            <textarea style={{resize:"none",marginLeft:"10px",marginTop:"10px",width:"220px",height:"55px"}} defaultValue={ideals} placeholder='ideals traits here' onChange={(event)=>setIdeals(event.target.value)}/>
                                <div className={style.identext}>ideals</div>
                            </div>
                            <div className={style.idenbox}>
                            <textarea style={{resize:"none",marginLeft:"10px",marginTop:"10px",width:"220px",height:"55px"}} defaultValue={bonds} placeholder='bond traits here' onChange={(event)=>setBonds(event.target.value)}/>
                                <div className={style.identext}>bonds</div>
                            </div>
                            <div className={style.idenbox} style={{borderBottomLeftRadius:"20%",borderBottomRightRadius:"20%"}}>
                            <textarea style={{resize:"none",marginLeft:"10px",marginTop:"10px",width:"220px",height:"55px"}} defaultValue={flaws} placeholder='flaw traits here' onChange={(event)=>setFlaws(event.target.value)}/>
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
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} defaultValue={age} placeholder='age' onChange={(event)=>setAge(event.target.value)} type="text"/>
                            <div className={style.deschead}>age</div>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} defaultValue={eyes} placeholder='eyes' onChange={(event)=>setEyes(event.target.value)} type="text"/>
                            <div className={style.deschead}>eyes</div>
                        </div>
                        <div className={style.descbox}>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} defaultValue={height} placeholder='height' onChange={(event)=>setHeight(event.target.value)} type="text"/>
                            <div className={style.deschead}>height</div>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} defaultValue={skin} placeholder='skin' onChange={(event)=>setSkin(event.target.value)} type="text"/>
                            <div className={style.deschead}>skin</div>
                        </div>
                        <div className={style.descbox}>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} defaultValue={weight} placeholder='weight' onChange={(event)=>setWeight(event.target.value)} type="text"/>
                            <div className={style.deschead}>weight</div>
                            <input className={style.chartext} style={{marginLeft:"5%",width:"80px"}} defaultValue={hair} placeholder='hair' onChange={(event)=>setHair(event.target.value)} type="text"/>
                            <div className={style.deschead}>hair</div>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.imgbox}>
                        <img className={style.img} alt='' src={appearance}></img>
                        <input type='file' onChange={handleImage}/>
                        <div className={style.imgtext}>character appearance</div>
                    </div>
                    <div className={style.alliesbox}>
                        <div className={style.alliestext}><textarea defaultValue={allies} style={{resize:"none",height:"287px",width:"540px"}} placeholder='write allies and organizations here' onChange={(event)=>setAllies(event.target.value)}/></div>
                        <div className={style.allieshead}>allies & organization</div>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.backstorybox}>
                        <div className={style.backstorytext}><textarea defaultValue={backstory} style={{resize:"none",height:"460px",width:"285px"}} placeholder='character backstory here' onChange={(event)=>setBackstory(event.target.value)}/></div>
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
                            <div className={style.treasuretext}><textarea defaultValue={treasure} placeholder='all characters treasures here' style={{resize:"none",width:"520px",height:"160px"}} onChange={(event)=>setTreasure(event.target.value)}/></div>
                            <div className={style.treasurehead}>Treasure</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}