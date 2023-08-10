import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuIcon } from "@/icon/MenuIcon";
import { useState } from "react";

export default function Header ({show}) {
    const {cartProducts} = useContext(CartContext)
    const [showNav, setShowNav] = useState(false)


    return (
        <header className="bg-[#222]">
            <div className="centered-box py-7 flex justify-between" >
                <Link href={'/'} className="text-white no-underline">Ecommerce</Link>
                <nav className={(showNav ? "flex flex-col h-full w-full z-[10]  " : "hidden sm:block ")+"nav-bar"}>
                    <button onClick={() => setShowNav(prev => !prev)} className=" text-white sm:hidden block">X</button>
                    <Link href={'/products'}>Products</Link>
                    <Link href={'/categories'}>Categories</Link>
                    <Link href={'/account'}>Account</Link>
                    <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
                    <Link href={'/search'}><FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400"/></Link>
                </nav>
                <button 
                    className=" text-white sm:hidden block"
                    onClick={() => setShowNav(prev => !prev)}
                >
                    <MenuIcon />
                </button>
            </div>
        </header>
    )
}