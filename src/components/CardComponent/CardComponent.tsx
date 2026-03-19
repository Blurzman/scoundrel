import type Card from "../../game/Card"
import { getRankLabel, getSuitSymbol } from "../../Utils/cardUtils"

type Props = {
    card: Card,
    canUseWeapon: boolean,
    onPlay: (cardId: string, useWeapon: boolean) => void
    useWeapon: boolean
}

export function formatCard(card: Card) {
    return (
        <>
            {getSuitSymbol(card.getSuit())} {getRankLabel(card.getRank())}
        </>
    )
}

export default function CardComponent({ card, canUseWeapon, onPlay, useWeapon}: Props) {
    const isMonster = card.getType() === "M"

    return (
        
            <button onClick={() => onPlay(card.id, isMonster ? useWeapon : false)}>
                {formatCard(card)}
            </button>
        
    )
}