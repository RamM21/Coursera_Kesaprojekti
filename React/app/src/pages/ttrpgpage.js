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
                    <div>
                        {arr.name}
                        <div>Character Name</div>
                    </div>
                    <div>
                        <div style={{display:'flex'}}>
                            <div>
                                {arr.class}{arr.level}
                                
                                <div>Class & Level</div>
                            </div>
                            <div>
                                {arr.background}
                                <div>Background</div>
                            </div>
                            <div>
                                <div>Player Name</div>
                            </div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div>
                                {arr.race}
                                <div>Race</div>
                            </div>
                            <div>
                                <div>Aligment</div>
                            </div>
                            <div>
                                <div>Experience Points</div>
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
                                    +2
                                </div>
                            </div>
                            <div className={style.insbox}>
                                <div className={style.instext}>
                                    inspiration
                                </div>
                                <div className={style.insbonus}>
                                    1d4
                                </div>
                            </div>
                            <div>
                                <div className={style.statbox}>
                                    <div className={style.stat}>
                                        <div className={style.statbonus} style={{border:'1px solid black',borderRadius:"30%"}}>
                                            +2
                                        </div>
                                        <div className={style.statbonus}>
                                            14
                                        </div>
                                        <div className={style.stattext}>
                                            strength
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
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
                                            +2
                                        </div>
                                        <div className={style.statbonus}>
                                            14
                                        </div>
                                        <div className={style.stattext}>
                                            dexterity
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    acrobatics
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div style={{textAlignLast:"right"}}>
                                                    sleight of hand
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
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
                                            +2
                                        </div>
                                        <div className={style.statbonus}>
                                            14
                                        </div>
                                        <div className={style.stattext}>
                                            constitution
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
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
                                            +2
                                        </div>
                                        <div className={style.statbonus}>
                                            14
                                        </div>
                                        <div className={style.stattext}>
                                            intelligence
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    arcana
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    history
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    investigation
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    nature
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
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
                                            +2
                                        </div>
                                        <div className={style.statbonus}>
                                            14
                                        </div>
                                        <div className={style.stattext}>
                                            wisdom
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    animal handling
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    insight
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    medicine
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    perception
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
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
                                            +2
                                        </div>
                                        <div className={style.statbonus}>
                                            14
                                        </div>
                                        <div className={style.stattext}>
                                            charisma
                                        </div>
                                    </div>
                                    <div style={{width:"65%",marginTop:"3%",backgroundColor:"beige"}}>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    saving throws
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    deception
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    intimidation
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
                                                </div>
                                                <div>
                                                    performance
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div className={style.skillbonus}>
                                                    2
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
                                <div className={style.perbonus}>15</div>
                                <div style={{alignSelf:"center"}}>passive perception (wisdom)</div>
                            </div>
                            <div>
                                <div className={style.langbox}>
                                    <div style={{overflowWrap:"break-word"}}>stuffstuff</div>
                                    <div>proficiencies & languages</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.box}>
                        <div style={{backgroundColor:"lightgray"}}>
                            <div style={{display:"flex"}}>
                                <div className={style.arbox}>
                                    <div>12</div>
                                    <div style={{fontWeight:"bold"}}>armor</div>
                                </div>
                                <div className={style.chabox}>
                                    <div>2</div>
                                    <div style={{fontWeight:"bold"}}>initiative</div>
                                </div>
                                <div className={style.chabox}>
                                    <div>30</div>
                                    <div style={{fontWeight:"bold"}}>speed</div>
                                </div>
                            </div>
                            <div className={style.hpbox}>
                                <div style={{display:"flex",borderBottom:"1px solid black"}}>
                                    <div className={style.maxhptext}>hit poins maximum</div>
                                    <div className={style.maxhpnum}>30</div>
                                </div>
                                <div>
                                    <div className={style.curhpnum}>12</div>
                                    <div className={style.curhptext}>current hit points</div>
                                </div>
                            </div>
                            <div className={style.tempbox}>
                                <div>2</div>
                                <div className={style.temphptext}>temporary hit points</div>
                            </div>
                            <div className={style.deathbox}>
                                <div className={style.hitdicebox}>
                                    <div style={{display:"flex",textDecoration:"underline"}}>
                                        <div className={style.hitdicetext}>total</div>
                                        <div className={style.totalhitdice}>2d12</div>
                                    </div>
                                    <div>
                                        <div>1d8</div>
                                        <div className={style.hitdicetext}>hit dice</div>
                                    </div>
                                </div>
                                <div className={style.deathsavebox}>
                                    <div style={{display:"flex"}}>
                                        <div className={style.deathtext}>successes</div>
                                        <div style={{display:"flex"}}>
                                            <input type='checkbox'/>
                                            <input type='checkbox'/>
                                            <input type='checkbox'/>
                                        </div>
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <div className={style.deathtext} style={{marginRight:"12%"}}>failures</div>
                                        <div style={{display:"flex"}}>
                                            <input type='checkbox'/>
                                            <input type='checkbox'/>
                                            <input type='checkbox'/>
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
                                        <td className={style.weaponcolumn}>sword</td>
                                        <td className={style.weaponcolumn}>+2</td>
                                        <td className={style.weaponcolumn}>2 slash</td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}>bow</td>
                                        <td className={style.weaponcolumn}>+2</td>
                                        <td className={style.weaponcolumn}>2 piercing</td>
                                    </tr>
                                    <tr>
                                        <td className={style.weaponcolumn}>dagger</td>
                                        <td className={style.weaponcolumn}>+2</td>
                                        <td className={style.weaponcolumn}>2 slash</td>
                                    </tr>
                                </table>
                                <div>
                                    <textarea className={style.weaponother}></textarea>
                                    <div style={{textAlign:"center",fontWeight:"bold"}}>attacks and spellcasting</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.bagbox}>
                            <div style={{display:"flex"}}>
                                <div style={{width:"20%"}}>
                                    <div className={style.coinbox}>
                                        <div>cp</div>
                                        <input className={style.coin}/>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>sp</div>
                                        <input className={style.coin}/>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>ep</div>
                                        <input className={style.coin}/>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>gp</div>
                                        <input className={style.coin}/>
                                    </div>
                                    <div className={style.coinbox}>
                                        <div>pp</div>
                                        <input className={style.coin}/>
                                    </div>
                                </div>
                                <div>
                                    <textarea className={style.backpack}></textarea>
                                </div>
                            </div>
                            <div className={style.backpacktext}>backpack</div>
                        </div>
                    </div>
                    <div className={style.box}> 
                        <div>
                            <div>
                                personality
                            </div>
                            <div>
                                ideals
                            </div>
                            <div>
                                bonds
                            </div>
                            <div>
                                flaws
                            </div>
                        </div>
                        <div>
                            features & traits
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.page}>
                <div>
                    name & appearance
                </div>
                <div>
                    img & allies/organizations
                </div>
                <div>
                    backstory & additioal features & treasure
                </div>
            </div>
        </div>
    )
}