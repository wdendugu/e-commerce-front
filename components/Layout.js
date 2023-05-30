import Header from "./Header"


export default function Layout ({children,addclass}) {
    console.log(addclass)
    return (
        <>
        <Header />
        <div className={`centered-box ${addclass}`}>
            {children}
        </div>
        </>
    )
}