import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/components/CartContext"
import axios from "axios"
import ProductItemCart from "@/components/ProductItemCart"
import Layout from "@/components/Layout"

export default function CartPage () {

    const {cartProducts} = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [streetAdress, setstreetAdress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")

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

    async function goToPayment () {
        const response = await axios.post('/api/checkout', {
            name,email,streetAdress,city,postalCode,country,cartProducts
        })
        if (response.data.url) {
            window.location = response.data.url
        }
    }

    return (
        <Layout addclass={"grid-12-8 gap-7 mt-4"}>
            <div className="bg-white rounded-xl p-7">
                <h2 className="font-bold">Cart</h2>
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
                            {cartProducts?.length > 0 && products.map (product => <ProductItemCart product={product} />)}
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
                    <h2 className="font-bold">Order Information</h2>
                    <input 
                        type="text"
                        placeholder="Name"
                        className="input-order"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        name="name"
                    ></input>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="input-order" 
                        value={email} 
                        onChange={(ev) => setEmail(ev.target.value)}
                        name="email"
                    ></input>
                    <input 
                        type="text"
                        placeholder="Street Address" 
                        className="input-order" 
                        value={streetAdress} 
                        onChange={(ev) => setstreetAdress(ev.target.value)}
                        name="streetAdress"
                    ></input>
                    <div className="grid-12-8 gap-2">
                        <input 
                            type="text" 
                            placeholder="City" 
                            className="input-order" 
                            value={city} 
                            onChange={(ev) => setCity(ev.target.value)}
                            name="city"
                        ></input>
                        <input 
                            type="text" 
                            placeholder="Postal Code" 
                            className="input-order" 
                            value={postalCode} 
                            onChange={(ev) => setPostalCode(ev.target.value)}
                            name="postalCode"
                        ></input>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Country" 
                        className="input-order" 
                        value={country} 
                        onChange={(ev) => setCountry(ev.target.value)}
                        name="country"
                    ></input>
                    <input 
                        type="hidden" 
                        value={cartProducts.join(',')}
                        name="products"
                    ></input>
                    <button className="btn-payment" onClick={goToPayment}>Continue to payment</button>
                </div>
            )}
    </Layout>
    )
}