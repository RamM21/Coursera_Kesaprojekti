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
        this.setState({recipes:data.recipes})
    }

    render(){
        return (
            <div>
                <Navbar />
                <div>
                    <h1 style={{marginLeft:"2%"}}>Recipes</h1>
                    <div style={{display:"flex",width:"100%",flexWrap:'wrap'}}>
                        {this.state.recipes.slice(0,5).map(e=><Link className={style.card}>
                            <img src={pic} className={style.img}></img>
                            <h3 className={style.title}>{e.title}</h3>
                            <p className={style.text}>{e.desc}</p>
                            <p className={style.text}>Serving size {e.servings}</p>
                        </Link>)}
                    </div>
                </div>
            </div>
        )
    }
}