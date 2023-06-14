import React from 'react'
import axios from 'axios'
import { Link,useLocation } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import pic from '../logo512.png'
import style from './ttrpgpage.module.css'

export default function Ttrpg(){
    
    var location = useLocation()
    
    let arr = data.ttrpg.find(e=>e.id==location.state)
    console.log(arr)

    
    return(
        <div>
            <Navbar />
            <div className={style.page}>  
                <div className={style.pagetop}>
                        <div className={style.charnamebox}>
                            <div className={style.charnametext}>{arr.chardesc.name}</div>
                            <div style={{textAlign:"center"}}>Character Name</div>
                        </div>
                        <div className={style.chardescbox}>
                            <div style={{display:'flex'}}>
                                <div className={style.charbox} style={{marginLeft:"5%"}}>
                                    <div style={{display:"flex"}}>
                                        <div className={style.chartext} style={{marginLeft:"5%"}}>{arr.chardesc.class}</div>
                                        <div className={style.chartext} style={{marginLeft:"10%"}}>{arr.chardesc.level}</div>
                                    </div>
                                    <div className={style.charhead}>Class & Level</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"10%"}}>
                                    <div className={style.chartext}>{arr.chardesc.background}</div>
                                    <div className={style.charhead}>Background</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"14%"}}>
                                    <div className={style.chartext}>{arr.chardesc.player}</div>
                                    <div className={style.charhead}>Player Name</div>
                                </div>
                            </div>
                            <div style={{display:'flex'}}>
                                <div className={style.charbox} style={{marginLeft:"5%"}}>
                                    <div className={style.chartext}>{arr.chardesc.race}</div>
                                    <div className={style.charhead}>Race</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"20%"}}>
                                    <div className={style.chartext}>{arr.chardesc.aligment}</div>
                                    <div className={style.charhead}>Aligment</div>
                                </div>
                                <div className={style.charbox} style={{marginLeft:"15%"}}>
                                    <div className={style.chartext}>{arr.chardesc.experience}</div>
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
                                    +{arr.stats.proficiency}
                                </div>
                            </div>
                            <div className={style.insbox}>
                                <div className={style.instext}>
                                    inspiration
                                </div>
                                <div className={style.insbonus}>
                                    {arr.stats.inspiration}
                                </div>
                            </div>
                            <div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            {arr.stats.strengthbonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr.stats.strength}
                                        </div>
                                        <div className={style.stattext}>
                                            strength
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.strengthsave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {arr.skills.strengthsave ? arr.stats.strengthbonus+arr.stats.proficiency:arr.stats.strengthbonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.athletics} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {arr.skills.athletics ? arr.stats.strengthbonus+arr.stats.proficiency:arr.stats.strengthbonus}
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
                                            {arr.stats.dexteritybonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr.stats.dexterity}
                                        </div>
                                        <div className={style.stattext}>
                                            dexterity
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.dexteritysave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    {arr.skills.dexteritysave ? arr.stats.dexteritybonus+arr.stats.proficiency:arr.stats.dexteritybonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.acrobatics} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.acrobatics ? arr.stats.dexteritybonus+arr.stats.proficiency:arr.stats.dexteritybonus}
                                                </div>
                                                <div>
                                                    acrobatics
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.sleightofhand} type='checkbox'/>
                                                <div  className={style.skillbonus}>
                                                {arr.skills.sleightofhand ? arr.stats.dexteritybonus+arr.stats.proficiency:arr.stats.dexteritybonus}
                                                </div>
                                                <div style={{textAlignLast:"right"}}>
                                                    sleight of hand
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.stealth} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.stealth ? arr.stats.dexteritybonus+arr.stats.proficiency:arr.stats.dexteritybonus}
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
                                            {arr.stats.constitutionbonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr.stats.constitution}
                                        </div>
                                        <div className={style.stattext}>
                                            constitution
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.constitutionsave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.constitutionsave ? arr.stats.constitutionbonus+arr.stats.proficiency:arr.stats.constitutionbonus}
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
                                            {arr.stats.intelligencebonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr.stats.intelligence}
                                        </div>
                                        <div className={style.stattext}>
                                            intelligence
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.intelligencesave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.intelligencesave ? arr.stats.intelligencebonus+arr.stats.proficiency:arr.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.arcana} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.arcana ? arr.stats.intelligencebonus+arr.stats.proficiency:arr.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    arcana
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.history} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.history ? arr.stats.intelligencebonus+arr.stats.proficiency:arr.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    history
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.investigation} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.investigation ? arr.stats.intelligencebonus+arr.stats.proficiency:arr.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    investigation
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.nature} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.nature ? arr.stats.intelligencebonus+arr.stats.proficiency:arr.stats.intelligencebonus}
                                                </div>
                                                <div>
                                                    nature
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.religion} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.religion ? arr.stats.intelligencebonus+arr.stats.proficiency:arr.stats.intelligencebonus}
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
                                            {arr.stats.wisdombonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr.stats.wisdom}
                                        </div>
                                        <div className={style.stattext}>
                                            wisdom
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.wisdomsave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.wisdomsave ? arr.stats.wisdombonus+arr.stats.proficiency:arr.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.animalhandling} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.animalhandling ? arr.stats.wisdombonus+arr.stats.proficiency:arr.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    animal handling
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.insight} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.insight ? arr.stats.wisdombonus+arr.stats.proficiency:arr.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    insight
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.medicine} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.medicine ? arr.stats.wisdombonus+arr.stats.proficiency:arr.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    medicine
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.perception} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.perception ? arr.stats.wisdombonus+arr.stats.proficiency:arr.stats.wisdombonus}
                                                </div>
                                                <div>
                                                    perception
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.survival} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.survival ? arr.stats.wisdombonus+arr.stats.proficiency:arr.stats.wisdombonus}
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
                                            {arr.stats.charismabonus}
                                        </div>
                                        <div className={style.statbonus}>
                                            {arr.stats.charisma}
                                        </div>
                                        <div className={style.stattext}>
                                            charisma
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.charismasave} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.charismasave ? arr.stats.charismabonus+arr.stats.proficiency:arr.stats.charismabonus}
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.deception} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.deception ? arr.stats.charismabonus+arr.stats.proficiency:arr.stats.charismabonus}
                                                </div>
                                                <div>
                                                    deception
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.intimidation} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.intimidation ? arr.stats.charismabonus+arr.stats.proficiency:arr.stats.charismabonus}
                                                </div>
                                                <div>
                                                    intimidation
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.performance} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.performance ? arr.stats.charismabonus+arr.stats.proficiency:arr.stats.charismabonus}
                                                </div>
                                                <div>
                                                    performance
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input disabled={true} checked={arr.skills.persuasion} type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                {arr.skills.persuasion ? arr.stats.charismabonus+arr.stats.proficiency:arr.stats.charismabonus}
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
                                <div className={style.perbonus}>{arr.skills.perception ? 8+arr.stats.wisdombonus+arr.stats.proficiency:8+arr.stats.wisdombonus}</div>
                                <div style={{alignSelf:"center"}}>passive perception (wisdom)</div>
                            </div>
                            <div>
                                <div className={style.langbox}>
                                    <div style={{overflowWrap:"break-word",overflowY:"auto"}}>{arr.traits.profnlang.prof} {arr.traits.profnlang.lang}</div>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>proficiencies & languages</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.box}>
                        <div style={{backgroundColor:"lightgray"}}>
                            <div style={{display:"flex"}}>
                                <div className={style.arbox}>
                                    <div>{arr.stats.armor}</div>
                                    <div style={{fontWeight:"bold"}}>armor</div>
                                </div>
                                <div className={style.chabox}>
                                    <div>{arr.stats.dexteritybonus}</div>
                                    <div style={{fontWeight:"bold"}}>initiative</div>
                                </div>
                                <div className={style.chabox}>
                                    <div>{arr.stats.speed}</div>
                                    <div style={{fontWeight:"bold"}}>speed</div>
                                </div>
                            </div>
                            <div className={style.hpbox}>
                                <div style={{display:"flex",borderBottom:"1px solid black"}}>
                                    <div className={style.maxhptext}>hit poins maximum</div>
                                    <div className={style.maxhpnum}>{arr.stats.hpmax}</div>
                                </div>
                                <div>
                                    <div className={style.curhpnum}>{arr.stats.curhp}</div>
                                    <div className={style.curhptext}>current hit points</div>
                                </div>
                            </div>
                            <div className={style.tempbox}>
                                <div>{arr.stats.temphp}</div>
                                <div className={style.temphptext}>temporary hit points</div>
                            </div>
                            <div className={style.deathbox}>
                                <div className={style.hitdicebox}>
                                    <div style={{display:"flex",textDecoration:"underline"}}>
                                        <div className={style.hitdicetext}>total</div>
                                        <div className={style.totalhitdice}>{arr.stats.totalhitdice}</div>
                                    </div>
                                    <div>
                                        <div>{arr.stats.hitdice}</div>
                                        <div className={style.hitdicetext}>hit dice</div>
                                    </div>
                                </div>
                                <div className={style.deathsavebox}>
                                    <div style={{display:"flex"}}>
                                        <div className={style.deathtext}>successes</div>
                                        <div style={{display:"flex"}}>
                                            <input type='checkbox' disabled={true} checked={arr.stats.success1}/>
                                            <input type='checkbox' disabled={true} checked={arr.stats.success2}/>
                                            <input type='checkbox' disabled={true} checked={arr.stats.success3}/>
                                        </div>
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <div className={style.deathtext} style={{marginRight:"12%"}}>failures</div>
                                        <div style={{display:"flex"}}>
                                            <input type='checkbox' disabled={true} checked={arr.stats.failure1}/>
                                            <input type='checkbox' disabled={true} checked={arr.stats.failure2}/>
                                            <input type='checkbox' disabled={true} checked={arr.stats.failure3}/>
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
                                        <td className={style.weaponcolumn}>{arr.backpack.attack.weapon1}</td>
                                        <td className={style.weaponcolumn}>+{arr.stats.strengthbonus}</td>
                                        <td className={style.weaponcolumn}>{arr.backpack.attack.weapon1dmg}</td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}>{arr.backpack.attack.weapon2}</td>
                                        <td className={style.weaponcolumn}>+{arr.stats.dexteritybonus}</td>
                                        <td className={style.weaponcolumn}>{arr.backpack.attack.weapon2dmg}</td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}>{arr.backpack.attack.weapon3}</td>
                                        <td className={style.weaponcolumn}>+{arr.stats.dexteritybonus}</td>
                                        <td className={style.weaponcolumn}>{arr.backpack.attack.weapon3dmg}</td>
                                    </tr>
                                </table>
                                <div>
                                    <textarea className={style.weaponother} value={arr.backpack.attack.other}></textarea>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>attacks and spellcasting</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.bagbox}>
                            <div style={{display:"flex"}}>
                                <div >
                                    <div className={style.coinbox}>
                                        <div>cp</div>
                                        <div className={style.coin}>{arr.backpack.coins.cp}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>sp</div>
                                        <div className={style.coin}>{arr.backpack.coins.sp}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>ep</div>
                                        <div className={style.coin}>{arr.backpack.coins.ep}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>gp</div>
                                        <div className={style.coin}>{arr.backpack.coins.gp}</div>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>pp</div>
                                        <div className={style.coin}>{arr.backpack.coins.pp}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className={style.backpack}>{arr.backpack.items}</div>
                                </div>
                            </div>
                            <div className={style.backpacktext}>backpack</div>
                        </div>
                    </div>
                    <div className={style.box}> 
                        <div className={style.identitybox}>
                            <div className={style.idenbox} style={{borderTopLeftRadius:"20%",borderTopRightRadius:"20%"}}>
                                <div className={style.identext} style={{height:"75px"}}>{arr.traits.personality}</div>
                                <div className={style.identext}>personality</div>
                            </div>
                            <div className={style.idenbox}>
                                <div className={style.identext} style={{height:"75px"}}>{arr.traits.ideals}</div>
                                <div className={style.identext}>ideals</div>
                            </div>
                            <div className={style.idenbox}>
                                <div className={style.identext} style={{height:"75px"}}>{arr.traits.bonds}</div>
                                <div className={style.identext}>bonds</div>
                            </div>
                            <div className={style.idenbox} style={{borderBottomLeftRadius:"20%",borderBottomRightRadius:"20%"}}>
                                <div className={style.identext} style={{height:"75px"}}>{arr.traits.flaws}</div>
                                <div className={style.identext}>flaws</div>
                            </div>
                        </div>
                        <div className={style.traitbox}>
                            <div style={{height:"95%",overflowY:"auto"}}>
                                {arr.traits.features.map(e=><div className={style.traittext}>
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
                            <div className={style.charnametext}>{arr.chardesc.name}</div>
                            <div style={{textAlign:"center"}}>Character Name</div>
                        </div>
                    <div className={style.appdescbox}>
                        <div className={style.descbox}>
                            <div className={style.desctext}>{arr.chardesc.age}</div>
                            <div className={style.deschead}>age</div>
                            <div className={style.desctext}>{arr.chardesc.eyes}</div>
                            <div className={style.deschead}>eyes</div>
                        </div>
                        <div className={style.descbox}>
                            <div className={style.desctext}>{arr.chardesc.height}</div>
                            <div className={style.deschead}>height</div>
                            <div className={style.desctext}>{arr.chardesc.skin}</div>
                            <div className={style.deschead}>skin</div>
                        </div>
                        <div className={style.descbox}>
                            <div className={style.desctext}>{arr.chardesc.weight}</div>
                            <div className={style.deschead}>weight</div>
                            <div className={style.desctext}>{arr.chardesc.hair}</div>
                            <div className={style.deschead}>hair</div>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.imgbox}>
                        <img className={style.img} src={arr.chardesc.appearance}></img>
                        <div className={style.imgtext}>character appearance</div>
                    </div>
                    <div className={style.alliesbox}>
                        <div className={style.alliestext}>{arr.chardesc.allies}</div>
                        <div className={style.allieshead}>allies & organization</div>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div className={style.backstorybox}>
                        <div className={style.backstorytext}>{arr.chardesc.backstory}</div>
                        <div className={style.backstoryhead}>Character Backstory</div>
                    </div>
                    <div>
                        <div className={style.additionalbox}>
                            <div style={{overflowY:"auto",height:"87%"}}>
                            {arr.traits.additionalfeatures.map(e=><div className={style.additionaltext}>
                                <div>{e.title}</div>
                                <div>{e.desc}</div>
                            </div>)}
                            </div>
                            <div className={style.additionalhead}>Additional Features & Traits</div>
                        </div>
                        <div className={style.treasurebox}>
                            <div className={style.treasuretext}>{arr.backpack.treasure}</div>
                            <div className={style.treasurehead}>Treasure</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}