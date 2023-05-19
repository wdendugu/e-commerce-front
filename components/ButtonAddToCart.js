import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"

export default function CartButton({ btnText, btnType, onClick }) {
    return (
        <button className={`btn ${btnType}`} onClick={onClick}><FontAwesomeIcon icon={faCartPlus}  />{ btnText }</button>
    )
}