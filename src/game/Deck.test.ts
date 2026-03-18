import { describe, it, expect } from "vitest"
import Deck from "./Deck"

describe("Deck", () => {

    describe("createDeck()", () => {
        it("el mazo tiene 44 cartas al crearse", () => {
            const deck = new Deck()
            expect(deck.count()).toBe(44)
        })
        it("el mazo no está vacío al crearse", () => {
            const deck = new Deck()
            expect(deck.isEmpty()).toBe(false)
        })
    })

    describe("draw()", () => {
        it("robar una carta reduce el mazo en 1", () => {
            const deck = new Deck()
            deck.draw()
            expect(deck.count()).toBe(43)
        })
        it("robar todas las cartas vacía el mazo", () => {
            const deck = new Deck()
            for (let i = 0; i < 44; i++) deck.draw()
            expect(deck.isEmpty()).toBe(true)
        })
        it("robar de un mazo vacío lanza error", () => {
            const deck = new Deck()
            for (let i = 0; i < 44; i++) deck.draw()
            expect(() => deck.draw()).toThrow()
        })
    })

    describe("shuffle()", () => {
        it("el mazo sigue teniendo 44 cartas después de shufflear", () => {
            const deck = new Deck()
            deck.shuffle()
            expect(deck.count()).toBe(44)
        })
        it("el orden cambia después de shufflear", () => {
            const deck = new Deck()
            const ordenOriginal = deck.getCards().map(c => c.id)
            deck.shuffle()
            const ordenNuevo = deck.getCards().map(c => c.id)
            expect(ordenOriginal).not.toEqual(ordenNuevo)
        })
    })

    describe("putBack()", () => {
        it("devolver una carta aumenta el mazo en 1", () => {
            const deck = new Deck()
            const card = deck.draw()
            expect(deck.count()).toBe(43)
            deck.putBack(card)
            expect(deck.count()).toBe(44)
        })
        it("la carta devuelta queda al fondo del mazo", () => {
            const deck = new Deck()
            const card = deck.draw()
            deck.putBack(card)
            expect(deck.getCards()[0].id).toBe(card.id)
        })
    })

    describe("isEmpty()", () => {
        it("retorna false con cartas", () => {
            const deck = new Deck()
            expect(deck.isEmpty()).toBe(false)
        })
        it("retorna true sin cartas", () => {
            const deck = new Deck()
            for (let i = 0; i < 44; i++) deck.draw()
            expect(deck.isEmpty()).toBe(true)
        })
    })
})