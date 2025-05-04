import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


import './LogIn.css'
import axios from 'axios'; // Import Axios
import userIcon from '../../src/assets/person.png'
import passwordIcon from '../../src/assets/password.png'
import nature from '../../src/assets/nature.jpg'

function LogIn({ onLogin }) {

    //const [action,setAction] = useState("Sign Up"); //default state of container

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleRedirectToSignUp = () => {
        navigate('/SignUp');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(process.env.REACT_APP_USER_SERVICE_URL)
        axios.post(`${process.env.REACT_APP_USER_SERVICE_URL}/login`, {username, password})
            .then((res)=>{
                    console.log(res.data);
                    console.log()
                    setMessage(res.data);
                    if( res.data == "User Authenticated" )
                    {
                        onLogin(username);//added for App
                        setTimeout(()=> {
                        navigate("/TaskView", {state : username});}, 100);
                    }
            })
            .catch((err)=>{
                if (err.response) {
                            console.log(err.response.data);  // This will work if `err.response` is available
                        } else {
                            console.error("Error: No response received from server", err);
                        }
            });
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{"Hello"}</div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='inputs'>
                <div className='input'>
                    <img src = {userIcon} alt = "" />
                    <input type = {'text'} id = {"username"} value = {username}
                           placeholder = 'Username' onChange = {(e)=>setUsername(e.target.value)} />
                </div>
                <div className='input'>
                    <img src={passwordIcon} alt=""/>
                    <input type={"password"} id = {"password"} value = {password}
                           placeholder = 'Password' onChange = {(e)=>setPassword(e.target.value)} />
                </div>
            </div>

                <div className = "LogIn" type = "button" onClick={handleSubmit}>LogIn</div>
            </form>
                <div className = "SignUp-link" onClick={handleRedirectToSignUp}>
                    <span>Are you a new User?If yes,Signup here</span>
                </div>
                <p>{message}</p>
        </div>
);
}

export default LogIn;

