import Deck from "./Deck";
import Player from "./Player";
import Room from "./Room";

/** Possible states of the game. */
export type GameStatus = "idle" | "playing" | "won" | "lost"

/** 
 * Controller class of the game.
 * Orchestrates the game logic, connecting the Deck, Room, and Player. 
 * 
 */
export default class GameManager {
    private deck: Deck
    private room: Room
    private player: Player
    private status: GameStatus = "idle"
    private fled: boolean = false
    private discardCount: number = 0

    constructor() {
        this.deck = new Deck()
        this.room = new Room()
        this.player = new Player()
    }

    /**
     * Just starts the game.
     * Shuffles -> fills -> set status to playing.
     */
    public startGame(){
        this.deck.shuffle()
        this.room.fill(this.deck)
        this.status = "playing"
        this.fled = false
        this.discardCount = 0
    }

    /**
     * 
     * @returns Current game status.
     */
    public getStatus(): GameStatus { return this.status }

    /**
     * 
     * @returns Current cards in the room.
     */
    public getRoom() { return this.room.getCards() }

    /**
     * 
     * @returns Player instance.
     */
    public getPlayer() { return this.player }
    
    /**
     * 
     * @returns Number of cards remaining in the deck.
     */
    public getDeckCount(): number {
        return this.deck.count()
    }

    /**
     * 
     * @returns True if the player fled the previous room.
     */
    public getFled(): boolean {
        return this.fled
    }
    /**
     * 
     * @returns The discard Count
     */
    public getDiscardCount(): number { return this.discardCount }

    /**
     * 
     * @returns A snapshot of the full game state. Used for undo.
     */
    public getFullState() {
        return {
            deck: this.deck.getCards(),
            room: this.room.getCards(),
            hp: this.player.getHp(),
            weapon: this.player.getWeapon(),
            lastMonsterKilled: this.player.getLastDefeated(),
            potionUsedThisRoom: this.player.getPotionUsedCurrentRoom(),
            fled: this.fled,
            status: this.status,
            weaponKills: this.player.getWeaponKills(),
            discardCount: this.discardCount
        }
    }

    /**
     * Plays a card from the room.
     * Monsters are fought with weapon or barehanded, weapons are equipped, potions heal.
     * @param cardId The id of the card to play
     * @param useWeapon Whether to use the weapon or not. Default true
     * @returns 
     */
    public playCard(cardId: string, useWeapon: boolean = true){
        if (this.status !== "playing") return
        
        const cards = this.room.getCards()
        const card = cards.find(c => c.id === cardId)

        if (!card) return

        switch (card.getType()) {
            case "M":
                if (useWeapon && this.player.getWeapon() && this.player.canUseWeaponAgainst(card)) {
                    this.player.fightWithWeapon(card)
                } else {
                    this.player.fightBarehanded(card)
                    this.discardCount++
                }
                break

            case "W":
                if (this.player.getWeapon()) {
                    this.discardCount += 1 + this.player.getWeaponKills().length
                }
                this.player.equipWeapon(card)
                break
            case "P":
                this.player.heal(card.getRank())
                this.discardCount++
                break
        }
        this.room.removeCard(cardId)
        this.checkDeath()
        this.checkRoomClear()

    }

    /**
     * The player flees the current room, returning remaining cards to the bottom of the deck.
     * The player cannot flee two rooms in a row.
     */
    public flee() {
        if (this.status !== "playing") return
        if (this.fled) return

        this.fled = true

        const remaining = this.room.getCards()
        this.room.clear()
        remaining.forEach(c => this.deck.putBack(c))
        this.nextRoom(true)
    }

    /**
     * Restores the game to a previous state. Used for undo.
     * @param state - The state to restore, obtained from getFullState().
     */
    public restoreFullState(state: ReturnType<GameManager["getFullState"]>){
        this.deck.restoreCards(state.deck)
        this.room.restoreCards(state.room)
        this.player.restoreState({
            hp: state.hp,
            weapon: state.weapon,
            lastMonsterKilled: state.lastMonsterKilled,
            potionUsedCurrentRoom: state.potionUsedThisRoom,
            weaponKills: state.weaponKills
        })
        this.fled = state.fled
        this.status = state.status
        this.discardCount = state.discardCount
        
    }
    /** 
     * Checks if the room has 1 card left and advances to the next room if so. 
     * 
     */
    private checkRoomClear(){
        if (this.room.getCards().length === 1) {
            this.nextRoom()
        }
    }

    /** 
     * Advances to the next room, or ends the game if fewer than 4 cards remain.
     * 
     */
    private nextRoom(fromFlee: boolean = false){
        this.player.onRoomEnd()
        if (this.deck.count() < 4) {
            this.status = "won"
            return
        }
        this.room.fill(this.deck)
        if (!fromFlee) this.fled = false 
    }

    /** 
     * Sets the game status to lost if the player is dead. 
     * 
     */
    private checkDeath(): void {
        if (!this.player.isAlive()) {
            this.status = "lost"
        }
    }
}