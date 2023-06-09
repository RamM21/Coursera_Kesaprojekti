import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import style from './custom.module.css'
import pic from '../logo512.png'

export default class custom extends React.Component{
    constructor(props){
        super(props)
        this.state={
            custom:[]
        }
    }

    componentDidMount=()=>{
        this.getcustom()
    }

    getcustom=()=>{
        this.setState({custom:data.custom})
    }

    render(){
        return (
            <div>
                <Navbar />
                <div>
                    <h1 style={{marginLeft:"2%"}}>Custom</h1>
                    <div style={{display:"flex",width:"100%",flexWrap:'wrap'}}>
                        {this.state.custom.map(e=><Link to='/custompage' draggable={false} state={e.id} className={style.card}>
                            <img src={pic} className={style.img}></img>
                            <h3 className={style.title}>{e.title}</h3>
                            <p className={style.text}>{e.paragraph}</p>
                        </Link>)}
                    </div>
                </div>
            </div>
        )
    }
}