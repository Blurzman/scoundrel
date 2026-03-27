import Card, {SUITS, type Suit} from "./Card"


/**
 * Represents a deck of 44 Cards. 
 * (no hearts and diamonds face cards) :(
 * @author Samuel Alarcon
 */
export default class Deck{
    private cards: Card[]
    constructor(){
        this.cards = []
        this.createDeck()
        
    }

    /**
     * Counts the deck cards.
     * @returns The amount of cards remaining in the deck.
     */
    public count(): number {
        return this.cards.length
    }

    /**
     * 
     * @returns A copy of the deck.
     */
    public getCards(): Card[] {
        return [...this.cards]
    }

    /**
     * 
     * @returns True if no more cards in the deck.
     */
    public isEmpty():boolean{
        return this.cards.length === 0
    }
    
    /**
     * Shuffles the deck in place. 
     * I think its called a Fisher-Yates algorithm. 
     */
    public shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1))
 
            ;[this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]]
        }
    }

    /**
     *  Draws the top card from the deck.
     * @throws Error if deck empty. (should never happen)
     * @returns a pizza.
     */
    public draw(): Card {
        if (this.isEmpty()) throw new Error("Cannot draw from empty deck")
            return this.cards.pop()!
    }

    /**
     * Return a card to the bottom of the deck. Used when the player flees the room.
     * @param card The card to place back.
     */
    public putBack(card: Card): void {
        this.cards.unshift(card)
    }

    
    /**
     * Restores the deck to a previous state, used for undo. (a setter?)
     * @param cards The deck to restore.
     */
    public restoreCards(cards: Card[]):void {
        this.cards = cards
    }

    /**
     * Builds a 44-card deck.
     * Only used in constructor
     */
    private createDeck(){
        for (let suit = 0; suit < 4; suit++){
            for (let rank = 2; rank <= 14; rank++){
                if ((suit === SUITS.Hearts || suit === SUITS.Diamonds) && rank >= 11) continue
                
                this.cards.push(new Card(suit as Suit, rank))
            }
        }
    }
}