# CS:GO Sound Guesser 🎮🔊

A fun and interactive web game where you test your knowledge of Counter-Strike: Global Offensive weapon sounds!

## 🎯 Game Features

- **Sound Recognition**: Listen to authentic CS:GO weapon sounds and guess which weapon it is
- **Timed Rounds**: 15 seconds per round to keep the game exciting
- **Score Tracking**: Track your accuracy across multiple rounds
- **Modern UI**: Clean, responsive design with Material-UI components
- **Progressive Web App**: Installable on mobile devices

## 🎮 How to Play

1. Click "Start Game" to begin
2. Listen to the weapon sound by clicking "Play Sound"
3. Choose from the available weapon options
4. Get immediate feedback on your guess
5. Complete 10 rounds to see your final score
6. Challenge yourself to beat your previous score!

## 🛠️ Technical Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Material-UI** - Professional UI components
- **Vite** - Fast development and build tool
- **PWA** - Progressive Web App capabilities

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cs2-sound-guesser.git
cd cs2-sound-guesser
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Adding More Weapon Sounds

To expand the game with more weapons:

1. Create a new folder in `sounds/weapons/` (e.g., `sounds/weapons/m4a4/`)
2. Add weapon sound files in `.wav` format
3. Update the `weaponSounds` array in `src/pages/Welcome/Welcome.tsx`:

```typescript
const weaponSounds = [
  { name: 'AK-47', folder: 'ak47', soundFiles: ['ak47_01.wav', 'ak47_02.wav'] },
  { name: 'M4A4', folder: 'm4a4', soundFiles: ['m4a4_01.wav', 'm4a4_02.wav'] },
  // Add more weapons...
];
```

4. Make sure to update the `weaponChoices` array to include the new weapon in the answer options

## 🎵 Sound Files

The game currently includes AK-47 weapon sounds. You can find high-quality CS:GO weapon sounds from:

- Official CS:GO game files
- Community sound packs
- Free sound libraries

**Note**: Ensure you have proper licensing for any sound files you use.

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📱 PWA Features

- Installable on mobile devices
- Offline caching
- App-like experience
- Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-weapons`
3. Commit your changes: `git commit -am 'Add M4A4 weapon sounds'`
4. Push to the branch: `git push origin feature/new-weapons`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Add more weapon sounds (M4A4, AWP, Desert Eagle, etc.)
- [ ] Implement difficulty levels
- [ ] Add leaderboard functionality
- [ ] Include weapon reload sounds
- [ ] Add utility sounds (grenades, defuse kit, etc.)
- [ ] Multiplayer mode
- [ ] Sound visualization
- [ ] Achievement system

## 🙏 Acknowledgments

- Counter-Strike: Global Offensive for the amazing weapon sounds
- React community for the excellent ecosystem
- Material-UI team for the beautiful components

---

**Have fun testing your CS:GO knowledge! 🎮**
