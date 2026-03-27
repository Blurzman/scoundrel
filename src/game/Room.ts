import Deck from "./Deck";
import Card from "./Card";

/** 
 * Represents a room containing up to 4 cards for the player to interact with. 
 * 
 */
export default class Room{
    private cards: Card[] 
    constructor() {
        this.cards = []
    }

    /**
     * Fills the room with cards drawn from the deck until there are 4 cards or the deck is empty.
     * 
     * (empy part shouldent happen)
     * @param deck - The deck to draw cards from.
     */
    public fill(deck: Deck) {
        while (this.cards.length < 4 && !deck.isEmpty()){
            const card = deck.draw()

            this.cards.push(card)
        }

    }

    /** 
     * @returns A copy of the cards in the room. 
     * 
     */
    public getCards(): Card[]{
        return [...this.cards]
    }

    /** 
     * Removes all cards from the room. Used when the player flees. 
     * 
     */
    public clear(): void {
        this.cards = []
    }

    /**
     * Removes a specific card from the room by its id.
     * @param cardId - The id of the card to remove.
     */
    public removeCard(cardId: string): void {
        this.cards = this.cards.filter(c => c.id !== cardId)
    }

    /**
     * Restores the room to a previous state. Used for undo.
     * @param cards - The cards to restore.
     */
    public restoreCards(cards: Card[]): void{
        this.cards = cards
    }
}