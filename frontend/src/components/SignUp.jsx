import { useState } from 'react'

import './SignUp.css'
import axios from 'axios'; // Import Axios
import emailIcon from '../../src/assets/email.png'
import userIcon from '../../src/assets/person.png'
import passwordIcon from '../../src/assets/password.png'
import {useNavigate} from "react-router-dom";

function SignUp() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

    const navigate = useNavigate();

     const handleSubmit = async (event) => {
        event.preventDefault();

            // const url = await a/zxios.post('http://localhost:8080/signup', {username, password});
            console.log(password,username,email);
            axios.post(`${process.env.REACT_APP_USER_SERVICE_URL}/users/signup`, {username, password, email})
                .then((res)=>{
                    console.log(res);
                    setMessage("Successfully Registered");
                    setTimeout(()=> {
                        navigate("/");},
                        500 );
                })
                .catch((err)=>console.log(err.response.data));
     }

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{"Hello Buddy"}</div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='inputs'>
                <div className='input'>
                    <img src = {userIcon} alt = "" />
                    <input type = {'text'} id = {"username"} value = {username}
                           placeholder = 'Username' onChange = {(e)=>setUsername(e.target.value)} />
                </div>
                <div className='input'>
                    <img src={emailIcon} alt=""/>
                    <input type={"email"} id = {"email"} value = {email}
                           placeholder='Email Id' onChange = {(e)=>setEmail(e.target.value)} />
                </div>
                <div className='input'>
                    <img src={passwordIcon} alt=""/>
                    <input type={"password"} id = {"password"} value = {password}
                           placeholder = 'Password' onChange = {(e)=>setPassword(e.target.value)} />
                </div>
            </div>
            <div>
                <div className = "submit" type = "button" onClick={handleSubmit}>SignUp</div>
            </div>
          </form>
                {message && <p>{message}</p>}
        </div>
);
}

export default SignUp;
