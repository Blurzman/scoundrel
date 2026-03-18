export function getRankLabel(rank: number): string {
    if (rank === 11) return "J"
    if (rank === 12) return "Q"
    if (rank === 13) return "K"
    if (rank === 14) return "A"
    return String(rank)
}

export function getSuitSymbol(suit: number): string {
    switch (suit) {
        case 0: return "♠"
        case 1: return "♣"
        case 2: return "♥"
        case 3: return "♦"
        default: return ""
    }
}