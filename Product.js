import React from 'react';
import './Product.css';
import {useStateValue} from "./StateProvider";
function Product({product}) {
    const [{basket} , dispatch]= useStateValue();
    let id,title,image,price,rating;
    const addtoBasket = () =>{
        dispatch({
            type:"ADD_TO_BASKET",
            item:{
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating,
            },
        });
    };
    {
        title=product?.data.title
        id=product?.data.id
        price=product?.data.price
        image=product?.data.image
        rating=product?.data.rating
    }
   
    return (
        <div className='product'>
          
            <div className='product__info'>
                <p>{title}</p>
                
                <p className='product__price'>
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className='product__rating'>
                    {Array(rating).fill().map(()=>(<p>★</p>))}
                
                </div>
            </div>
                <img src={image}/>
                <button onClick={addtoBasket}>Add to basket</button>
        </div>
    )
}

export default Product
