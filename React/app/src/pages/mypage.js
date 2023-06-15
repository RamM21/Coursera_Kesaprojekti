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
        this.getdata()
    }

    getdata=()=>{
        this.setState({myrecipes:data.recipes})
        this.setState({myttrpg:data.ttrpg})
        this.setState({mycustom:data.custom})
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
                            {this.state.myrecipes.map(e=><Link to='/recipepage' draggable={false} state={e.id} className={style.card}>
                                <img src={pic} className={style.img}></img>
                                <h3 className={style.title}>{e.title}</h3>
                                <p className={style.text}>{e.desc}</p>
                                <p className={style.text}>Serving size {e.servings}</p>
                            </Link>)}
                            {this.state.myttrpg.map(e=><Link to='/ttrpgpage' draggable={false} state={e.id} className={style.card}>
                                <img src={pic} className={style.img}></img>
                                <h3 className={style.title}>Name {e.chardesc.name}</h3>
                                <p className={style.text}>Class {e.chardesc.class}</p>
                                <p className={style.text}>Race {e.chardesc.race}</p>
                            </Link>)}
                            {this.state.mycustom.map(e=><Link to='/custompage' draggable={false} state={e.id} className={style.card}>
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