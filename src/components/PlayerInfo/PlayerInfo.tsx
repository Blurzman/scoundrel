import type Card from "../../game/Card"
import { getRankLabel, getSuitSymbol } from "../../Utils/cardUtils"

type Props = {
    weapon: Card | null
    lastDefeated: Card | null
}

/** 
 * Formats a card as a suit symbol + rank label. 
 * Not used currently.
 *
 */
function formatCard(card: Card) {
    return (
        <span>
            {getSuitSymbol(card.getSuit())} {getRankLabel(card.getRank())}
        </span>)
}

/** 
 * Displays the player's current HP, equipped weapon and last defeated monster. 
 * 
 */
export default function PlayerInfo({weapon, lastDefeated}: Props){
    return (
        <div>
            <p>Weapon: {weapon ? formatCard(weapon) : "none"}</p>
            <p>Last Defeated: {lastDefeated ? formatCard(lastDefeated) : "none"}</p>
        </div>
    )        
}