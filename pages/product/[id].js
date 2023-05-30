import Layout from "@/components/Layout";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import ImageBar from "@/components/ImageBar";
import CartButton from "@/components/ButtonAddToCart";
import { useContext } from "react"
import { CartContext } from "@/components/CartContext";


export default function ProductPage ({product}) {

    const {addProduct} = useContext(CartContext)

    function addNewtoCart () {
        addProduct(product._id)
    }

    return  (
        <Layout>
            <div className="grid-12-8 product-grid">
                <div className="flex items-center justify-center bg-white rounded-lg">
                    <ImageBar images={product.images}/>    
                </div>
                <div>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <div className="flex justify-between">
                        <h2>${product.price}</h2>
                        <CartButton btnType="btn-productpage" onClick={addNewtoCart} btnText={" Add to Cart"}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    const product = await Product.findById(context.query.id)
    return {
        props:{
            product: JSON.parse(JSON.stringify(product))
        }
    }
}