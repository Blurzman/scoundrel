import { describe, it, expect, beforeEach } from "vitest"
import GameManager from "./GameManager"

describe("GameManager - Integration", () => {
    let game: GameManager

    beforeEach(() => {
        game = new GameManager()
        game.startGame()
    })

    it("una partida completa sin morir", () => {
        while (game.getStatus() === "playing") {
            const cards = game.getRoom()
            if (cards.length === 0) break
            game.playCard(cards[0].id, false)  // siempre a mano desnuda
        }
        expect(["won", "lost"]).toContain(game.getStatus())
    })

    it("equipar arma reduce daño contra monstruos", () => {
        game = new GameManager()
        game.startGame()

        // buscar una arma y un monstruo en el mismo cuarto
        let weaponCard = game.getRoom().find(c => c.getType() === "W")
        let monsterCard = game.getRoom().find(c => c.getType() === "M")

        if (weaponCard && monsterCard) {
            const hpBefore = game.getPlayer().getHp()
            game.playCard(weaponCard.id, false)
            game.playCard(monsterCard.id, true)
            const damage = hpBefore - game.getPlayer().getHp()
            const expectedDamage = Math.max(0, monsterCard.getRank() - weaponCard.getRank())
            expect(damage).toBe(expectedDamage)
        }
    })

    it("undo restaura el estado anterior", () => {
        const hpBefore = game.getPlayer().getHp()
        const roomBefore = game.getRoom().map(c => c.id)
        const fullState = game.getFullState()

        const monster = game.getRoom().find(c => c.getType() === "M")
        if (monster) {
            game.playCard(monster.id, false)
            game.restoreFullState(fullState)
            expect(game.getPlayer().getHp()).toBe(hpBefore)
            expect(game.getRoom().map(c => c.id)).toEqual(roomBefore)
        }
    })

    it("no puede huir dos veces seguidas", () => {
        const roomAntes = game.getRoom().map(c => c.id)
        game.flee()
        game.flee()  // no debería hacer nada
        expect(game.getRoom().map(c => c.id)).not.toEqual(roomAntes)
        // pero la segunda no cambió nada
        const roomDespuesDeFlee = game.getRoom().map(c => c.id)
        game.flee()
        expect(game.getRoom().map(c => c.id)).toEqual(roomDespuesDeFlee)
    })

    it("pocion cura al jugador pero no mas del maximo", () => {
        game.getPlayer().takeDamage(5)
        const potion = game.getRoom().find(c => c.getType() === "P")
        if (potion) {
            const hpBefore = game.getPlayer().getHp()
            game.playCard(potion.id, false)
            expect(game.getPlayer().getHp()).toBe(Math.min(20, hpBefore + potion.getRank()))
        }
    })

    it("solo puede usar una pocion por cuarto", () => {
        game.getPlayer().takeDamage(15)
        const potions = game.getRoom().filter(c => c.getType() === "P")
        if (potions.length >= 2) {
            game.playCard(potions[0].id, false)
            const hpAfterFirst = game.getPlayer().getHp()
            game.playCard(potions[1].id, false)
            expect(game.getPlayer().getHp()).toBe(hpAfterFirst)  // no curó
        }
    })

    it("el arma solo puede usarse contra monstruos de menor rank que el ultimo derrotado", () => {
        const weapon = game.getRoom().find(c => c.getType() === "W")
        if (weapon) {
            game.playCard(weapon.id, false)
            const monsters = game.getRoom().filter(c => c.getType() === "M")
            const weakMonster = monsters.find(c => c.getRank() < weapon.getRank())

            if (weakMonster) {
                // matar el monstruo débil con el arma
                game.playCard(weakMonster.id, true)
                
                // ahora buscar otro monstruo de rank mayor o igual al débil
                const blockedMonster = game.getRoom().find(
                    c => c.getType() === "M" && c.getRank() >= weakMonster.getRank()
                )
                if (blockedMonster) {
                    expect(game.getPlayer().canUseWeaponAgainst(blockedMonster)).toBe(false)
                }
            }
        }
    })

    it("el discard aumenta correctamente", () => {
        const discardBefore = game.getDiscardCount()
        const monster = game.getRoom().find(c => c.getType() === "M")
        if (monster) {
            game.playCard(monster.id, false)  // mano desnuda → discard
            expect(game.getDiscardCount()).toBe(discardBefore + 1)
        }
    })
    
    it("undo después de flee restaura el cuarto anterior", () => {
        const roomAntes = game.getRoom().map(c => c.id)
        const fullState = game.getFullState()
        game.flee()
        game.restoreFullState(fullState)
        expect(game.getRoom().map(c => c.id)).toEqual(roomAntes)
    })

    it("undo después de equipar arma restaura el arma anterior", () => {
        const weapon = game.getRoom().find(c => c.getType() === "W")
        if (weapon) {
            const fullState = game.getFullState()
            game.playCard(weapon.id, false)
            expect(game.getPlayer().getWeapon()?.id).toBe(weapon.id)
            game.restoreFullState(fullState)
            expect(game.getPlayer().getWeapon()).toBeNull()
        }
    })

    it("undo después de curar restaura el hp anterior", () => {
        game.getPlayer().takeDamage(5)
        const potion = game.getRoom().find(c => c.getType() === "P")
        if (potion) {
            const hpBefore = game.getPlayer().getHp()
            const fullState = game.getFullState()
            game.playCard(potion.id, false)
            game.restoreFullState(fullState)
            expect(game.getPlayer().getHp()).toBe(hpBefore)
        }
    })

    it("undo después de matar monstruo restaura hp y weaponKills", () => {
        const weapon = game.getRoom().find(c => c.getType() === "W")
        const monster = game.getRoom().find(c => c.getType() === "M")
        if (weapon && monster && monster.getRank() < weapon.getRank()) {
            game.playCard(weapon.id, false)
            const fullState = game.getFullState()
            const hpBefore = game.getPlayer().getHp()
            game.playCard(monster.id, true)
            game.restoreFullState(fullState)
            expect(game.getPlayer().getHp()).toBe(hpBefore)
            expect(game.getPlayer().getWeaponKills().length).toBe(0)
        }
    })

    it("flee devuelve las cartas al mazo", () => {
        const deckBefore = game.getDeckCount()
        const roomSize = game.getRoom().length
        game.flee()
        expect(game.getDeckCount()).toBe(deckBefore + roomSize - 4)
    })
})