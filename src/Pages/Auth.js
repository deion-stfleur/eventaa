import React, {useState, useEffect} from 'react';
import '../../src/App.css'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom"

const Auth = ({onSignUp}) => {

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/",{
                email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    history("/home",{state:{id:email}})
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }
    return (
        <div>

            <div className='form-container'>
       

            <h1 className='auth-h1'>Welcome</h1>
            <p>Please sign inor sign up below</p>

<form className='form' action="POST">
    <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
    <input className='submit-btn' type="submit" onClick={submit} />

</form>

<br />
<p>OR</p>
<br />

<Link to="/signup">Signup Page</Link>
       

            </div>
      </div>
    );
  };
  
  export default Auth;