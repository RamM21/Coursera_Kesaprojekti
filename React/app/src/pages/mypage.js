import React from 'react'
import axios from 'axios'
import { Link,redirect } from 'react-router-dom'
import Navbar from './navbar'
import style from './mypage.module.css'
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

    async getCustom(){
        let id=sessionStorage.getItem("id")
        await axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-custom.json?userId="+id)
        .then(response=>{
            let arr =[]
            arr = response.data.result.docs
            for(const x of arr){
                if(x._attachments.image){
                x._attachments.image.data=this.image(x._attachments.image.data)
                }
            }
            this.setState({mycustom:arr})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    async getTtrpg(){
        let id=sessionStorage.getItem("id")
        await axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-ttrpg.json?userId="+id)
        .then(response=>{
            let arr =[]
            arr = response.data.result.docs
            for(const x of arr){
                if(x._attachments.image){
                x._attachments.image.data=this.image(x._attachments.image.data)
                }
            }
            this.setState({myttrpg:arr})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    async getRecipe(){
        let id=sessionStorage.getItem("id")
        await axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-recipes.json?userId="+id)
        .then(response=>{
            let arr =[]
            arr = response.data.result.docs
            for(const x of arr){
                if(x._attachments.image){
                x._attachments.image.data=this.image(x._attachments.image.data)
                }
            }
            this.setState({myrecipes:arr})
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
                    <div style={{display:"flex"}}>
                        <h1 style={{marginLeft:"2%"}}>My saved data</h1>
                        <div className={style.select} >
                            <Link className={style.button} to="/newrecipe">New Recipe</Link>
                            <Link className={style.button} to="/newttrpg">New Ttrpg</Link>
                            <Link className={style.button} to="/newcustom">New Custom</Link>
                        </div>
                    </div>
                    <div style={{display:"flex",width:"100%",flexWrap:'wrap'}}>
                            {this.state.myrecipes.map(e=><Link to='/recipepage' draggable={false} key={e._id} state={e._id} className={style.card}>
                                <img src={e._attachments.image.data} className={style.img}></img>
                                <h3 className={style.title}>{e.title}</h3>
                                <p className={style.text}>{e.desc}</p>
                                <p className={style.text}>Serving size {e.servings}</p>
                            </Link>)}
                            {this.state.myttrpg.map(e=><Link to='/ttrpgpage' draggable={false} key={e._id} state={e._id} className={style.card}>
                                <img src={e._attachments.image.data} className={style.img}></img>
                                <h3 className={style.title}>Name {e.chardesc.name}</h3>
                                <p className={style.text}>Class {e.chardesc.class}</p>
                                <p className={style.text}>Race {e.chardesc.race}</p>
                            </Link>)}
                            {this.state.mycustom.map(e=><Link to='/custompage' draggable={false} key={e._id} state={e._id} className={style.card}>
                                <img src={e._attachments.image.data} className={style.img}></img>
                                <h3 className={style.title}>{e.title}</h3>
                                <p className={style.text}>{e.paragraph}</p>
                            </Link>)}
                    </div>
                </div>
            </div>
        )
    }
}