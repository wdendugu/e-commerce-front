import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import Link from "next/link";
import Layout from "@/components/Layout";
import { getServerSession } from "next-auth";
import { WishedProduct } from "@/models/WishedProduct";
import { authOptions } from "./api/auth/[...nextauth]";

export default function CategoriesPage ({mainCategories,categoriesProducts,allCategories,wishedProducts=[]}) {

    return (
        <Layout>
            <h2 className="font-bold">All Categories</h2>
            {mainCategories.map(cat => (
                <div key={cat._id}>
                    <div className="flex items-center gap-11">
                        <h2>{cat.name}</h2>
                    </div>
                    <div className="category-grid">
                        {categoriesProducts[cat._id]?.map(p => (
                            <ProductBox product={p} key={p._id} wished={wishedProducts.includes(p._id)}/>
                        ))}
                        <Link className="bg-gray-200 p-5 flex justify-center items-center rounded-lg mt-3 h-[70%]" href={"/category/"+cat._id}>{"Show All >"}</Link>
                    </div>
                </div>
            ))}
        </Layout>
    )
}

export async function getServerSideProps(ctx){
    await mongooseConnect()
    const categories = await Category.find({})
    const mainCategories = categories.filter(c => !c.parent)
    const categoriesProducts = {}
    const fetchedProductsId= []
    
    for (const mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString()
        const childCatIds = categories.filter (c => c?.parent?.toString() === mainCatId).map(c => c._id)
        const categoriesIds = [mainCatId, ...childCatIds]
        const products = await Product.find({category: categoriesIds}, null, {limit:3,sort:{"_id":-1}})
        fetchedProductsId.push(...products.map(p => p._id.toString()))
        categoriesProducts[mainCat._id] = products
    }

    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    const wishedProducts = session?.user ?
        await WishedProduct.find({
            userEmail:session?.user.email,
            product: fetchedProductsId
      }) : []
    return {
        props:{
            allCategories: JSON.parse(JSON.stringify(categories)),
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
            wishedProducts: wishedProducts.map(i => i.product.toString())
        }
    }
}