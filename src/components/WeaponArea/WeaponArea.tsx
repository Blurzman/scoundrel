import type Card from "../../game/Card"
import { getFrontStyle, getBackStyle } from "../../Utils/spriteUtils"
import styles from "./WeaponArea.module.css"

type Props = {
    weapon: Card | null
    weaponKills: Card[]
}

/** Displays the equipped weapon and the monsters defeated with it stacked below. */
export default function WeaponArea({ weapon, weaponKills }: Props) {
    if (!weapon) return <div className={styles.empty} />

    return (
    <div className={styles.area}>
        <div className={styles.stack}>
            <div
                className={styles.weapon}
                style={{
                    ...getFrontStyle(weapon),
                    top: `0px`,
                }}
            />
            {weaponKills.map((card, i) => (
                <div
                    key={card.id}
                    className={styles.kill}
                    style={{
                        ...getFrontStyle(card),
                        top: `${(i + 1) * 20}px`,
                    }}
                />
            ))}
        </div>
    </div>
)
}