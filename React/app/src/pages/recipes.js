import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import style from './recipes.module.css'
import pic from '../logo512.png'

export default class recipes extends React.Component{
    constructor(props){
        super(props)
        this.state={
            recipes:[]
        }
    }

    componentDidMount=()=>{
        this.getRecipes()
    }

    getRecipes=()=>{
        axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-recipes.json")
        .then(response=>{
            let arr =[]
            arr = response.data.result.filter(e=>e.id!=="_design/51ab035d1c4caacddd22c5982a903909c3d7b47b")
            this.setState({recipes:arr})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return (
            <div>
                <div>
                    <h1 style={{marginLeft:"2%"}}>Recipes</h1>
                    <div style={{display:"flex",width:"100%",flexWrap:'wrap'}}>
                        {this.state.recipes.map(e=><Link to='/recipepage' draggable={false} state={e.id} className={style.card}>
                            <img src={e.doc.image.file} className={style.img}></img>
                            <h3 className={style.title}>{e.doc.title}</h3>
                            <p className={style.text}>{e.doc.desc}</p>
                            <p className={style.text}>Serving size {e.doc.servings}</p>
                        </Link>)}
                    </div>
                </div>
            </div>
        )
    }
}