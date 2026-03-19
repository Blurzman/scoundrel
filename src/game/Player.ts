import type Card from "./Card"

export default class Player{
    private hp: number = 0
    private readonly maxHp: number = 20
    private weapon: Card | null = null
    private lastMonsterKilled: Card | null = null
    private potionUsedCurrentRoom: boolean = false

    constructor(startHp: number = 20){
        this.hp = startHp
    }

    public getHp(): number {
        return this.hp
    }
    public isAlive(): boolean {
        return (this.hp > 0)
    }

    public takeDamage(amount: number) {
        this.hp = Math.max(0,this.hp - amount)
    }

    public heal(amount: number): boolean{
        if (this.potionUsedCurrentRoom) return false
        this.hp = Math.min(this.maxHp, this.hp + amount)
        this.potionUsedCurrentRoom = true
        return true
    }

    public getWeapon(): Card | null { return this.weapon }

    public equipWeapon(card: Card) {
        this.weapon = card
        this.lastMonsterKilled = null
    }

    public canUseWeaponAgainst(monster: Card): boolean{
        if (!this.weapon) return false
        if (this.lastMonsterKilled === null) return true
        return this.lastMonsterKilled.getRank() > monster.getRank()
    }

    public fightWithWeapon(monster: Card): number | null{
        if (!this.canUseWeaponAgainst(monster)) {
            throw new Error("Can't use this weapong against that monster")
        }
        const damage = Math.max(0, monster.getRank() - this.weapon!.getRank())
        this.takeDamage(damage)
        this.lastMonsterKilled = monster
        return damage
    }

    public fightBarehanded(monster: Card): number {
        const damage = monster.getRank()
        this.takeDamage(damage)
        return damage
    }

    public onRoomEnd(){
        this.potionUsedCurrentRoom = false
    }
    
    public getLastDefeated(): Card | null {
        return this.lastMonsterKilled
    }


}