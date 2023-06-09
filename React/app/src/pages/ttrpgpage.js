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
                                    <div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div>
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
                                                <div>
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
                                    <div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div>
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
                                                <div>
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
                                                <div>
                                                    2
                                                </div>
                                                <div>
                                                    sleight of hand
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div>
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
                                    <div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div>
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
                                    <div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div>
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
                                                <div>
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
                                                <div>
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
                                                <div>
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
                                                <div>
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
                                                <div>
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
                                    <div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div>
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
                                                <div>
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
                                                <div>
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
                                                <div>
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
                                                <div>
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
                                                <div>
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
                                    <div>
                                        <div className={style.skilltext}>
                                            <div style={{display:"flex"}}>
                                                <input type='checkbox'/>
                                                <div>
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
                                                <div>
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
                                                <div>
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
                                                <div>
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
                                                <div>
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
                            <div>
                                passive perception (wisdom)
                            </div>
                            <div>
                                proficiencies & languages
                            </div>
                        </div>
                    </div>
                    <div className={style.box}>
                        <div>
                            <div style={{display:"flex"}}>
                                <div>
                                    armor
                                </div>
                                <div>
                                    initiative
                                </div>
                                <div>
                                    speed
                                </div>
                            </div>
                            <div>
                                <div>
                                    hit poins maximum
                                </div>
                                <div>
                                    current hit points
                                </div>
                            </div>
                            <div>
                                temporary hit points
                            </div>
                            <div style={{display:"flex"}}>
                                <div>
                                    <div>
                                        total
                                    </div>
                                    <div>
                                        hit dice
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        successes
                                    </div>
                                    <div>
                                        failures
                                    </div>
                                    death saves
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div style={{display:"flex"}}>
                                    <div>
                                        name
                                        <div>1</div>
                                        <div>2</div>
                                        <div>3</div>
                                    </div>
                                    <div>
                                        atk bonus
                                        <div>1</div>
                                        <div>2</div>
                                        <div>3</div>
                                    </div>
                                    <div>
                                        damage/type
                                        <div>1</div>
                                        <div>2</div>
                                        <div>3</div>
                                    </div>
                                </div>
                                <div>
                                    other
                                </div>
                            </div>
                            attack & spellcasting
                        </div>
                        <div>
                            <div style={{display:"flex"}}>
                                <div>
                                    <div>
                                        cp
                                    </div>
                                    <div>
                                        sp
                                    </div>
                                    <div>
                                        ep
                                    </div>
                                    <div>
                                        gp
                                    </div>
                                    <div>
                                        pp
                                    </div>
                                </div>
                                <div>
                                    other stuff
                                </div>
                            </div>
                            backpack
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