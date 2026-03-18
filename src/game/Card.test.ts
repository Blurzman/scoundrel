import { describe, it, expect } from "vitest"
import Card, { SUITS } from "./Card"

describe("Card", () => {

    // --- Tipos ---
    describe("getType()", () => {
        it("Spades es tipo M", () => {
            expect(new Card(SUITS.Spades, 1).getType()).toBe("M")
        })
        it("Clubs es tipo M", () => {
            expect(new Card(SUITS.Clubs, 1).getType()).toBe("M")
        })
        it("Hearts es tipo P", () => {
            expect(new Card(SUITS.Hearts, 1).getType()).toBe("P")
        })
        it("Diamonds es tipo W", () => {
            expect(new Card(SUITS.Diamonds, 1).getType()).toBe("W")
        })
    })

    // --- Rank ---
    describe("getRank()", () => {
        it("retorna rank 2", () => {
            expect(new Card(SUITS.Spades, 2).getRank()).toBe(2)
        })
        it("retorna rank 7", () => {
            expect(new Card(SUITS.Spades, 7).getRank()).toBe(7)
        })
        it("retorna rank 13", () => {
            expect(new Card(SUITS.Spades, 13).getRank()).toBe(13)
        })
    })

    // --- ID ---
    describe("id", () => {
        it("dos cartas iguales tienen ids distintos", () => {
            const card1 = new Card(SUITS.Spades, 1)
            const card2 = new Card(SUITS.Spades, 1)
            expect(card1.id).not.toBe(card2.id)
        })
        it("el id no cambia después de creada la carta", () => {
            const card = new Card(SUITS.Spades, 1)
            const idInicial = card.id
            expect(card.id).toBe(idInicial)
        })
        it("el id es un string no vacío", () => {
            const card = new Card(SUITS.Spades, 1)
            expect(typeof card.id).toBe("string")
            expect(card.id.length).toBeGreaterThan(0)
        })
    })
})