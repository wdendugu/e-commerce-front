import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";

export default function AllProductsPage ({products}) {
    return (
        <Layout >
            <h2 className="font-bold">All Products</h2>
            <div className="product-grid">
            {products?.length && products.map(product => (
                <ProductBox product={product} key={product._id}/>
            ))}
            </div>
        </Layout>
        
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