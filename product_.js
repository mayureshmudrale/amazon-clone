import React from 'react'
import Product from './Product'

function product_({product}) {
    
    console.log("product",product?.data.title)
    return (
        <div>
             {product.data?.map(item =>(
                 <Product
                 id={item.id}
                 title={item.title}
                 image={item.image}
                 price={item.price}
                 rating={item.rating}
                 

                 />
             ))}
        </div>
    )
}

export default product_
