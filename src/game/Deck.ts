import Card, {SUITS, type Suit} from "./Card"

export default class Deck{
    private cards: Card[]
    constructor(){
        this.cards = []
        this.createDeck()
        
    }

    private createDeck(){
        for (let suit = 0; suit < 4; suit++){
            for (let rank = 2; rank <= 14; rank++){
                if ((suit === SUITS.Hearts || suit === SUITS.Diamonds) && rank >= 11) continue
                
                this.cards.push(new Card(suit as Suit, rank))
            }
        }
    }

    public shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1))
 
            ;[this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]]
        }
    }

    public draw(): Card {
        if (this.isEmpty()) throw new Error("Cannot draw from empty deck")
        return this.cards.pop()!
    }

    public putBack(card: Card): void {
        this.cards.unshift(card)
    }

    public count(): number {
        return this.cards.length
    }

    public getCards(): Card[] {
        return [...this.cards]
    }

    public isEmpty():boolean{
        return this.cards.length === 0
    }
}