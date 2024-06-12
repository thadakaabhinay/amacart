import { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../UI/Loader";
import { useDispatch } from "react-redux";
import { loginWithEmailAndPassword, signUpWithEmailAndPassword } from "../../actions/auth";

const AuthIndex=()=>{
    const [details,setDetails]=useState({
        email:"",
        password:""
    })
    const params=useParams()
    const dispatch=useDispatch()
    const history=useHistory()
    const [loader,setLoader]=useState(false)
    const handleInput=e=>{
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
    }
    useEffect(()=>{
       return ()=>{
            setLoader(false)
            setDetails({
                email:"",
                password:""
            })
       } 
    },[])
    const handleSubmission=e=>{
        e.preventDefault();
       
        if(params.type === "signup"){
            setLoader(true)
            dispatch(signUpWithEmailAndPassword(details,data=>{
                if(data.error){
    
                    alert("some Error Occurred")
                }else{
                    console.log("Sucessfully Signed Up")
                    history.replace("/")
                }
                setLoader(false)
            }))
        }
        else if(params.type==="login"){
            setLoader(true)
            dispatch(loginWithEmailAndPassword(details,data=>{
                if(data.error){
                   
                    // alert("some Error Occurred")
                    alert(data?.response?.data?.error?.message || "Some Error Occurred")
                }else{
                    console.log("Sucessfully Logged In !")
                    history.replace("/")
                }
                setLoader(false)
            }))
        }
    }
    

    return(
        <Fragment>
        <div className="auth-container">
            <div className="auth-container--box">
                <div className="tab-selector">
                    <NavLink exact to={"/login"}><h3>Login</h3></NavLink>
                    <NavLink exact to={"/signup"}><h3>Signup</h3></NavLink>
                </div>
                <form autoComplete={"off"} onSubmit={handleSubmission}>
                    <div className="input-wrap">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Enter Email" 
                            value={details.email} 
                            onChange={handleInput}
                        />
                    </div>
                    <div className="input-wrap">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Enter Password" 
                            value={details.password}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="button-wrap">
                        <button className="login-btn">
                            {params.type === "login" ? "Login" : "Signup"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        {loader &&<Loader />}
        </Fragment>
    )
    
}
export default AuthIndex;