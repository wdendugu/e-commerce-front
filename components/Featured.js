import Link from "next/link";
import { useContext } from "react";
import ButtonAddToCart from "./ButtonAddToCart";
import { CartContext } from "./CartContext";

export default function Featured({product}) {
  const {addProduct} = useContext(CartContext)

  function addFeaturedtoCart () {
    addProduct(product._id)
  }

    return (
      <div className="bg-[#222]">
        <div className="centered-box grid-12-8">
          <div className="flex-col-center mx-auto px-5 py-7 text-white">
            <h1>{product.title}</h1>
            <p className="text-xs text-gray-400 mb-4">
              {product.description}
            </p>
            <div className="flex items-center mx-auto sm:mx-0 sm:mt-10">
              <Link href={'/product/'+product._id}><button className="btn btn-read">Read More</button></Link>
              <ButtonAddToCart btnText=" Add to Cart" btnType="btn-cart" onClick={addFeaturedtoCart}/>
            </div>
          </div>
          <div className="max-x-full flex-col-center order-[-1] sm:order-1">
            <img
              src={product.images[0]}
              alt="Featured Product"
              className="mb-[-20px] sm:py-8 max-h-[400px] object-contain"
            />
          </div>
        </div>
      </div>

    );
  }
  