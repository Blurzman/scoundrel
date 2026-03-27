import styles from "./BtnFlee.module.css"

type Props ={
    disabled: boolean
    onClick: () => void
}

/**
 * Flee Button
 * @param param0 
 */
export default function BtnFlee({ disabled, onClick}: Props) {
    return (
        <button
            className={`${styles.btn} ${disabled ? styles.disabled : ""}`}
            onClick={onClick}
            disabled={disabled}
        />
    )
}