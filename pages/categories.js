import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import Link from "next/link";

export default function CategoriesPage ({mainCategories,categoriesProducts,allCategories}) {

    return (
        <>
        <Header />
        <div className="centered-box">
            <h2 className="font-bold">All Categories</h2>
            {mainCategories.map(cat => (
                <div key={cat._id}>
                    <div className="flex items-center gap-11">
                        <h2>{cat.name}</h2>
                        <Link href={"/category/"+cat._id}>Show all</Link>
                    </div>
                    <div className="grid grid-cols-4 gap-5">
                        {categoriesProducts[cat._id]?.map(p => (
                            <ProductBox product={p} key={p._id}/>
                        ))}
                        <Link className="bg-gray-200 p-5 flex justify-center items-center rounded-lg mt-3 h-[70%]" href={"/category/"+cat._id}>{"Show All >"}</Link>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export async function getServerSideProps(){
    await mongooseConnect()
    const categories = await Category.find({})
    const mainCategories = categories.filter(c => !c.parent)
    const categoriesProducts = {}
    
    for (const mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString()
        const childCatIds = categories.filter (c => c?.parent?.toString() === mainCatId).map(c => c._id)
        const categoriesIds = [mainCatId, ...childCatIds]
        const products = await Product.find({category: categoriesIds}, null, {limit:3,sort:{"_id":-1}})
        categoriesProducts[mainCat._id] = products
    }
    return {
        props:{
            allCategories: JSON.parse(JSON.stringify(categories)),
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts))
        }
    }
}