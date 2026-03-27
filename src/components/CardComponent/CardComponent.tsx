import type Card from "../../game/Card"
import { getRankLabel, getSuitSymbol } from "../../Utils/cardUtils"
import { getFrontStyle, getBackStyle } from "../../Utils/spriteUtils"
import styles from './CardComponent.module.css'

type Props = {
    card: Card,
    canUseWeapon: boolean,
    onPlay: (cardId: string, useWeapon: boolean) => void
    useWeapon: boolean
}
/** 
 * Formats a card as a suit symbol + rank label. 
 * 
 */
export function formatCard(card: Card) {
    return (
        <>
            {getSuitSymbol(card.getSuit())} {getRankLabel(card.getRank())}
        </>
    )
}
/** 
 * Renders a single card as a clickable button using the spritesheet. 
 * 
 */
export default function CardComponent({ card, canUseWeapon, onPlay, useWeapon}: Props) {
    const isMonster = card.getType() === "M"

    return (
        
            <button className={styles.card} 
                style={getFrontStyle(card)}
                onClick={() => onPlay(card.id, isMonster && canUseWeapon ? useWeapon : false) }> 
            </button>
        
    )
}