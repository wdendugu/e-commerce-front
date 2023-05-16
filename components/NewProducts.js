import ButtonAddToCart from "./ButtonAddToCart";

export default function NewProducts ({products}) {

    return (
        <div className="max-w-[800px] mx-auto">
            <div className="grid grid-cols-4 gap-9">
                {products?.length && products.map(product => (
                    <div>
                        <div className="bg-white p-5 flex justify-center items-center rounded-lg mt-3">
                            <img src={product.images[0]} className="max-w-full h-[150px]"></img>
                        </div>
                        <div className="mt-2">
                            <h2 className="text-base m-0 ">{product.title}</h2>
                            <div className="flex items-center justify-between">
                            <p className="font-bold text-xl ">${product.price}</p>
                            <ButtonAddToCart btnType="btn-item"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}