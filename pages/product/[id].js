import Header from "@/components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default function ProductPage ({product,category}) {

console.log(product)
    return  (
        <>
            <Header />
            <div className="centered-box mt-6">
            <h3 className="mb-3">{category.name}</h3>
                <div className="grid-12-8 gap-3">
                    <div className="flex items-center justify-center bg-white">
                        <img className="w-[400px] h-[400px] p-4" src={product.images?.[0]} alt={`${product.title} Image`} />
                        <div>{!!product.images?.length && product.images.map (link => (
                            <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border boder-gray-200 ">
                                <img src={link} alt="" className="rounded-lg" />
                            </div>
                        ))}</div>
                    </div>
                    <div>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    const product = await Product.findById(context.query.id)
    const category = await Category.findById(product.category)
    return {
        props:{
            product: JSON.parse(JSON.stringify(product)),
            category:JSON.parse(JSON.stringify(category))
        }
    }
}