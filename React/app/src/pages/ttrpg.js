import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import style from './ttrpg.module.css'

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
        axios.get("https://eu-de.functions.appdomain.cloud/api/v1/web/ff38d0f2-e12e-497f-a5ea-d8452b7b4737/project/get-ttrpg.json")
        .then(response=>{
            let arr =[]
            arr = response.data.result.filter(e=>e.id!=="_design/5a37cd9b759475008e18a3c5e5037ae264caaf12")
            for(const x of arr){
                if(x.doc._attachments){
                x.doc._attachments.image.data=this.image(x.doc._attachments.image.data)
                }
            }
            this.setState({ttrpg:arr})
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
                    <h1 style={{marginLeft:"2%"}}>Ttrpg</h1>
                    <div style={{display:"flex",width:"100%",flexWrap:'wrap'}}>
                        {this.state.ttrpg.map(e=><Link to='/ttrpgpage' draggable={false} key={e.id} state={e.id} className={style.card}>
                            <img src={e.doc._attachments.image.data} alt='' className={style.img}></img>
                            <h3 className={style.title}>Name {e.doc.chardesc.name}</h3>
                            <p className={style.text}>Class {e.doc.chardesc.class}</p>
                            <p className={style.text}>Race {e.doc.chardesc.race}</p>
                        </Link>)}
                    </div>
                </div>
            </div>
        )
    }
}