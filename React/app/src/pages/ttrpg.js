import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import style from './ttrpg.module.css'
import pic from '../logo512.png'

export default class ttrpg extends React.Component{
    constructor(props){
        super(props)
        this.state={
            ttrpg:[]
        }
    }

    componentDidMount=()=>{
        this.getttrpg()
    }

    getttrpg=()=>{
        this.setState({ttrpg:data.ttrpg})
    }

    render(){
        return (
            <div>
                <Navbar />
                <div>
                    <h1 style={{marginLeft:"2%"}}>Ttrpg</h1>
                    <div style={{display:"flex",width:"100%",flexWrap:'wrap'}}>
                        {this.state.ttrpg.map(e=><Link to='/ttrpgpage' draggable={false} state={e.id} className={style.card}>
                            <img src={pic} className={style.img}></img>
                            <h3 className={style.title}>Name {e.chardesc.name}</h3>
                            <p className={style.text}>Class {e.chardesc.class}</p>
                            <p className={style.text}>Race {e.chardesc.race}</p>
                        </Link>)}
                    </div>
                </div>
            </div>
        )
    }
}