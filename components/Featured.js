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
        <div className="centered-box grid grid-12-8">
          
          <div className="flex-col-center mx-auto px-5 py-7 text-white">
            <h1 >{product.title}</h1>
            <p className="text-sm text-gray-400 mb-4">
              {product.description}
            </p>
            <div>
              <Link href={'/products/'+product._id}><button className="btn btn-read">Read More</button></Link>
              <ButtonAddToCart btnText=" Add to Cart" btnType="btn-cart" onClick={addFeaturedtoCart}/>
            </div>
          </div>

          <div className="max-x-full flex-col-center">
            <img
              src={product.images[0]}
              alt="Featured Product"
              className="py-8 max-h-[500px] object-contain"
            />
          </div>

        </div>
      </div>

    );
  }
  