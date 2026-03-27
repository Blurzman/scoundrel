import { useEffect, useReducer, useRef } from "react"
import type Card from "../game/Card"
import type { GameStatus } from "../game/GameManager"
import GameManager from "../game/GameManager"

/** Snapshot of the game state exposed to React components. */
type GameState = {
    status: GameStatus
    room: Card[]
    hp: number
    weapon: Card | null
    lastDefeated: Card | null
    deckCount: number
    fled: boolean
    /** Checks if the equipped weapon can be used against a given monster. */
    canUseWeapon: (card: Card) => boolean
    canUndo: boolean
    weaponKills: Card[]
    discardCount: number
}

/** Actions that can be dispatched to update the game state. */
type GameAction =
    | { type: "START_GAME" }
    | { type: "PLAY_CARD"; cardId: string; useWeapon: boolean }
    | { type: "FLEE" }
    | { type: "UNDO" }

// Single GameManager instance shared across the hook's lifetime.
const game = new GameManager()

const initialState: GameState = {
    status: "idle",
    room: [],
    hp: 20,
    weapon: null,
    lastDefeated: null,
    deckCount: 44,
    fled: false,
    canUseWeapon: () => false,
    canUndo: false,
    weaponKills: [],
    discardCount: 0
}

/**
 * Custom hook that connects the GameManager logic to React.
 * Exposes the game state and actions to components.
 */
export function useGame() {
    // Stores full game snapshots for undo functionality.
    const history = useRef<ReturnType<typeof game.getFullState>[]>([])

    /** Reads the current GameManager state and returns it as a GameState object. */
    function getSnapshot(): GameState {
        return {
            status: game.getStatus(),
            room: game.getRoom(),
            hp: game.getPlayer().getHp(),
            weapon: game.getPlayer().getWeapon(),
            lastDefeated: game.getPlayer().getLastDefeated(),
            deckCount: game.getDeckCount(),
            fled: game.getFled(),
            canUseWeapon: (card: Card) => game.getPlayer().canUseWeaponAgainst(card),
            canUndo: history.current.length > 0,
            weaponKills: game.getPlayer().getWeaponKills(),
            discardCount: game.getDiscardCount()
        }
    }

    /**
     * Handles all game actions, updates the GameManager and returns a new snapshot.
     * Saves state to history before destructive actions to support undo.
     */
    function reducer(_state: GameState, action: GameAction): GameState {
        switch (action.type) {
            case "START_GAME":
                history.current = []
                game.startGame()
                break
            case "PLAY_CARD":
                history.current.push(game.getFullState())
                game.playCard(action.cardId, action.useWeapon)
                break
            case "FLEE":
                history.current.push(game.getFullState())
                game.flee()
                break
            case "UNDO":
                if (history.current.length === 0) return _state
                const previous = history.current.pop()!
                game.restoreFullState(previous)
                break
        }
        return getSnapshot()
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    // Starts the game automatically when the component mounts.
    useEffect(() => {
        dispatch({ type: "START_GAME" })
    }, [])

    const playCard = (cardId: string, useWeapon: boolean = true) =>
        dispatch({ type: "PLAY_CARD", cardId, useWeapon })
    const flee = () => dispatch({ type: "FLEE" })
    const undo = () => dispatch({ type: "UNDO" })

    return { state, playCard, flee, undo }
}