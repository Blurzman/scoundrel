import styles from "./BtnUndo.module.css"

type Props = {
    disabled: boolean
    onClick: () => void
}

/**
 * Undo Button 
 * @param param0 
 */
export default function BtnUndo({disabled, onClick}: Props){
    return (
        <button
            className={`${styles.btn} ${disabled ? styles.disabled : ""}`}
            onClick={onClick}
            disabled={disabled}
        />
    )
}