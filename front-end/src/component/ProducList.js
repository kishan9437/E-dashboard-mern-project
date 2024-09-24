import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ProducList() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
            }
        });
        result = await result.json();
        setProduct(result)
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE',
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
            alert("Product deleted successfully!");
        }
    }

    const searchHandle = async (e) => {
        let key = e.target.value.toLowerCase();
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers: {
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
                }
            })
            result = await result.json();
            if (result) {
                setProduct(result);
            }
        }
        else {
            getProducts();
        }

    }

    return (
        <div className='product-list'>
            <h1>Product list</h1>
            <input type='text' placeholder='Search Product' className='search-product-box' onChange={searchHandle} />
            <ul>
                <li><b>S.No</b></li>
                <li><b>Name</b></li>
                <li><b>Price</b></li>
                <li><b>Category</b></li>
                <li><b>Company</b></li>
                <li><b>Operation</b></li>
            </ul>
            {
                product.length>0 ? product.map((item, index) => (
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link className='update' to={'/update/' + item._id}>Update</Link>
                        </li>
                    </ul>
                )):<h1>No Result Found</h1>
            }
        </div>
    )
}
