import { useContext } from "react"
import { CartContext } from "./CartContext"
import Link from "next/link"
import ButtonAddToCart from "./ButtonAddToCart";

export default function ProductBox ({product}) {
    const url = '/product/'+product._id
    const {addProduct} = useContext(CartContext)
    function addNewtoCart () {
      addProduct(product._id)

    }
    return (
        <div>
            <Link href={url} className="bg-white p-5 flex justify-center items-center rounded-lg mt-3">
                <img src={product.images[0]} className="max-w-full h-[150px]"></img>
            </Link>
            <div className="mt-2">
                <Link href={url}  className="text-base m-0">{product.title}</Link>
                <div className="flex items-center justify-between">
                    <p className="font-bold text-[1.3rem] ">${product.price}</p>
                    <ButtonAddToCart btnType="btn-item" onClick={addNewtoCart}/>
                </div>
            </div>
        </div>
    )
}