import { useContext } from "react"
import { CartContext } from "@/components/CartContext"
import Header from "@/components/Header"

export default function CartPage () {
    const {cartProducts} = useContext(CartContext)

    return (
        <>
        <Header/>
        </>
    )
}