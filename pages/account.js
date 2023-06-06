import Layout from "@/components/Layout";
import { useSession, signOut, signIn  } from "next-auth/react";
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket,faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function AccountPage () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [streetAdress, setStreetAdress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")
    const [loaded, setLoaded] = useState(false)
    
    const {data:session} = useSession()
    const router = useRouter()
    async function logout() {
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL
        })
        
    }
    async function login() {
        await signIn('google',{
            callbackUrl: process.env.NEXT_PUBLIC_URL
        })
        
    }
    
    function saveAddress(){
        const data = {name,email,city,streetAdress,postalCode,country}
        axios.put("/api/address", data)
    }
    useEffect(()=>{
            axios.get("/api/address").then(response => {
                setName(response.data.name)
                setEmail(response.data.email)
                setStreetAdress(response.data.streetAdress)
                setCity(response.data.city)
                setPostalCode(response.data.postalCode)
                setCountry(response.data.country)
                setLoaded(true)
            })
},[])
    return (
        <Layout>
            <div className="grid-12-8 gap-10 my-8">

                <RevealWrapper delay={0}>
                    <div className="bg-white rounded-xl p-7">
                        <h2 className="font-bold">Wishlist</h2>
                    </div>
                </RevealWrapper>

                {!loaded && (
                    <Spinner/>
                )}

                {loaded && (
                    <RevealWrapper delay={100}>
                        <div className="bg-white rounded-xl p-7">
                            <h2 className="font-bold">Account Details</h2>
                            <input 
                                type="text"
                                placeholder="Name"
                                className="input-order"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                name="name"
                            ></input>
                            <input 
                                type="text" 
                                placeholder="Email" 
                                className="input-order" 
                                value={email} 
                                onChange={(ev) => setEmail(ev.target.value)}
                                name="email"
                            ></input>
                            <input 
                                type="text"
                                placeholder="Street Address" 
                                className="input-order" 
                                value={streetAdress} 
                                onChange={(ev) => setStreetAdress(ev.target.value)}
                                name="streetAdress"
                            ></input>
                            <div className="grid-12-8 gap-2">
                                <input 
                                    type="text" 
                                    placeholder="City" 
                                    className="input-order" 
                                    value={city} 
                                    onChange={(ev) => setCity(ev.target.value)}
                                    name="city"
                                ></input>
                                <input 
                                    type="text" 
                                    placeholder="Postal Code" 
                                    className="input-order" 
                                    value={postalCode} 
                                    onChange={(ev) => setPostalCode(ev.target.value)}
                                    name="postalCode"
                                ></input>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Country" 
                                className="input-order" 
                                value={country} 
                                onChange={(ev) => setCountry(ev.target.value)}
                                name="country"
                            ></input>
                            <button onClick={saveAddress} className="btn-payment">
                                Save
                            </button>
                        </div>
                    </RevealWrapper>
                )}

            </div> 
            {session && (
                <button 
                        className="btn-payment"
                        onClick={() => logout()}
                    >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        Logout
                </button>
            )}
            {!session && (
                <button 
                        className="btn-payment"
                        onClick={() => login()}
                    >
                        <FontAwesomeIcon icon={faRightToBracket} />
                        Login
                </button>
            )}
        </Layout>
    )
}