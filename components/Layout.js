import Header from "./Header"


export default function Layout ({children,addclass}) {

    return (
        <>
        <Header />
        <div className={`centered-box mb-6 ${addclass}`}>
            {children}
        </div>
        </>
    )
}