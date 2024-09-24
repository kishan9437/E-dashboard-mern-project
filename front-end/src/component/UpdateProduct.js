import React, { useEffect, useState } from 'react'
import { useParams , useNavigate} from 'react-router-dom';

export default function UpdateProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        // console.log(params);
        getProductDetails();
    },[])

    const updateProduct = async () => {
        console.log(name,price,category,company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
            }
        })
        // result = await result.json();
        // console.log(result);
        navigate('/');
    }

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        console.log("product details : ",result)
    }

    return (
        <div className='product'>
            <h1>Update Product </h1>
            <input type='text' placeholder='Enter product name' className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} />

            <input type='text' placeholder='Enter product price' className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} />

            <input type='text' placeholder='Enter product category' className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }} />

            <input type='text' placeholder='Enter product company' className='inputBox' value={company} onChange={(e) => { setCompany(e.target.value) }} />

            <button onClick={updateProduct} type='submit' className='appButton'>Update Product</button>
        </div>
    )
}
