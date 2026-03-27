import styles from "./DeckPile.module.css"
import { getBackStyle } from "../../Utils/spriteUtils"

type Props = {
    count: number
}

export default function DeckPile({count}: Props){
    if (count === 0) return <div className={styles.empty} />
    
    const layers = Math.min(count,5)

    return(
        <div className={styles.pile}>
            {Array.from({ length: layers }).map((_, i) => (
                <div
                key={i}
                className={styles.card}
                style={{
                    ...getBackStyle(),
                    top: `${-i * 2}px`,
                    left: `${-i * 2}px`,
                    }}
                />  
            ))}
        </div>
    )
}