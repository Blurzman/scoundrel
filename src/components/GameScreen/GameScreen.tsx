import { useState } from "react"
import { useGame } from "../../hooks/useGame"
import PlayerInfo from "../PlayerInfo/PlayerInfo"
import RoomCards from "../RoomCards/RoomCards"
import styles from "./GameScreen.module.css"
import DeckPile from "../DeckPile/DeckPile"
import BtnWeapon from "../BtnWeapon/BtnWeapon"
import BtnFlee from "../BtnFlee/BtnFlee"
import BtnUndo from "../BtnUndo/BtnUndo"
import HpDisplay from "../HpDisplay/HpDisplay"
import WeaponArea from "../WeaponArea/WeaponArea"


/**
 * Main game screen. Renders player info, room cards and action buttons.
 */
export default function GameScreen() {
    const { state, playCard, flee, undo } = useGame()
    /** Controls whether the weapon is used when playing a monster card. */
    const [useWeapon, setUseWeapon] = useState(true)

    if (state.status === "won") {
        return <div>You won!</div>
    }

    if (state.status === "lost") {
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
        <div className={styles.table}>

            <div className={styles.dungeon}>
                <DeckPile count={state.deckCount} />
            </div>

            <div className={styles.room}>
                <RoomCards
                    cards={state.room}
                    onPlay={playCard}
                    canUseWeapon={state.canUseWeapon}
                    useWeapon={useWeapon}
                />
            </div>

            <div className={styles.discard}>
                <DeckPile count={state.discardCount} />
            </div>

            <div className={styles.weapon}>
                <WeaponArea
                    weapon={state.weapon}
                    weaponKills={state.weaponKills}
                />
</div>

            <HpDisplay hp={state.hp} />

            <div className={styles.actions}>
                <BtnWeapon active={useWeapon} onClick={() => setUseWeapon(!useWeapon)} />
                <BtnFlee disabled={state.fled} onClick={flee} />
            </div>

            <div className={styles.undo}>
              <BtnUndo disabled={!state.canUndo} onClick={undo} />
            </div>

        </div>
    )
}