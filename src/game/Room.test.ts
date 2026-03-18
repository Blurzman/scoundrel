import { describe, it, expect } from "vitest"
import Room from "./Room"
import Deck from "./Deck"

describe("Room", () => {

    describe("fill()", () => {
        it("llena la room con 4 cartas", () => {
            const deck = new Deck()
            deck.shuffle()
            const room = new Room()
            room.fill(deck)
            expect(room.getCards().length).toBe(4)
        })
        it("el mazo pierde 4 cartas al llenar la room", () => {
            const deck = new Deck()
            const room = new Room()
            room.fill(deck)
            expect(deck.count()).toBe(40)
        })
        it("no llena más de 4 cartas", () => {
            const deck = new Deck()
            const room = new Room()
            room.fill(deck)
            room.fill(deck)
            expect(room.getCards().length).toBe(4)
        })
        it("si el mazo tiene menos de 4 cartas no llena la room", () => {
            const deck = new Deck()
            for (let i = 0; i < 42; i++) deck.draw()  // quedan 2
            const room = new Room()
            room.fill(deck)
            expect(room.getCards().length).toBe(2)
        })
    })

    describe("getCards()", () => {
        it("retorna una copia, no la referencia original", () => {
            const deck = new Deck()
            const room = new Room()
            room.fill(deck)
            const cards = room.getCards()
            cards.pop()
            expect(room.getCards().length).toBe(4)
        })
    })

    describe("removeCard()", () => {
        it("remover una carta reduce la room en 1", () => {
            const deck = new Deck()
            const room = new Room()
            room.fill(deck)
            const card = room.getCards()[0]
            room.removeCard(card.id)
            expect(room.getCards().length).toBe(3)
        })
        it("la carta removida ya no está en la room", () => {
            const deck = new Deck()
            const room = new Room()
            room.fill(deck)
            const card = room.getCards()[0]
            room.removeCard(card.id)
            expect(room.getCards().find(c => c.id === card.id)).toBeUndefined()
        })
    })

    describe("clear()", () => {
        it("vacía la room completamente", () => {
            const deck = new Deck()
            const room = new Room()
            room.fill(deck)
            room.clear()
            expect(room.getCards().length).toBe(0)
        })
    })
})