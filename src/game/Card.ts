export const SUITS = {
    Spades: 0,
    Clubs: 1,
    Hearts: 2,
    Diamonds: 3
} as const

export type Suit = typeof SUITS[keyof typeof SUITS]

export type CardType = "M" | "W" | "P" 

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

  public getType(): CardType{
    return this.type
  }
  public getRank(): number{
    return this.rank
  }
  public getSuit(): Suit {
    return this.suit
}

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