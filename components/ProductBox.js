import { useContext, useState } from "react"
import { CartContext } from "./CartContext"
import Link from "next/link"
import ButtonAddToCart from "./ButtonAddToCart";
import HeartOutlineIcon from "@/icon/HeartOutlineIcon";
import HeartFilledIcon from "@/icon/HeartFilledIcon";
import axios from "axios";


export default function ProductBox ({product,wished="false",onRemovefromWishList=()=>{}}) {
    
    const [isWished, setIsWished] = useState(wished)
    const url = '/product/'+product._id
    const {addProduct} = useContext(CartContext)

    function addToWishList () {
        const nextValue = !isWished
        if (nextValue === false && onRemovefromWishList) {
            onRemovefromWishList(product._id)
        }
        axios.post("/api/wishList", {
            product: product._id
        }).then (()=> {})
        setIsWished(nextValue)
    }
    function addNewtoCart () {
      addProduct(product._id)
    }
    return (
        <div>
            <div className="bg-white p-5 flex justify-center relative items-center rounded-lg mt-3">
                    <button className="w-5 absolute top-1 right-1 cursor-pointer" onClick={addToWishList} wished={isWished}>
                        {isWished ? 
                        <HeartFilledIcon /> :
                        <HeartOutlineIcon /> 
                        }
                    </button>
                    <Link href={url}>
                        <img src={product.images?.[0]} className="max-w-full h-[150px]"></img>
                    </Link>
            </div>
            <div className="mt-2">
                <Link href={url}  className="text-base m-0">{product.title}</Link>
                <div className="flex items-center justify-between">
                    <p className="font-bold text-[1.3rem] ">${product.price}</p>
                    <ButtonAddToCart btnType="btn-item" onClick={addNewtoCart} />
                </div>
            </div>
        </div>
    )
}