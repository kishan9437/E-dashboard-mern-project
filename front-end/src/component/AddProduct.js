import React, { useState } from 'react'

export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId)
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'POST',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        // console.warn(result)
        setName('');
        setPrice('');
        setCategory('');
        setCompany('');
    }
    return (
        <div className='product'>
            <h1>Add Product </h1>
            <input type='text' placeholder='Enter product name' className='inputBox' onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type='text' placeholder='Enter product price' className='inputBox' onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type='text' placeholder='Enter product category' className='inputBox' onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input type='text' placeholder='Enter product company' className='inputBox' onChange={(e) => { setCompany(e.target.value) }} />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button onClick={addProduct} type='submit' className='appButton'>Add Product</button>
        </div>
    )
}
