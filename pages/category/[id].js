import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useState } from "react";
import Layout from "@/components/Layout";

export default function CategoryPage ({category,products}) {
    const [filtersValues, setFilterValues] = useState(category.properties.map(p => ({name:p.name,value:"all"})))
    console.log(filtersValues)

    function handleFilterChange (filterName, filterValue) {
        setFilterValues(prev => {
            return prev.map(p => ({
                name: p.name,
                value: p.name === filterName ? filterValue : p.value
            }))
        })
    }
    return (
        <Layout>
            <div className="flex justify-between place-items-center">
                <h2 className="font-bold">{category.name}</h2>
                <div>
                    {category.properties.map (prop => (
                        <div className="inline-flex" key={prop.name}>
                            {prop.name}:
                            <select 
                                className="mx-2 rounded-lg capitalize" 
                                value={filtersValues.find(f => f.name === prop.name)}
                                onChange={ev => handleFilterChange(prop.name,ev.target.value)}
                                >
                                <option value="all" key="all">All</option>
                                {prop.values?.map(val => (<option value={val} key={val}>{val}</option>))}
                                </select>
                        </div>
                    ))}
                </div>
            </div>
            <div className="category-grid">
                {products.map(p =>
                    <ProductBox product={p} key={p._id} />
                )}
            </div>
        </Layout>
    )
}

export async function getServerSideProps (context) {
    const category = await Category.findById(context.query.id)
    const subCategories = await Category.find({parent: category._id})
    const catIds = [category._id, ...subCategories.map (c => c._id)]
    const products = await Product.find({category: catIds})
    console.log(category)
    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            products: JSON.parse(JSON.stringify(products))
        }
    }
}