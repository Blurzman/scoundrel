import Deck from "./Deck";
import Card from "./Card";

export default class Room{
    private cards: Card[] 
    constructor() {
        this.cards = []
    }

    public fill(deck: Deck) {
        while (this.cards.length < 4 && !deck.isEmpty()){
            const card = deck.draw()

            this.cards.push(card)
        }

    }
    public getCards(): Card[]{
        return [...this.cards]
    }

    public clear(): void {
        this.cards = []
    }

    public removeCard(cardId: string): void {
    this.cards = this.cards.filter(c => c.id !== cardId)
}
}