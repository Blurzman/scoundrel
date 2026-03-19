import type Card from "../../game/Card"
import CardComponent from "../CardComponent/CardComponent"

type Props = {
    cards: Card[],
    canUseWeapon: (card: Card) => boolean,
    onPlay: (cardId: string, useWeapon: boolean) => void
    useWeapon: boolean
}

export default function RoomCards({ cards, canUseWeapon, onPlay, useWeapon}: Props) {
    return (
        <div>
            {cards.map(card =>(
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