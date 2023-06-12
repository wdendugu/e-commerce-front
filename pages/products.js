import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import { getServerSession } from "next-auth";
import { WishedProduct } from "@/models/WishedProduct";
import { authOptions } from "./api/auth/[...nextauth]";


export default function AllProductsPage ({products, wishedProducts}) {
    return (
        <Layout >
            <h2 className="font-bold">All Products</h2>
            <div className="product-grid">
            {products?.length && products.map(product => (
                <ProductBox product={product} key={product._id} wished={wishedProducts.includes(product._id)} />
            ))}
            </div>
        </Layout>
        
    )
}

export async function getServerSideProps(ctx){
    await mongooseConnect()
    const products = await Product.find({},null,{sort:{'_id':-1}})
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    const wishedProducts = session?.user ?
        await WishedProduct.find({
            userEmail:session?.user.email,
            product: products.map(p => p._id.toString())
        }) : []
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
            wishedProducts: wishedProducts.map(i => i.product.toString())
    }}
}