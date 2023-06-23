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
        axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-custom.json")
        .then(response=>{
            let arr =[]
            arr = response.data.result.filter(e=>e.id!=="_design/5a37cd9b759475008e18a3c5e5037ae264caaf12")
            this.setState({custom:arr})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return (
            <div>
                <div>
                    <h1 style={{marginLeft:"2%"}}>Custom</h1>
                    <div style={{display:"flex",width:"100%",flexWrap:'wrap'}}>
                        {this.state.custom.map(e=><Link to='/custompage' draggable={false} state={e.id} className={style.card}>
                            <img src={pic} className={style.img}></img>
                            <h3 className={style.title}>{e.doc.title}</h3>
                            <p className={style.text}>{e.doc.paragraph}</p>
                        </Link>)}
                    </div>
                </div>
            </div>
        )
    }
}