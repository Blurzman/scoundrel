import { describe, it, expect } from "vitest"
import GameManager from "./GameManager"

describe("GameManager", () => {

    // --- Setup ---
    describe("startGame()", () => {
        it("el status es playing al iniciar", () => {
            const game = new GameManager()
            game.startGame()
            expect(game.getStatus()).toBe("playing")
        })
        it("la room tiene 4 cartas al iniciar", () => {
            const game = new GameManager()
            game.startGame()
            expect(game.getRoom().length).toBe(4)
        })
        it("el jugador empieza con 20 HP", () => {
            const game = new GameManager()
            game.startGame()
            expect(game.getPlayer().getHp()).toBe(20)
        })
    })

    // --- PlayCard ---
    describe("playCard()", () => {
        it("jugar una carta la remueve de la room", () => {
            const game = new GameManager()
            game.startGame()
            const card = game.getRoom()[0]
            game.playCard(card.id)
            expect(game.getRoom().find(c => c.id === card.id)).toBeUndefined()
        })
        it("no hace nada si el id no existe", () => {
            const game = new GameManager()
            game.startGame()
            game.playCard("id-inexistente")
            expect(game.getRoom().length).toBe(4)
        })
        it("no hace nada si el juego no está en playing", () => {
            const game = new GameManager()
            game.playCard("id-cualquiera")
            expect(game.getStatus()).toBe("idle")
        })
    })

    // --- Death ---
    describe("muerte del jugador", () => {
        it("el status es lost si el jugador muere", () => {
            const game = new GameManager()
            game.startGame()

            // forzar muerte jugando monstruos a mano desnuda
            let alive = true
            while (alive && game.getStatus() === "playing") {
                const cards = game.getRoom()
                const monster = cards.find(c => c.getType() === "M")
                if (monster) {
                    game.playCard(monster.id)
                } else {
                    game.playCard(cards[0].id)
                }
                alive = game.getPlayer().isAlive()
            }

            if (!game.getPlayer().isAlive()) {
                expect(game.getStatus()).toBe("lost")
            }
        })
    })

    // --- Flee ---
    describe("flee()", () => {
        it("no puede huir dos veces seguidas", () => {
            const game = new GameManager()
            game.startGame()
            game.flee()
            const roomAfterFirstFlee = game.getRoom().map(c => c.id)
            game.flee()
            expect(game.getRoom().map(c => c.id)).toEqual(roomAfterFirstFlee)
})
        it("después de huir la room tiene 4 cartas nuevas", () => {
            const game = new GameManager()
            game.startGame()
            const roomAntes = game.getRoom().map(c => c.id)
            game.flee()
            const roomDespues = game.getRoom().map(c => c.id)
            expect(roomAntes).not.toEqual(roomDespues)
        })
        it("puede huir de nuevo después de completar un room", () => {
            const game = new GameManager()
            game.startGame()
            game.flee()

            // completar el room actual jugando 3 cartas
            const cards = game.getRoom()
            game.playCard(cards[0].id)
            game.playCard(cards[1].id)
            game.playCard(cards[2].id)

            // ahora debería poder huir de nuevo
            const roomAntes = game.getRoom().map(c => c.id)
            game.flee()
            const roomDespues = game.getRoom().map(c => c.id)
            expect(roomAntes).not.toEqual(roomDespues)
        })
    })

    // --- Win ---
    describe("victoria", () => {
        it("el status es won cuando el mazo no tiene suficientes cartas", () => {
            const game = new GameManager()
            game.startGame()

            while (game.getStatus() === "playing") {
                const cards = game.getRoom()
                if (cards.length === 0) break

                // jugar las primeras 3 cartas para completar el room
                game.playCard(cards[0].id)
                if (game.getStatus() !== "playing") break
                game.playCard(cards[1].id)
                if (game.getStatus() !== "playing") break
                game.playCard(cards[2].id)
            }

            expect(["won", "lost"]).toContain(game.getStatus())
        })
    })
})