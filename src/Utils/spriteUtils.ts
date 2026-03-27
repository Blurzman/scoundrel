import cardsFront from '../assets/CardsFront.png'
import cardsBack from '../assets/CardsBack.png'
import type React from "react"
import type Card from "../game/Card"

/* Size of each card in the spritesheets in pixels. */
const CARD_HEIGHT = 95
const CARD_WIDTH = 71


/**
 * Returns the CSS properties to render the front of a card using the spritesheets.
 * Layers CardsFront.png over the white card background from CardsBack.png.
 * @param card - The card to render.
 * @returns CSS properties with background image, position and size.
 */
export function getFrontStyle(card: Card) : React.CSSProperties {
    const col = card.getRank() -2
    const row = card.getSuit()
    return {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundImage: `url('${cardsFront}'), url('${cardsBack}')`,
        backgroundPosition: `${-col * CARD_WIDTH}px ${-row * CARD_HEIGHT}px, -71px 0px`,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: `${13 * CARD_WIDTH}px ${4 * CARD_HEIGHT}px, ${7 * CARD_WIDTH}px ${5 * CARD_HEIGHT}px`
    }
}

/**
 * Returns the CSS properties to render the back of a card using CardsBack.png.
 * Uses the red decorative design (first card in the spritesheet).
 * @returns CSS properties with background image, position and size.
 */
export function getBackStyle(): React.CSSProperties {
    return {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundImage: `url('${cardsBack}')`,
        backgroundPosition: '0px 0px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto'
    }
}