import Deck from "./Deck";
import Player from "./Player";
import Room from "./Room";

export type GameStatus = "idle" | "playing" | "won" | "lost"

export default class GameManager {
    private deck: Deck
    private room: Room
    private player: Player
    private status: GameStatus = "idle"
    private fled: boolean = false

    constructor() {
        this.deck = new Deck()
        this.room = new Room()
        this.player = new Player()
    }

    public startGame(){
        this.deck.shuffle()
        this.room.fill(this.deck)
        this.status = "playing"
        this.fled = false
    }

    public getStatus(): GameStatus { return this.status }
    public getRoom() { return this.room.getCards() }
    public getPlayer() { return this.player }

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
                }
                break

            case "W":
                this.player.equipWeapon(card)
                break
            case "P":
                this.player.heal(card.getRank())
                break
        }
        this.room.removeCard(cardId)
        this.checkDeath()
        this.checkRoomClear()

    }
    public flee() {
        if (this.status !== "playing") return
        if (this.fled) return

        this.fled = true

        const remaining = this.room.getCards()
        this.room.clear()
        remaining.forEach(c => this.deck.putBack(c))
        this.nextRoom(true)
    }

    public getDeckCount(): number {
        return this.deck.count()
    }

    public getFled(): boolean {
        return this.fled
    }

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
            weaponKills: this.player.getWeaponKills()
        }
    }
    
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
        
    }

    private checkRoomClear(){
        if (this.room.getCards().length === 1) {
            this.nextRoom()
        }
    }

    private nextRoom(fromFlee: boolean = false){
        this.player.onRoomEnd()
        if (this.deck.count() < 4) {
            this.status = "won"
            return
        }
        this.room.fill(this.deck)
        if (!fromFlee) this.fled = false 
    }

    private checkDeath(): void {
        if (!this.player.isAlive()) {
            this.status = "lost"
        }
    }
}