import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";

export default function AllProductsPage ({products}) {
    return (
        <>
            <Header/>
            <div className="centered-box">
                <h2 className="font-bold">All Products</h2>
                <div className="grid grid-cols-5 gap-9">
                {products?.length && products.map(product => (
                    <ProductBox product={product} key={product._id}/>
                ))}
            </div>
            </div>
        </>
        
    )
}

export async function getServerSideProps(){
    await mongooseConnect()
    const products = await Product.find({},null,{sort:{'_id':-1}})
    return {
        props:{
            products: JSON.parse(JSON.stringify(products))
    }}
}