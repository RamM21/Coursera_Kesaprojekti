import React from 'react'
import axios from 'axios'
import { Link,redirect } from 'react-router-dom'
import Navbar from './navbar'
import style from './mypage.module.css'
import data from './data.json'
import pic from '../logo512.png'


export default class mypage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            myrecipes:[],
            myttrpg:[],
            mycustom:[]
        }
    }


    componentDidMount=()=>{
        this.getCustom()
        this.getRecipe()
        this.getTtrpg()
    }

    getCustom=()=>{
        let id=sessionStorage.getItem("id")
        axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-custom.json?userId="+id)
        .then(response=>{
            let arr =[]
            arr = response.data.result.docs
            this.setState({mycustom:arr})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    getTtrpg=()=>{
        let id=sessionStorage.getItem("id")
        axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-ttrpg.json?userId="+id)
        .then(response=>{
            let arr =[]
            arr = response.data.result.docs
            this.setState({myttrpg:arr})
        })
        .catch(err=>{
            console.log(err)
        })
    }

     getRecipe=()=>{
        let id=sessionStorage.getItem("id")
         axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-recipes.json?userId="+id)
        .then(response=>{
            let arr =[]
            arr = response.data.result.docs
            this.setState({myrecipes:arr})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return (
            <div>
                <div>
                    <div style={{display:"flex"}}>
                        <h1 style={{marginLeft:"2%"}}>My saved data</h1>
                        <div className={style.select} >
                            <Link className={style.button} to="/newrecipe">New Recipe</Link>
                            <Link className={style.button} to="/newttrpg">New Ttrpg</Link>
                            <Link className={style.button} to="/newcustom">New Custom</Link>
                        </div>
                    </div>
                    <div style={{display:"flex",width:"100%",flexWrap:'wrap'}}>
                            {this.state.myrecipes.map(e=><Link to='/recipepage' draggable={false} state={e._id} className={style.card}>
                                <img src={e.image.file} className={style.img}></img>
                                <h3 className={style.title}>{e.title}</h3>
                                <p className={style.text}>{e.desc}</p>
                                <p className={style.text}>Serving size {e.servings}</p>
                            </Link>)}
                            {this.state.myttrpg.map(e=><Link to='/ttrpgpage' draggable={false} state={e._id} className={style.card}>
                                <img src={e.chardesc.appearance.file} className={style.img}></img>
                                <h3 className={style.title}>Name {e.chardesc.name}</h3>
                                <p className={style.text}>Class {e.chardesc.class}</p>
                                <p className={style.text}>Race {e.chardesc.race}</p>
                            </Link>)}
                            {this.state.mycustom.map(e=><Link to='/custompage' draggable={false} state={e._id} className={style.card}>
                                <img src={e.image.file} className={style.img}></img>
                                <h3 className={style.title}>{e.title}</h3>
                                <p className={style.text}>{e.paragraph}</p>
                            </Link>)}
                    </div>
                </div>
            </div>
        )
    }
}