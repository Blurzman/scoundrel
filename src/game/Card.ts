
/**
 * Represents the four suits of a card.
 * Value corresponds to the row position in CardsFront.png
 */
export const SUITS = {
    Spades: 0,
    Clubs: 1,
    Hearts: 2,
    Diamonds: 3
} as const

export type Suit = typeof SUITS[keyof typeof SUITS]

/**
 * Monster (Spades/Clubs)
 * Weapon (Diamonds)
 * Potions (Hearts)
 * 
 */
export type CardType = "M" | "W" | "P" 

/**
 * Represents every playing card in the game.
 * 
 */
export default class Card {
    public readonly id = crypto.randomUUID()
    private suit: Suit
    private rank: number
    private type!: CardType

    constructor(suit: Suit, rank: number) {
      this.suit = suit
      this.rank = rank
      this.setType()
    } 
  
  
  /**
   * 
   * @returns The CardType.
   */
  public getType(): CardType{
    return this.type
  }

  /**
   * 
   * @returns The CardRank as a number. (2-14, 11 = J , 12 = Q, etc)
   */
  public getRank(): number{
    return this.rank
  }
  /**
   * 
   * @returns The card Suit. (is a number but ykwim)
   */
  public getSuit(): Suit {
    return this.suit
  }

  /**
   * Determines the CardType base on the suit.
   */
  private setType(){
    if (this.suit === SUITS.Spades || this.suit === SUITS.Clubs){
        this.type = "M"
    } else if (this.suit === SUITS.Hearts) {
        this.type = "P"
    } else {
        this.type = "W"
    }
  }
}