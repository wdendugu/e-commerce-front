import ProductBox from "./ProductBox";

export default function NewProducts ({products}) {

    return (
        <div className="max-w-[1200px] mx-auto">
            <h2 className="text-4xl  my-6">New arrivals</h2>
            <div className="grid grid-cols-5 gap-9">
                {products?.length && products.map(product => (
                    <ProductBox product={product} key={product._id}/>
                ))}
            </div>
        </div>
    )
}