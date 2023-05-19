import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";


export default function Header () {
    const {cartProducts} = useContext(CartContext)
    return (
        <header className="bg-[#222]">
            <div className="max-w-[800px] mx-auto px-5 py-7 flex justify-between" >
                <Link href={'/'} className="text-white no-underline">Ecommerce</Link>
                <nav className="space-x-2">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/products'}>Products</Link>
                    <Link href={'/categories'}>Categories</Link>
                    <Link href={'/account'}>Account</Link>
                    <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
                </nav>
            </div>
        </header>
    )
}