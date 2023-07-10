import StartFilledIcon from "@/icon/StarFilledIcon";
import StartOutlineIcon from "@/icon/StartOutlineIcon";
import { useState } from "react";

export default function StartsRating ({defaulthowMany=0,disabled,onChange=()=>{}}) {
    const [howMany, setHowMany] = useState(defaulthowMany)

    const stars = [1,2,3,4,5]

    function handleStarClick(n) {
        if (disabled) {
            return
        }
        setHowMany(n)
        onChange(n)
    }

    return (
        <div className="flex cursor-pointer gap-1">
            {stars.map(star => (
            <button onClick={()=>handleStarClick(star)} key={star}>
                {howMany >= star ? <StartFilledIcon className="w-6 h-6"/> : <StartOutlineIcon className="w-6 h-6"/>}
            </button>
            ))}
        </div>
    )
}