import Link from "next/link";
import ButtonAddToCart from "./ButtonAddToCart";

export default function Featured({product}) {
    return (

      <div className=" grid grid-cols-2 max-w-[800px] mx-auto ">
        <div className="flex flex-col justify-center mx-auto px-5 py-7 text-white">
          <h1 >{product.title}</h1>
          <p className="text-sm text-gray-400 mb-4">
            {product.description}
          </p>
          <div>
        <Link href={'/products/'+product._id}><button className="btn btn-read">Read More</button></Link>
        <ButtonAddToCart btnText=" Add to Cart" btnType="btn-cart"/>
            </div>
        </div>
        <div className="max-x-full flex flex-col justify-center">
          <img
            src={product.images[0]}
            alt="Featured Product"
          />
        </div>
      </div>

    );
  }
  