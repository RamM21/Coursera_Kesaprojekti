import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import style from './main.module.css'
import pic from '../logo512.png'
import Recipepage from './recipe'

export default class main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            recipes:[],
            ttrpg:[],
            custom:[]
        }
    }

    componentDidMount=()=>{
        this.getRecipes()
        this.getttrpg()
        this.getcustom()
    }
    

    getRecipes=()=>{
        this.setState({recipes:data.recipes})
    }

    getttrpg=()=>{
        this.setState({ttrpg:data.ttrpg})
    }

    getcustom=()=>{
        this.setState({custom:data.custom})
    }


    render(){
        return (
            <div>
                <Navbar />
                <div>
                    <h1 style={{marginLeft:"2%"}}>Recipes</h1>
                    <div style={{display:"flex",width:"100%",overflow:"auto"}}>
                        {this.state.recipes.map(e=><Link to='/recipepage' state={e.id} className={style.card}>
                            <img src={pic} className={style.img}></img>
                            <h3 className={style.title}>{e.title}</h3>
                            <p className={style.text}>{e.desc}</p>
                            <p className={style.text}>Serving size {e.servings}</p>
                        </Link>)}
                    </div>
                    <h1 style={{marginLeft:"2%"}}>Ttrpg</h1>
                    <div style={{display:"flex",width:"100%",overflow:"auto"}}>
                        {this.state.ttrpg.map(e=><Link onClick={()=>this.handleclick(e)} className={style.card}>
                            <img src={pic} className={style.img}></img>
                            <h3 className={style.title}>Name {e.name}</h3>
                            <p className={style.text}>Class {e.class}</p>
                            <p className={style.text}>Race {e.race}</p>
                        </Link>)}
                    </div>
                    <h1 style={{marginLeft:"2%"}}>Custom</h1>
                    <div style={{display:"flex",width:"100%",overflow:"auto"}}>
                        {this.state.custom.map(e=><Link className={style.card}>
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