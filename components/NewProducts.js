import ProductBox from "./ProductBox";

export default function NewProducts ({products}) {

    return (
        <div className="centered-box">
            <h2>New arrivals</h2>
            <div className="grid grid-cols-5 gap-9">
                {products?.length && products.map(product => (
                    <ProductBox product={product} key={product._id}/>
                ))}
            </div>
        </div>
    )
}