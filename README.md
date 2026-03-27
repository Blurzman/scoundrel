# ♠ Scoundrel

> *A dungeon crawler played with a deck of cards. No mercy. No second chances. Just you and the cards.*

---

## What is this?

**Scoundrel** is a single-player card game set in a dungeon. Each room presents four cards — monsters to fight, weapons to grab, potions to drink. You decide how to survive.

Built with React + TypeScript as a faithful implementation of the original pen-and-paper game by Zach Gage & Kurt Bieg.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | CSS Modules |
| Tests | Vitest |

---

## How to play

You start with **20 HP**. The dungeon is a shuffled deck dealt four cards at a time.

| Card | What it does |
|---|---|
| ♠ ♣ Monster | Fight it bare-handed or with your weapon |
| ♦ Weapon | Equip it to fight monsters |
| ♥ Potion | Heal HP (once per room) |

**Weapon rule** — you can only use your weapon against a monster with a *lower rank* than the last one you defeated with it. Chain kills keep your weapon sharp. Breaking the chain means fighting bare-handed.

**Fleeing** — skip a room and put its cards back into the deck. You can't flee two rooms in a row.

**Win** — clear the dungeon before the deck runs out.  
**Lose** — reach 0 HP.

---

## Project structure

```
src/
├── game/
│   ├── Card.ts          # Card model (suit, rank, type)
│   ├── Deck.ts          # 44-card deck, Fisher-Yates shuffle
│   ├── Room.ts          # 4-card room management
│   ├── Player.ts        # HP, weapon, potion logic
│   └── GameManager.ts   # Game orchestration + state snapshots
├── hooks/
│   └── useGame.ts       # useReducer + undo history
├── components/
│   ├── GameScreen        # Main layout
│   ├── RoomCards         # 4-card room display
│   ├── CardComponent     # Spritesheet-based card renderer
│   ├── WeaponArea        # Equipped weapon + kill stack
│   ├── DeckPile          # Visual deck with depth layers
│   ├── HpDisplay         # 20-frame animated health bar
│   ├── PlayerInfo        # Weapon + last defeated card
│   ├── BtnWeapon         # Weapon toggle
│   ├── BtnFlee           # Flee action
│   └── BtnUndo           # Undo last action
└── utils/
    ├── cardUtils.ts      # Rank labels, suit symbols
    └── spriteUtils.ts    # Spritesheet positioning
```

---

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run test       # run unit + integration tests
npm run build      # production build
```

---

## Deck composition

The standard deck has **44 cards** — a full deck minus the red face cards (J♥, Q♥, K♥, J♦, Q♦, K♦) and the A♥. This keeps the game balanced between threat and reward.

---

## Undo

Every action is snapshotted before it executes. Hit undo to roll back one step. Undo history is cleared when you start a new game.

---

## Known limitations

- Room cards currently shift when one is played — fixed-slot layout with `visibility: hidden` is in progress
- No persistent high score or save state

---

## Credits

Original game design by **Zach Gage** & **Kurt Bieg**  
Original **Balatro** card assets by **LocalThunk**

---

*♠ ♣ ♦ ♥*
