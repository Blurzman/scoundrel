import type Card from "../../game/Card"
import { getRankLabel, getSuitSymbol } from "../../Utils/cardUtils"

type Props = {
    hp: number,
    weapon: Card | null
    lastDefeated: Card | null
}
function formatCard(card: Card) {
    return (
        <span>
            {getSuitSymbol(card.getSuit())} {getRankLabel(card.getRank())}
        </span>)
}
export default function PlayerInfo({hp, weapon, lastDefeated}: Props){
    return (
        <div>
            <p>HP: {hp}</p>
            <p>Weapon: {weapon ? formatCard(weapon) : "none"}</p>
            <p>Last Defeated: {lastDefeated ? formatCard(lastDefeated) : "none"}</p>
        </div>
    )        
}