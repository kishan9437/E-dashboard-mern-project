import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
    
    const collectData = async () => {
        console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
        let result = await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result)
        localStorage.setItem('user', JSON.stringify(result));

        if(result){
            navigate('/')
        }    
    }

    return (
        <div className='register'>
            <h1 style={{ marginLeft: '70px' }}>Register</h1>
            <input className='inputBox' type='text' value={name} required onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
            <input className='inputBox' type='text' value={email} required onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input className='inputBox' type='password' value={password} required onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button type='submit' onClick={collectData} className='appButton'>Sign Up</button>
        </div>
    )
}
