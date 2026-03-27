import type Card from "../../game/Card"
import CardComponent from "../CardComponent/CardComponent"
import styles from "./RoomCards.module.css"

type Props = {
    cards: Card[]
    canUseWeapon: (card: Card) => boolean
    onPlay: (cardId: string, useWeapon: boolean) => void
    useWeapon: boolean
    
}

/** 
 * Renders the 4 cards of the current room. 
 * 
 */
export default function RoomCards({ cards, canUseWeapon, onPlay, useWeapon }: Props) {
    return (
        <div className={styles.room}>
            {cards.map(card => (
                <CardComponent
                    key={card.id}
                    card={card}
                    canUseWeapon={card.getType() === "M" && canUseWeapon(card)}
                    onPlay={onPlay}
                    useWeapon={useWeapon}
                />
            ))}
        </div>
    )
}