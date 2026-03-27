import type Card from "./Card"

/**
 * Represents the player from the game
 */
export default class Player{
    private hp: number = 0
    private readonly maxHp: number = 20
    private weapon: Card | null = null
    private lastMonsterKilled: Card | null = null
    private potionUsedCurrentRoom: boolean = false
    private weaponKills: Card[]

    constructor(startHp: number = 20){
        this.hp = startHp
        this.weaponKills = []
    }

    /**
     * 
     * @returns Player's HP points
     */
    public getHp(): number {
        return this.hp
    }

    /**
     * 
     * @returns True if player's hp above 0
     */
    public isAlive(): boolean {
        return (this.hp > 0)
    }
    
    /**
     * 
     * @returns True if a potion has been used in the current room
     */
    public getPotionUsedCurrentRoom(): boolean {
        return (this.potionUsedCurrentRoom)
    }

    /**
     * Substracts the amount from the player's hp value
     * @param amount Damage taken by the player
     */
    public takeDamage(amount: number) {
        this.hp = Math.max(0,this.hp - amount)
    }

    /**
     * Heals the player if not already healed in the current room
     * @param amount How much the player should be healed
     * @returns True if the player was healed
     */
    public heal(amount: number): boolean{
        if (this.potionUsedCurrentRoom) return false
        this.hp = Math.min(this.maxHp, this.hp + amount)
        this.potionUsedCurrentRoom = true
        return true
    }

    /**
     * 
     * @returns The card that represents the weapon
     */
    public getWeapon(): Card | null { return this.weapon }
    
    /**
     * 
     * @param card The card that represents the weapon
     */
    public equipWeapon(card: Card) {
        this.weapon = card
        this.lastMonsterKilled = null
        this.weaponKills = []
    }

    /**
     * Checks if the targeted enemy's rank is below or equal to the last enemy killed
     * @param monster Enemy that is been targeted
     * @returns True if the player can use the weapon against the enemy
     */
    public canUseWeaponAgainst(monster: Card): boolean{
        if (!this.weapon) return false
        if (this.lastMonsterKilled === null) return true
        return this.lastMonsterKilled.getRank() > monster.getRank()
    }

    /**
     * Takes damage if the weapon's rank is smaller than the enemy you want to kill
     * Enemy's rank - Weapon's rank = damageTaken
     * 
     * @param monster Enemy thats attacks the player
     * @returns damage taken by the player
     */
    public fightWithWeapon(monster: Card): number | null{
        if (!this.canUseWeaponAgainst(monster)) {
            throw new Error("Can't use this weapong against that monster")
        }
        const damage = Math.max(0, monster.getRank() - this.weapon!.getRank())
        this.takeDamage(damage)
        this.lastMonsterKilled = monster
        this.weaponKills.push(monster)
        return damage
    }

    /**
     * Fights the enemy w/o weapon. Takes full damage equal to the enemy's rank
     * @param monster  Enemy that attacks the player
     * @returns damage taken by the player
     */
    public fightBarehanded(monster: Card): number {
        const damage = monster.getRank()
        this.takeDamage(damage)
        return damage
    }

    /**
     * Resets the potion usage state
     */
    public onRoomEnd(){
        this.potionUsedCurrentRoom = false
    }
    
    /**
     * @returns The last monster killed with a weapon or null
     */
    public getLastDefeated(): Card | null {
        return this.lastMonsterKilled
    }

    /**
     * 
     * @returns A copy of all monsters defeated with a weapon
     */
    public getWeaponKills(): Card[] {
        return [...this.weaponKills]
    }

    /**
     * Restores the player to a previous state. Used for undo
     * @param state The state to restore
     */
    public restoreState(state: {hp: number, weapon: Card | null, lastMonsterKilled: Card | null, potionUsedCurrentRoom: boolean, weaponKills: Card[]}) {
        this.hp = state.hp
        this.weapon = state.weapon
        this.lastMonsterKilled = state.lastMonsterKilled
        this.potionUsedCurrentRoom = state.potionUsedCurrentRoom
        this.weaponKills = state.weaponKills
    }


}