import { createContext } from "react"
import { useState } from "react"

export const CartContext = createContext({})

export function CartContextProvider ({children}) {
    const [cartProducts,setCartProducts] = useState([])

    function addProduct(productId){
        setCartProducts(prev => [...prev, productId])
    }

    function removeProduct(productId){
        setCartProducts(prev => {
            const pos = prev.indexOf(productId)
            if (pos !== -1) {
                return prev.filter((value,index) => index !== pos)
            }
            return prev
        })
    }
    
    return (
        <CartContext.Provider 
            value={{
                cartProducts, 
                setCartProducts, 
                addProduct, 
                removeProduct
            }}
        >{children}
        </CartContext.Provider>
    )
}