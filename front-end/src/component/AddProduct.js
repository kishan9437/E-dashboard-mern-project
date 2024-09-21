import React, { useState } from 'react'

export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const addProduct =()=>{
        console.log(name,price,category,company);
    }
    return (
        <div className='product'>
            <h1>Add Product </h1>
            <input type='text' placeholder='Enter product name' className='inputBox' onChange={(e)=>{setName(e.target.value)}}/>
            <input type='text' placeholder='Enter product price' className='inputBox' onChange={(e)=>{setPrice(e.target.value)}}/>
            <input type='text' placeholder='Enter product category' className='inputBox' onChange={(e)=>{setCategory(e.target.value)}}/>
            <input type='text' placeholder='Enter product company' className='inputBox' onChange={(e)=>{setCompany(e.target.value)}}/>
            <button onClick={addProduct} type='submit' className='appButton'>Add Product</button>
        </div>
    )
}
