import React from 'react'
import axios from 'axios'
import { Await, Link } from 'react-router-dom'
import Navbar from './navbar'
import data from './data.json'
import style from './main.module.css'
import pic from '../logo512.png'

export default class main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            recipes:[],
            ttrpg:[],
            custom:[],
            image:{}
        }
    }

    componentDidMount=()=>{
        this.getRecipes()
        this.getttrpg()
        this.getcustom()
    }
    

    getRecipes=()=>{
        axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-recipes.json")
        .then(response=>{
            let arr =[]
            arr = response.data.result.filter(e=>e.id!=="_design/51ab035d1c4caacddd22c5982a903909c3d7b47b")
            console.log(arr)
            for(const x of arr){
                if(x.doc._attachments){
                x.doc._attachments.image.data=this.image(x.doc._attachments.image.data)
                }
            }
            this.setState({recipes:arr})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    getttrpg=()=>{
        axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-ttrpg.json")
        .then(response=>{
            let arr =[]
            arr = response.data.result.filter(e=>e.id!=="_design/5a37cd9b759475008e18a3c5e5037ae264caaf12")
            this.setState({ttrpg:arr})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    getcustom=()=>{
        axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-custom.json")
        .then(response=>{
            let arr =[]
            arr = response.data.result.filter(e=>e.id!=="_design/5a37cd9b759475008e18a3c5e5037ae264caaf12")
            for(const x of arr){
                if(x.doc._attachments.test){
                x.doc._attachments.test.data=this.image(x.doc._attachments.test.data)
                }
            }
            this.setState({custom:arr})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    image=(data)=>{
        const byteCharacters = atob(data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        let image = new Blob([byteArray], { type: 'image/jpeg' });
        let imageUrl = URL.createObjectURL(image);
        return imageUrl
    }


    render(){
        return (
            <div>
                <div>
                    <h1 style={{marginLeft:"2%"}}>Recipes</h1>
                    <div style={{display:"flex",width:"100%",overflow:"auto"}}>
                        {this.state.recipes.map(e=><Link to='/recipepage' draggable={false} state={e.id} className={style.card}>
                            {e.doc._attachments ? <img src={e.doc._attachments.image.data} className={style.img}/>:<img/>}
                            <h3 className={style.title}>{e.doc.title}</h3>
                            <p className={style.text}>{e.doc.desc}</p>
                            <p className={style.text}>Serving size {e.doc.servings}</p>
                        </Link>)}
                    </div>
                    <h1 style={{marginLeft:"2%"}}>Ttrpg</h1>
                    <div style={{display:"flex",width:"100%",overflow:"auto"}}>
                        {this.state.ttrpg.map(e=><Link to='/ttrpgpage' draggable={false} state={e.id} className={style.card}>
                            {e.doc.chardesc.appearance.file ? <img src={e.doc.chardesc.appearance} className={style.img}/>:<img/>}
                            <h3 className={style.title}>Name {e.doc.chardesc.name}</h3>
                            <p className={style.text}>Class {e.doc.chardesc.class}</p>
                            <p className={style.text}>Race {e.doc.chardesc.race}</p>
                        </Link>)}
                    </div>
                    <h1 style={{marginLeft:"2%"}}>Custom</h1>
                    <div style={{display:"flex",width:"100%",overflow:"auto"}}>
                        {this.state.custom.map(e=><Link to='/custompage' draggable={false} state={e.id} className={style.card}>
                            {e.doc._attachments.test ? <img src={e.doc._attachments.test.data} className={style.img}/>:<img/>}
                            <h3 className={style.title}>{e.doc.title}</h3>
                            <p className={style.text}>{e.doc.paragraph}</p>
                        </Link>)}
                    </div>
                </div>
            </div>
        )
    }
}