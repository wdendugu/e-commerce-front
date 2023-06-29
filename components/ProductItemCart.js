import { CartContext } from "./CartContext"
import { useContext } from "react"

export default function ProductItemCart ({product}) {
    const {cartProducts, addProduct, removeProduct} = useContext(CartContext)

    function moreOfThisProduct (id) {
        addProduct(id)
    }

    function lessOfThisProduct (id) {
        removeProduct(id)
    }
    
    return (
        <tr className="border-t-2 ">
            <td className="py-2">
                {product.title}
                <div className="cart-img-box">
                    <img src={product.images[0]} alt="" className="max-w-[80px] max-h-[80px]"/>
                </div>
            </td>
            <td>
                <button onClick={() => lessOfThisProduct(product._id)}>-</button>
                <label className="px-2">
                    {cartProducts.filter(id => id === product._id ).length}
                </label>
                <button onClick={() => moreOfThisProduct(product._id)}>+</button>
            </td>
            <td className="text-right">
                ${cartProducts.filter(id => id === product._id ).length * product.price}
            </td>
        </tr>
    )
}