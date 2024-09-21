import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const handleLogin = async () => {
        console.warn(email, password)
        let result = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        result = await result.json();
        console.warn(result)
        if (result.name) {
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/');
        } else {
            alert("Please enter connect details")
        }
    }
    return (
        <div className='login'>
            <h1 style={{ marginLeft: '70px' }}>Login</h1>
            <input type='text' className='inputBox' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
            <input type='password' className='inputBox' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter Password' />
            <button onClick={handleLogin} type='button' className='appButton'>Login</button>
        </div>
    )
}
