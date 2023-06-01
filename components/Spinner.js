import { BounceLoader } from "react-spinners";

export default function Spinner () {
    return (
        <div className="flex justify-center mt-[50px]">
            <BounceLoader speedMultiplier={2} color={"#555"}/>
        </div>
    )

}