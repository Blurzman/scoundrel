import styles from "./BtnWeapon.module.css"
import weaponOn from "../../assets/WeaponOn.png"
import weaponOff from "../../assets/WeaponOff.png"

type Props = {
    active: boolean
    onClick: () => void
}

/**
 * Toggles weapon usage
 * @param param0 
 */
export default function BtnWeapon({active, onClick}: Props){
    return(
        <button
            className={`${styles.btn} ${active ? styles.active : styles.inactive}`}
            onClick={onClick}
        />
    )
}