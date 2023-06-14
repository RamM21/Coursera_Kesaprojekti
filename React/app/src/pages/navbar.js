import React,{ useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import style from './navbar.module.css'

export default function Navbar(props) {
    const navigate = useNavigate()
    const [logout,setlogout]=useState(false)
    function handlelogout(){
        sessionStorage.removeItem("user")
        setlogout(true)
    }
    useEffect(()=>{
        if(logout){
            console.log("logout");
            props.log(false)
            navigate('/')
        }
    })
    
    var user = sessionStorage.getItem("user")
    if(user){
    return(
        <div className={style.nav}>
            <div className={style.content}>
                <div style={{marginBottom:'1%'}}>
                    <Link className={style.link} to="/" >Home</Link>
                    <Link className={style.link} to="/recipe" >Recipes</Link>
                    <Link className={style.link} to="/ttrpg" >Ttrpg</Link>
                    <Link className={style.link} to="/custom" >Custom</Link>
                </div>
                <div style={{marginLeft:"67%",display:"flex",alignSelf:"flex-start"}}>
                    <Link className={style.mypage} to="/mypage">Mypage</Link>
                    <Link className={style.login} to='/'><button onClick={()=>handlelogout()} className={style.loginbut}>logout</button></Link>
                </div>
            </div>
        </div>
        
    )}
    else{
        return(
            <div className={style.nav}>
                <div className={style.content}>
                    <div style={{marginBottom:'1%'}}>
                        <Link className={style.link} to="/" >Home</Link>
                        <Link className={style.link} to="/recipe" >Recipes</Link>
                        <Link className={style.link} to="/ttrpg" >Ttrpg</Link>
                        <Link className={style.link} to="/custom" >Custom</Link>
                    </div>
                    <div style={{marginLeft:"70%",display:"flex",alignSelf:"flex-start"}}>
                        <Link className={style.signup} to='/signup'><button className={style.signupbut}>Sign up</button></Link>
                        <Link className={style.login} to='/login'><button className={style.loginbut}>Login</button></Link>
                    </div>
                </div>
            </div>
            
        )
    }
}