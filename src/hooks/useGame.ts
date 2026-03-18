import { useEffect, useReducer } from "react"
import type Card from "../game/Card"
import type { GameStatus } from "../game/GameManager"
import GameManager from "../game/GameManager"


type GameState = {
    status: GameStatus,
    room: Card[],
    hp: number,
    weapon: Card | null,
    lastDefeated: Card | null,
    deckCount: number
    fled: boolean
}
type GameAction = 
    | { type: "START_GAME" }
    | { type: "PLAY_CARD"; cardId: string; useWeapon: boolean}
    | { type: "FLEE" }

const game = new GameManager()

function getSnapshot() : GameState {
    return {
        status: game.getStatus(),
        room: game.getRoom(),
        hp: game.getPlayer().getHp(),
        weapon: game.getPlayer().getWeapon(),
        lastDefeated: game.getPlayer().getLastDefeated(),
        deckCount: game.getDeckCount(),
        fled: game.getFled()
    }
}

function reducer(_state: GameState, action: GameAction): GameState{
    switch (action.type){
        case "START_GAME":
            game.startGame()
            break
        case "PLAY_CARD":
            game.playCard(action.cardId)
            break
        case "FLEE":
            game.flee()
            break
    }
    return getSnapshot()
}
const initialState: GameState = {
    status: "idle",
    room: [],
    hp: 20,
    weapon: null,
    lastDefeated: null,
    deckCount: 44,
    fled: false
}

export function useGame() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({ type: "START_GAME"})
    }, [])

    const playCard = (cardId: string, useWeapon: boolean = true) => dispatch({ type: "PLAY_CARD", cardId, useWeapon})
    const flee = () => dispatch({ type: "FLEE"})

    return {state, playCard, flee}
}