import Layout from "@/components/Layout";
import axios from "axios";
import { useRef, useEffect, useState, useCallback} from "react";
import ProductBox from "@/components/ProductBox";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";

export default function SearchPage () {
    const [phrase, setPhrase] = useState("")
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const debouncedSearch = useCallback(debounce(searchProducts,500),[])
    const inputRef = useRef()

    useEffect(() => {
        if (phrase.length > 0) {
            setIsLoading(true)
            debouncedSearch(phrase)
        } else {
            setProducts([])
        }
    }, [phrase])
    
    function searchProducts (phrase) {
            axios.get("/api/products?phrase="+ encodeURIComponent(phrase))
            .then(res => {
                setProducts(res.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [])
    
    return (
        <Layout>
            <input 
                ref={inputRef}
                onChange={ev => setPhrase(ev.target.value)}
                placeholder="Search for products..." 
                className="input-order my-8 text-xl sticky top-[50px]">
            </input>
            {!isLoading && phrase !== "" && products?.length === 0 && (
                <h2>No products found for the search "{phrase}"</h2>
            )}
            {isLoading && (
                <Spinner/>
            )}
            <div className="product-grid">
                {!isLoading && products?.length > 0 && products.map(product => (
                    <ProductBox product={product} key={product._id}/>
                ))}
            </div>
        </Layout>
    )
}