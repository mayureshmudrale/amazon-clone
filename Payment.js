import React, { useState,useEffect} from 'react'
import './Payment.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { Link ,useHistory } from 'react-router-dom';
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './Reducer';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{basket,user} , dispatch]= useStateValue();

    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [error,setError] = useState(null);
    const [disabled,setdisabled] = useState(true);

    const [succeeded,setsucceeded] = useState(false);
    const [processing,setprocessing] = useState(null);
    const [clientSecret,setClientSecret] = useState(true);

    console.log('basket total',getBasketTotal(basket));

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('clinetsecret',clientSecret);

    const handleSubmit =async (event) =>{
            event.preventDefault();
            setprocessing(true);

            const payload = await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                card:elements.getElement(CardElement)
                }
            }).then(({paymentIntent}) => {

                db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created
                })

                setsucceeded(true);
                setError(null)
                setprocessing(false)

                dispatch({
                    type:"EMPTY_BASKET",
                        
                        
                    
                });
                
                history.replace('/orders')
            })

    }
    
    

    const handleChange =  event=>{
         
        setdisabled(event.empty);
        setError(event.error? event.error.message: "");

    }

    return (
        <div className='payment'> 
            <div className='payment__container'>
                <h1>Checkout(<Link to='/checkout'>{basket?.length}items</Link>) </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>India</p>
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                        <div className='payment__items'>
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

                </div>
                <div className='payment__section'>
                   <div className='payment__title'>
                       <h3>Payment method</h3>
                   </div>
                   <div className='payment__details'>
                       { /** stripe */}
                       <form onSubmit={handleSubmit}>
                           <CardElement onChange={handleChange} />
                           <div className='payment__price'>
                    <CurrencyFormat
                            renderText={(value) =>(
                        <>
                            <p>
                                    subtotal({basket?.length}item):
                                    <strong>{`${value}`}</strong>
                            </p>
                            <small className="subtotal__gift">
                                <input type="Checkbox" /> This order contains a gift 
                                </small>

                        </>
                                )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    housandSeparator={true}
                                    prefix={"₹"}

                            />
                            <button disabled={processing||disabled||succeeded}>
                            <span>{processing?<p>processing</p>:"BUY NOW"}</span></button>
                           </div>
                           {error && <div>{error}</div>}
                       </form>
                   </div>
                </div>
            </div>
            
        </div>
    )
}

export default Payment
