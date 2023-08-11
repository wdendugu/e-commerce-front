import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "next-auth";

export default function CategoryPage ({category,subCategories,products:originalProducts,wishedProducts=[]}) {

    const defaultSorting = "price_desc"
    const defaultFilterValues = category.properties.map(p => ({name:p.name,value:"all"}))

    const [products, setProducts] = useState(originalProducts)
    const [filtersValues, setFilterValues] = useState(defaultFilterValues)
    const [sort, setSort] = useState(defaultSorting)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [filtersChanged, setFiltersChanged] = useState(false)

    function handleFilterChange (filterName, filterValue) {
        setFilterValues(prev => {
            return prev.map(p => ({
                name: p.name,
                value: p.name === filterName ? filterValue : p.value
            }))
        })
        setFiltersChanged(true)
    }

    // Checks if the filters have changed, if not, it returns page with no Spinner //
    useEffect(() => {
        if (!filtersChanged) {
            return
        }
    })

    // Builds the url for querying the api to get the filtered products //
    useEffect (() => {
        setLoadingProducts(true)
        const catIds = [category._id, ...(subCategories?.map (c => c._id) || [] )]
        const params = new URLSearchParams

        params.set("categories", catIds.join(","))
        params.set("sort", sort)
        
        filtersValues.forEach(f => {
            if (f.value !== "all") {
                params.set(f.name,f.value)
            }
        })

        const url = "/api/products?" + params.toString()

        axios.get(url).then (res => {
            setProducts(res.data)
            setLoadingProducts(false)                
        })
    },[filtersValues, sort, filtersChanged])


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
                                value={filtersValues.find(f => f.name === prop.name).value}
                                onChange={ev => handleFilterChange(prop.name,ev.target.value)}
                                >
                                <option value="all" key="all">All</option>
                                {prop.values?.map(val => (<option value={val} key={val}>{val}</option>))}
                                </select>
                        </div>
                    ))}
                    <div className="inline-flex">
                        Sort:
                        <select
                            value={sort}
                            onChange={ev => {
                                setSort(ev.target.value)
                                setFiltersChanged(true)
                            }}
                            className="mx-2 rounded-lg capitalize" 
                        >
                            <option value="price_asc" key="price_asc">Price, lowest first</option>
                            <option value="price_desc" key="price_desc">Price, highest first</option>
                        </select>
                    </div>
                </div>
            </div>

            {loadingProducts && (
                <Spinner/>
            )}

            {!loadingProducts && (
                <div>
                    {products.length > 0 && (
                        <div className="category-grid">
                            {products.map(p =>
                                <ProductBox product={p} key={p._id} wished={wishedProducts.includes(p._id)} />
                            )}
                        </div>
                    )}
                    {products.length === 0 && (
                        <div>
                            Sorry, no Products found
                        </div>
                    )}
                </div>
            )}

        </Layout>
    )
}

export async function getServerSideProps (ctx) {
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    const category = await Category.findById(ctx.query.id)
    const subCategories = await Category.find({parent: category._id})
    const catIds = [category._id, ...subCategories.map (c => c._id)]
    const products = await Product.find({category: catIds})
    const wishedProducts = session?.user ?
        await WishedProduct.find({
            userEmail:session?.user.email,
            product: fetchedProductsId
      }) : []

    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            products: JSON.parse(JSON.stringify(products)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
            wishedProducts: wishedProducts.map(i => i.product.toString())
        }
    }
}