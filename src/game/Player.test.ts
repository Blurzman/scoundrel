import { describe, it, expect } from "vitest"
import Player from "./Player"
import Card, { SUITS } from "./Card"

describe("Player", () => {

    // --- HP ---
    describe("hp", () => {
        it("el jugador empieza con 20 HP", () => {
            const player = new Player()
            expect(player.getHp()).toBe(20)
        })
        it("el jugador está vivo al inicio", () => {
            const player = new Player()
            expect(player.isAlive()).toBe(true)
        })
        it("takeDamage reduce el HP", () => {
            const player = new Player()
            player.takeDamage(5)
            expect(player.getHp()).toBe(15)
        })
        it("takeDamage no baja de 0", () => {
            const player = new Player()
            player.takeDamage(999)
            expect(player.getHp()).toBe(0)
        })
        it("el jugador muere si llega a 0 HP", () => {
            const player = new Player()
            player.takeDamage(20)
            expect(player.isAlive()).toBe(false)
        })
    })

    // --- Heal ---
    describe("heal()", () => {
        it("cura al jugador", () => {
            const player = new Player()
            player.takeDamage(10)
            player.heal(5)
            expect(player.getHp()).toBe(15)
        })
        it("no cura por encima del máximo", () => {
            const player = new Player()
            player.takeDamage(2)
            player.heal(10)
            expect(player.getHp()).toBe(20)
        })
        it("solo puede curarse una vez por room", () => {
            const player = new Player()
            player.takeDamage(10)
            player.heal(3)
            const result = player.heal(3)
            expect(result).toBe(false)
            expect(player.getHp()).toBe(13)
        })
        it("puede curarse de nuevo en el siguiente room", () => {
            const player = new Player()
            player.takeDamage(10)
            player.heal(3)
            player.onRoomEnd()
            const result = player.heal(3)
            expect(result).toBe(true)
            expect(player.getHp()).toBe(16)
        })
    })

    // --- Arma ---
    describe("weapon", () => {
        it("empieza sin arma", () => {
            const player = new Player()
            expect(player.getWeapon()).toBeNull()
        })
        it("equipar arma la asigna correctamente", () => {
            const player = new Player()
            const weapon = new Card(SUITS.Diamonds, 5)
            player.equipWeapon(weapon)
            expect(player.getWeapon()?.id).toBe(weapon.id)
        })
        it("puede usar el arma contra el primer monstruo", () => {
            const player = new Player()
            const weapon = new Card(SUITS.Diamonds, 5)
            player.equipWeapon(weapon)
            const monster = new Card(SUITS.Spades, 3)
            expect(player.canUseWeaponAgainst(monster)).toBe(true)
        })
        it("no puede usar el arma contra un monstruo de rank mayor o igual al anterior", () => {
            const player = new Player()
            const weapon = new Card(SUITS.Diamonds, 5)
            player.equipWeapon(weapon)
            const monster1 = new Card(SUITS.Spades, 4)
            player.fightWithWeapon(monster1)
            const monster2 = new Card(SUITS.Spades, 6)
            expect(player.canUseWeaponAgainst(monster2)).toBe(false)
        })
        it("puede usar el arma contra un monstruo de rank menor al anterior", () => {
            const player = new Player()
            const weapon = new Card(SUITS.Diamonds, 8)
            player.equipWeapon(weapon)
            const monster1 = new Card(SUITS.Spades, 6)
            player.fightWithWeapon(monster1)
            const monster2 = new Card(SUITS.Spades, 3)
            expect(player.canUseWeaponAgainst(monster2)).toBe(true)
        })
        it("equipar nueva arma resetea el último monstruo derrotado", () => {
            const player = new Player()
            const weapon1 = new Card(SUITS.Diamonds, 5)
            player.equipWeapon(weapon1)
            const monster = new Card(SUITS.Spades, 3)
            player.fightWithWeapon(monster)
            const weapon2 = new Card(SUITS.Diamonds, 7)
            player.equipWeapon(weapon2)
            const strongMonster = new Card(SUITS.Spades, 10)
            expect(player.canUseWeaponAgainst(strongMonster)).toBe(true)
        })
    })

    // --- Combate ---
    describe("combat", () => {
        it("fightBarehanded hace daño igual al rank del monstruo", () => {
            const player = new Player()
            const monster = new Card(SUITS.Spades, 7)
            player.fightBarehanded(monster)
            expect(player.getHp()).toBe(13)
        })
        it("fightWithWeapon hace daño = rank monstruo - rank arma", () => {
            const player = new Player()
            const weapon = new Card(SUITS.Diamonds, 5)
            player.equipWeapon(weapon)
            const monster = new Card(SUITS.Spades, 8)
            player.fightWithWeapon(monster)
            expect(player.getHp()).toBe(17) // 20 - (8-5)
        })
        it("fightWithWeapon no hace daño si el arma es mayor al monstruo", () => {
            const player = new Player()
            const weapon = new Card(SUITS.Diamonds, 10)
            player.equipWeapon(weapon)
            const monster = new Card(SUITS.Spades, 3)
            player.fightWithWeapon(monster)
            expect(player.getHp()).toBe(20)
        })
        it("fightWithWeapon lanza error si no puede usarse", () => {
            const player = new Player()
            const weapon = new Card(SUITS.Diamonds, 5)
            player.equipWeapon(weapon)
            const monster1 = new Card(SUITS.Spades, 4)
            player.fightWithWeapon(monster1)
            const monster2 = new Card(SUITS.Spades, 6)
            expect(() => player.fightWithWeapon(monster2)).toThrow()
        })
    })
})