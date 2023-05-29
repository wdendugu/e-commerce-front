import { useState } from "react"


export default function ImageBar({images}) {
    const [activeImage, setActiveImage]=useState(images?.[0])

    return (
        <div>
            <div className="w-[400px] h-[400px] flex content-center justify-center p-2">
                <img className="object-contain p-2" src={activeImage} alt="product image" />
            </div>
            <div className="flex gap-2 flex-grow-0 p-4">
                {images.map(image => (
                    <div
                        className={`h-[60px] w-[60px] p-1 cursor-pointer rounded-md flex content-center justify-center ${
                        image === activeImage ? "border border-gray-300 opacity-100" : "opacity-80"
                    }`}
                    onClick={() => setActiveImage(image)}
                    key={image}
                    >
                        <img className="object-contain" src={image} alt=""/>
                    </div>
                ))}
            </div>
        </div>
    )
}