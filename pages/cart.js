import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/components/CartContext"
import Header from "@/components/Header"
import axios from "axios"
import ProductItemCart from "@/components/ProductItemCart"

export default function CartPage () {

    const {cartProducts} = useContext(CartContext)
    const [products, setProducts] = useState([])

    useEffect (() =>{
        if (cartProducts.length > 0) {
            axios.post('/api/cart' , {ids:cartProducts})
            .then (response => {setProducts(response.data)})
        }
    },[cartProducts])

    let total = 0

    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0
        total += price
    }

    return (
        <>
        <Header/>
        <div className="product-grid grid-12-8 centered-box">
            <div className="bg-white rounded-xl p-7">
                <h2>Products</h2>
                {!cartProducts?.length && (<div>Your cart is empty</div>)}
                {products?.length > 0 && (
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.length > 0 && products.map (product => <ProductItemCart product={product} />)}
                            <tr className="border-t-2">
                                <td>Total</td>
                                <td></td>
                                <td>${total}</td>
                            </tr>  
                        </tbody>
                    </table>
                )}
            </div>
            {!!cartProducts?.length && (
                <div className="bg-white rounded-xl p-7">
                    <h2>Order Information</h2>
                    <input type="text" placeholder="Address"></input>
                    <input type="text" placeholder="Address 2"></input>
                    <button className="block w-full bg-black rounded-lg text-white ">Continue to payment</button>
                </div>
            )}
        </div>
        </>
    )
}