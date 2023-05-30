import ProductBox from "./ProductBox";

export default function NewProducts ({products}) {

    return (
        <div className="centered-box">
            <h2>New arrivals</h2>
            <div className="product-grid">
                {products?.length && products.map(product => (
                    <ProductBox product={product} key={product._id}/>
                ))}
            </div>
        </div>
    )
}