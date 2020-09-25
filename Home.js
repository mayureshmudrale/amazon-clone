import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import './Home.css';
import Product from './Product'
import product_ from './product_';
import { useStateValue } from './StateProvider';
function Home() {
    const [products,setproducts] = useState([]);
    const [computers,setcomputers] = useState([]);
    
    
    useEffect(() =>{
        db
        .collection('products')
        .doc('6QuKJoR2ISVrCMzKxsKX')
        .collection('mobiles')
        .onSnapshot(snapshot => (setproducts(snapshot.docs.map(doc => ({
            
            data:doc.data()

        }))
        )))

        db
          .collection('products')
          .doc('6QuKJoR2ISVrCMzKxsKX')
          .collection('computers')
          .onSnapshot(snapshot => (setcomputers(snapshot.docs.map(doc => ({
            
            data:doc.data()

        }))
        )))
       
           

        })
        
       {


       }
       
    
    
    return (
       
        <div className='home'>
            <div className='home__container'>
                <img  className='home__image' src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Rajeshwari/September/GWBanners/Control/DesktopHero_1500x600._CB405007888_.jpg"/>
                <div className='home__row'>

                    {
                        products?.map(product =>(
                            
                            <Product product={product}/>
                            
                        ))
                    }
                    
                    
                </div>
                <div className='home__row'>

                {
                        computers?.map(product =>(
                            
                            <Product product={product}/>
                            
                        ))
                    }
                
               
               
                </div>
                <div className='home__row'>
             
                
                </div>
            </div>
        </div>
    )
}

export default Home
