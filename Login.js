import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css'
import {auth} from './firebase'
function Login() {
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const signIn = e =>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then((auth) =>{
            history.push('/')
        })
        .catch(error => alert(error.message))
    } 
    
    const register = e =>{
        e.preventDefault();
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((auth) =>{
            history.push('/')
        })
        .catch(error => alert(error.message))
        
       
    }


    return (
        <div className='login'>
            <Link to='/'>
                <img className='login__logo' src='data:image/png;base64,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'/>
            </Link>
            <div className='login__container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>Email</h5>
                    <input type='text' value={email} onChange={e =>setEmail(e.target.value)}></input>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e =>setPassword(e.target.value)}></input>
                    <button type='submit'  onClick={signIn} className='login__signInButton'> Sign in</button>
                </form>
                <p>
                    By signing-in you agree to the AMZON FAKE CLONE 
                    Condition of Use & Sake. Please See our Privacy Notice,
                    our Cookies Notice and Interest-Based Ads Notice.
                </p>
                <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
