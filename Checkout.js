import React from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal'

function Checkout() {
    const [{basket},dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img src ='https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2020/May/gaming_1500x600._CB431281464_.jpg'/>
                <div >
                <h2 className='checkout__title'> Your Shopping  basket</h2>
                {basket.map(item =><CheckoutProduct
                    id= {item.id}
                    title = {item.title}
                    image= {item.image}
                    price = {item.price}
                    rating = {item.rating}
                    />
                    )}
            </div>
                
            </div>
            
            <div className='checkout__right'>
                <div className='checkout__subtotal'>
               <Subtotal/>
                </div>
            </div>
        </div>
    )
}

export default Checkout
