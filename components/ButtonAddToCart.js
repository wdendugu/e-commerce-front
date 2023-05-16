import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"

export default function CartButton({ btnText, btnType }) {
    return (
        <button className={`btn ${btnType}`}><FontAwesomeIcon icon={faCartPlus}  />{ btnText }</button>
    )
}