# Dice Game

A web-based "Dice" betting game with real-time payout calculations. The game simulates a dice roll from 0 to 100, allowing players to bet on "Roll Under" or "Roll Over" a chosen target number.

## 🎮 Demo

Open [http://localhost:3000](http://localhost:3000) in your browser after starting the project.

## 🚀 Key Features

### Game Interface
- **Game Modes**: Manual betting mode
- **Currency Selection**: Choose from USD, EUR, UAH, or BTC
- **Bet Amount Controls**: 
  - Input field with selected currency display
  - Quick adjustment buttons: 1/2, 2×, Max
  - Quick amount buttons: dynamic values based on balance
- **Win Amount Calculator**: Automatically calculates potential winnings based on bet and multiplier
- **Bet Button**: Initiates the game round

### Visual Elements
- **Animated Dice**: Displays result from 0.00 to 100.00 with smooth animations
  - Moves horizontally to match the rolled value
  - Shows dice image (die.png) with value overlay
  - Scale animation during betting
- **Interactive Slider**:
  - Green win zone and orange lose zone with real-time updates
  - Custom thumb (slider-bar-thumb.png) with smooth drag
  - Sound effects during slider movement (with mute toggle)
  - Scale markers: 0, 25, 50, 75, 100 precisely positioned
- **Dark color scheme** matching reference design

### Game Settings
- **Payout Multiplier**: Shows calculated multiplier (98% RTP)
- **Roll Under / Roll Over**: Toggle between betting modes
- **Win Chance**: Percentage probability of winning

### Game History
- Table showing all bet history
- Displays: result, target, direction, bet amount, multiplier, and winnings
- Color-coded win/loss indicators

## 🛠 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Strict typing without `any`
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **@faker-js/faker** - Mock data generation
- **Material-UI (MUI)** - UI component library

## 📁 Project Structure

```
dice-game/
├── src/
│   ├── app/
│   │   ├── dice/
│   │   │   ├── components/
│   │   │   │   ├── GameBoard/
│   │   │   │   │   ├── Game.tsx          # Main game component
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── BetControls/
│   │   │   │   │   └── index.tsx          # Betting controls panel
│   │   │   │   └── GameStats/
│   │   │   │       └── index.tsx          # Game history table
│   │   │   ├── page.tsx                   # Main game page
│   │   │   └── layout.tsx                 # Layout wrapper
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                       # Redirect to /dice
│   ├── api/
│   │   └── mocks/
│   │       └── dice/
│   │           ├── dice.ts                # Mock API for bets
│   │           └── dice.types.ts          # API types
│   ├── store/
│   │   └── dice/
│   │       ├── diceStore.ts               # Zustand store
│   │       └── DiceStore.types.ts         # Store types
│   └── types/
│       └── dice/
│           └── dice.ts                    # TypeScript interfaces
├── public/
│   ├── die.png                            # Dice image
│   ├── slider-bar-thumb.png               # Slider thumb image
│   └── sound2.wav                         # Slider sound effect
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Game Logic

### Result Generation
- Dice roll result is generated on the "server" (simulated using faker/random)
- Smooth transition animation for displaying results
- Dice moves to the position corresponding to the rolled value

### Win Condition
Player wins if:
- **Roll Under**: rolled number < target value
- **Roll Over**: rolled number > target value

### Multiplier Calculation
```
multiplier = (100 / winChance) * RTP
where RTP = 0.98 (98%)
```

### Win Chance Calculation
```
winChance = Roll Under ? target : (100 - target)
```

### Interactive Features
- **Slider Sound**: Plays sound effect during slider movement (throttled to 50ms)
- **Mute Toggle**: Button to enable/disable sound effects
- **Real-time Updates**: Win/lose zones update instantly without delay
- **Smooth Animations**: 500ms transition for dice movement after bet

## 🏃 Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Design

- **Desktop**: Optimized layout with side panel and game board grid
- **Mobile**: Adaptive design with vertical element arrangement
- **Tablet**: Intermediate breakpoints for optimal experience

## ✨ Implementation Highlights

### TypeScript
- ✅ Full typing without `any`
- ✅ Interfaces for all data structures
- ✅ Typed component props and hooks

### State Management
- ✅ Zustand for global game state
- ✅ Optimized calculations (calculateMultiplier, calculateWinChance)
- ✅ Bet history management
- ✅ Currency selection with persistent state

### UI/UX
- ✅ Dark color scheme matching reference design
- ✅ Smooth animations and transitions
- ✅ Interactive slider with real-time win/lose zone visualization
- ✅ Custom dice image with value overlay
- ✅ Custom slider thumb image
- ✅ Sound effects with mute control
- ✅ Precise scale marker positioning
- ✅ Custom scrollbar styling

### Performance
- ✅ Client-side components ('use client')
- ✅ No CSS transitions on slider (instant updates)
- ✅ Sound throttling (50ms) to prevent audio spam
- ✅ Efficient state updates without unnecessary re-renders
- ✅ Dynamic component loading

## 📊 Game Configuration

```typescript
{
  rtp: 98,              // Return to Player (98%)
  max_bet: 1470.58,     // Maximum bet amount
  min_bet: 0.00001,     // Minimum bet amount
  max_target: 99,       // Maximum target value
  min_target: 1,        // Minimum target value
  precision: 2          // Result precision (decimal places)
}
```

## 🎨 Design

Reference: [BC.Game Classic Dice](https://bc.game/game/classic-dice)

Color Scheme:
- Background: Dark blue-gray gradient (#0f1f2a, #1a2c38)
- Panels: Semi-transparent dark (#1e3340, #2a3f4d)
- Win accent: Bright green (#22c55e, #16a34a)
- Lose accent: Orange (#f97316, #ea580c)
- Text: White/gray scale
- Borders: Subtle dark borders (#2a3f4d)

## 🎵 Audio

- **Sound Effect**: slider-movement sound (sound2.wav)
- **Throttling**: 50ms to prevent overlapping sounds
- **Volume**: 20% (0.2) for comfortable UX
- **Control**: Mute/unmute toggle button (🔊/🔇)

## 🖼️ Assets

- **die.png**: Dice image (120x120px on desktop)
- **slider-bar-thumb.png**: Custom slider thumb
- **sound2.wav**: Slider movement sound effect

## 📝 License

MIT

## 👨‍💻 Author

Test assignment completed according to requirements.
