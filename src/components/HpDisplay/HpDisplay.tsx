import styles from "./HpDisplay.module.css"

type Props = {
    hp: number
}

/** 
 * Displays the player's HP  
 * 
*/
export default function HpDisplay({ hp }: Props) {
    const frame = hp - 1
    const isCritical = hp <= 5

    return (
        <div
            className={`${styles.display} ${isCritical ? styles.critical : ""}`}
            style={{
                backgroundPosition: `${-frame * 65}px 0px`
            }}
        />
    )
}