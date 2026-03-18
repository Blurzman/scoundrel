import { useGame } from "../../hooks/useGame";
import { getRankLabel, getSuitSymbol } from "../../Utils/cardUtils";
import PlayerInfo from "../PlayerInfo/PlayerInfo";

export default function GameScreen(){
    const { state, playCard, flee} = useGame()

    if (state.status === "won"){
        return <div>You won!</div>
    }
    if (state.status === "lost"){
        return <div>You lost!</div>
    }

    return (
        <div>
            <PlayerInfo
                hp={state.hp}
                weapon={state.weapon}
                lastDefeated={state.lastDefeated}
            />

            <p>Remaining in deck {state.deckCount}</p>

            <div>
                {state.room.map(card => (
                    <button key={card.id} onClick={() => playCard(card.id)}>
                        {getSuitSymbol(card.getSuit())} {getRankLabel(card.getRank())}
                    </button>
                ))}
            </div>

            
            <button onClick={flee} disabled={state.fled}>
                flee
            </button>
        </div>
    )
}