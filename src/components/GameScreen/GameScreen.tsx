import { useState } from "react";
import { useGame } from "../../hooks/useGame";  
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import RoomCards from "../RoomCards/RoomCards";

export default function GameScreen(){
    const { state, playCard, flee, undo} = useGame()
    const [useWeapon, setUseWeapon] = useState(true)

    if (state.status === "won"){
        return <div>You won!</div>
    }
    if (state.status === "lost"){
        return (
            <div>
                <p>You lost!</p>
                <button onClick={undo} disabled={!state.canUndo}>
                  Deshacer
                </button>
            </div>
        )
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
                <RoomCards
                    cards={state.room}
                    onPlay={playCard}
                    canUseWeapon={state.canUseWeapon}
                    useWeapon={useWeapon}
                />
            </div>

            <button onClick={() => setUseWeapon(!useWeapon)}>
                Arma: {useWeapon ? "activada" : "desactivada"}
            </button>
            
            <button onClick={flee} disabled={state.fled}>
                flee
            </button>

            <button onClick={undo} disabled={!state.canUndo}>
                  Deshacer
            </button>
        </div>
    )
}