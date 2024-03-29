import Layout from "@/components/Layout";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import ImageBar from "@/components/ImageBar";
import CartButton from "@/components/ButtonAddToCart";
import { useContext } from "react"
import { CartContext } from "@/components/CartContext";
import ProductReviews from "@/components/ProductReviews";


export default function ProductPage ({product}) {

    const {addProduct} = useContext(CartContext)

    function addNewtoCart () {
        addProduct(product._id)
    }

    return  (
        <Layout>
            <div className="grid-12-8 mt-4">
                <div className="flex items-center justify-center bg-white rounded-lg gap-5 w-[98.3%]">
                    <ImageBar images={product.images}/>    
                </div>
                <div>
                    <h1 className="font-bold">{product.title}</h1>
                    <p>{product.description}</p>
                    <div className="flex sm:justify-between lg:flex-row flex-col">
                        <h2 className="price-tag">{   
                            new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS"
                            }).format(product.price)
                            }   
                        </h2>
                        <CartButton btnType="btn-productpage" onClick={addNewtoCart} btnText={" Add to Cart"}/>
                    </div>
                </div>
            </div>
            <ProductReviews product={product} />
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