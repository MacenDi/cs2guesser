import { useState, useEffect } from 'react';
import { 
  Button, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Alert,
  LinearProgress,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import { VolumeUp, PlayArrow, Stop, Search } from '@mui/icons-material';

import { FullSizeCentered } from '@/components/styled';

// Define weapon sounds data - ALL AVAILABLE WEAPONS
const weaponSounds = [
  // Rifles
  { name: 'AK-47', folder: 'ak47', soundFiles: ['ak47_01.wav', 'ak47_02.wav', 'ak47_03.wav', 'ak47_04.wav', 'ak47-1.wav'] },
  { name: 'M4A4', folder: 'm4a4', soundFiles: ['m4a4_01.wav', 'm4a4_02.wav', 'm4a4_03.wav'] },
  { name: 'M4A1-S', folder: 'm4a1', soundFiles: ['m4a1_01.wav', 'm4a1_02.wav', 'm4a1_03.wav', 'm4a1_04.wav'] },
  { name: 'FAMAS', folder: 'famas', soundFiles: ['famas_01.wav', 'famas_02.wav', 'famas_03.wav'] },
  { name: 'Galil AR', folder: 'galilar', soundFiles: ['galil_01.wav', 'galil_02.wav', 'galil_03.wav', 'galil_04.wav'] },
  { name: 'AUG', folder: 'aug', soundFiles: ['aug_01.wav', 'aug_02.wav', 'aug_03.wav', 'aug_04.wav'] },
  { name: 'SG 553', folder: 'sg556', soundFiles: ['sg556_01.wav', 'sg556_02.wav', 'sg556_03.wav', 'sg556_04.wav'] },
  
  // Sniper Rifles
  { name: 'AWP', folder: 'awp', soundFiles: ['awp_01.wav', 'awp_02.wav'] },
  { name: 'SSG 08', folder: 'ssg08', soundFiles: ['ssg08_01.wav'] },
  { name: 'SCAR-20', folder: 'scar20', soundFiles: ['scar20_01.wav', 'scar20_02.wav', 'scar20_03.wav'] },
  { name: 'G3SG1', folder: 'g3sg1', soundFiles: ['g3sg1_01.wav', 'g3sg1_02.wav', 'g3sg1_03.wav'] },
  
  // Pistols
  { name: 'Glock-18', folder: 'glock18', soundFiles: ['glock_01.wav', 'glock_02.wav'] },
  { name: 'USP-S', folder: 'usp', soundFiles: ['usp_01.wav', 'usp_02.wav', 'usp_03.wav'] },
  { name: 'P2000', folder: 'hkp2000', soundFiles: ['hkp2000_01.wav', 'hkp2000_02.wav', 'hkp2000_03.wav'] },
  { name: 'Dual Berettas', folder: 'elite', soundFiles: ['elites_01.wav', 'elites_02.wav', 'elites_03.wav', 'elites_04.wav'] },
  { name: 'P250', folder: 'p250', soundFiles: ['p250_01.wav'] },
  { name: 'Tec-9', folder: 'tec9', soundFiles: ['tec9_02.wav'] },
  { name: 'CZ75-Auto', folder: 'cz75a', soundFiles: ['cz75_01.wav', 'cz75_02.wav', 'cz75_03.wav'] },
  { name: 'Five-SeveN', folder: 'fiveseven', soundFiles: ['fiveseven_01.wav'] },
  { name: 'Desert Eagle', folder: 'deagle', soundFiles: ['deagle_01.wav', 'deagle_02.wav'] },
  { name: 'R8 Revolver', folder: 'revolver', soundFiles: ['revolver-1_01.wav'] },
  
  // SMGs
  { name: 'MAC-10', folder: 'mac10', soundFiles: ['mac10_01.wav', 'mac10_02.wav'] },
  { name: 'MP9', folder: 'mp9', soundFiles: ['mp9_01.wav', 'mp9_02.wav', 'mp9_03.wav', 'mp9_04.wav'] },
  { name: 'MP7', folder: 'mp7', soundFiles: ['mp7_01.wav', 'mp7_02.wav', 'mp7_03.wav', 'mp7_04.wav'] },
  { name: 'MP5-SD', folder: 'mp5', soundFiles: ['mp5_01.wav'] },
  { name: 'UMP-45', folder: 'ump45', soundFiles: ['ump45_02.wav'] },
  { name: 'P90', folder: 'p90', soundFiles: ['p90_01.wav', 'p90_02.wav'] },
  { name: 'PP-Bizon', folder: 'bizon', soundFiles: ['bizon_01.wav', 'bizon_02.wav'] },
  
  // Shotguns
  { name: 'Nova', folder: 'nova', soundFiles: ['nova-1.wav'] },
  { name: 'XM1014', folder: 'xm1014', soundFiles: ['xm1014-1.wav'] },
  { name: 'Sawed-Off', folder: 'sawedoff', soundFiles: ['sawedoff-1.wav'] },
  { name: 'MAG-7', folder: 'mag7', soundFiles: ['mag7_01.wav', 'mag7_02.wav'] },
  
  // Machine Guns
  { name: 'M249', folder: 'm249', soundFiles: ['m249-1.wav'] },
  { name: 'Negev', folder: 'negev', soundFiles: ['negev_01.wav', 'negev_02.wav'] },
];

// All possible weapon names for answer choices
const allWeaponNames = weaponSounds.map(weapon => weapon.name);

function Welcome() {
  const [currentWeapon, setCurrentWeapon] = useState<string>('');
  const [currentSound, setCurrentSound] = useState<string>('');
  const [score, setScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [currentChoices, setCurrentChoices] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState('');

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !showResult && timeLeft > 0 && !gameOver) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(''); // Auto-submit when time runs out
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, showResult, gameOver]);

  // Function to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Function to generate 12 choices (11 random + 1 correct)
  const generateChoices = (correctWeapon: string): string[] => {
    const otherWeapons = allWeaponNames.filter(name => name !== correctWeapon);
    const shuffledOthers = shuffleArray(otherWeapons);
    const randomChoices = shuffledOthers.slice(0, 11);
    const allChoices = [correctWeapon, ...randomChoices];
    return shuffleArray(allChoices);
  };

  const startNewRound = () => {
    // Select a random weapon from available weapons
    const weapon = weaponSounds[Math.floor(Math.random() * weaponSounds.length)];
    const randomSound = weapon.soundFiles[Math.floor(Math.random() * weapon.soundFiles.length)];
    
    setCurrentWeapon(weapon.name);
    setCurrentSound(`${import.meta.env.BASE_URL}sounds/weapons/${weapon.folder}/${randomSound}`);
    setCurrentChoices(generateChoices(weapon.name));
    setShowResult(false);
    setSelectedAnswer('');
    setTimeLeft(15);
    setGameStarted(true);
    setGameOver(false);
    setSearchFilter('');
  };

  const startGame = () => {
    setScore(0);
    setTotalRounds(0);
    startNewRound();
  };

  const playSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    
    const newAudio = new Audio(currentSound);
    setAudio(newAudio);
    setIsPlaying(true);
    
    newAudio.play().catch(console.error);
    
    newAudio.onended = () => {
      setIsPlaying(false);
    };
  };

  const stopSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentWeapon;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setTotalRounds(totalRounds + 1);
    stopSound();
    
    // Auto-advance after 3 seconds
    setTimeout(() => {
      if (totalRounds >= 9) { // 10 rounds total
        setGameOver(true);
      } else {
        startNewRound();
      }
    }, 3000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setShowResult(false);
    setScore(0);
    setTotalRounds(0);
    setCurrentChoices([]);
    setSearchFilter('');
    stopSound();
  };

  if (gameOver) {
    return (
      <>
        <meta name="title" content="CS:GO Sound Guesser" />
        <FullSizeCentered>
          <Card sx={{ maxWidth: 600, width: '100%', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h3" gutterBottom color="primary">
                Game Over!
              </Typography>
              <Typography variant="h4" gutterBottom>
                Final Score: {score}/{totalRounds}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Accuracy: {((score / totalRounds) * 100).toFixed(1)}%
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={resetGame}
                  sx={{ mr: 2 }}
                >
                  Play Again
                </Button>
              </Box>
            </CardContent>
          </Card>
        </FullSizeCentered>
      </>
    );
  }

  if (!gameStarted) {
    return (
      <>
        <meta name="title" content="CS:GO Sound Guesser" />
        <FullSizeCentered>
          <Card sx={{ maxWidth: 600, width: '100%', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h3" gutterBottom color="primary">
                CS:GO Sound Guesser
              </Typography>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Test your knowledge of Counter-Strike weapon sounds! Now featuring ALL weapons!
              </Typography>
              <Typography variant="body1" paragraph>
                Listen to weapon sounds from {weaponSounds.length} different CS:GO weapons and guess which one it is.
                Each round gives you 12 randomized choices. You have 15 seconds per round.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                onClick={startGame}
                startIcon={<VolumeUp />}
              >
                Start Game
              </Button>
            </CardContent>
          </Card>
        </FullSizeCentered>
      </>
    );
  }

  return (
    <>
      <meta name="title" content="CS:GO Sound Guesser" />
      <FullSizeCentered>
        <Card sx={{ maxWidth: 800, width: '100%' }}>
          <CardContent>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" color="primary">
                CS:GO Sound Guesser
              </Typography>
              <Box>
                <Chip label={`Round ${totalRounds + 1}/10`} sx={{ mr: 1 }} />
                <Chip label={`Score: ${score}/${totalRounds}`} color="primary" />
              </Box>
            </Box>

            {/* Timer */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" gutterBottom>
                Time remaining: {timeLeft}s
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(timeLeft / 15) * 100} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            {/* Sound Player */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Listen to the weapon sound:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={playSound}
                  disabled={isPlaying || showResult}
                  size="large"
                >
                  Play Sound
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Stop />}
                  onClick={stopSound}
                  disabled={!isPlaying}
                  size="large"
                >
                  Stop
                </Button>
              </Box>
            </Box>

            {/* Result */}
            {showResult && (
              <Alert 
                severity={isCorrect ? "success" : "error"} 
                sx={{ mb: 3 }}
              >
                {isCorrect 
                  ? `Correct! It was ${currentWeapon}` 
                  : `Wrong! It was ${currentWeapon}${selectedAnswer ? `, you selected ${selectedAnswer}` : ''}`
                }
              </Alert>
            )}

            {/* Answer Options */}
            <Typography variant="h6" gutterBottom>
              Which weapon is this?
            </Typography>
            <TextField
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search weapons..."
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={2}>
              {currentChoices.filter(weapon => weapon.toLowerCase().includes(searchFilter.toLowerCase())).map((weapon) => (
                <Grid item xs={6} sm={4} md={3} key={weapon}>
                  <Button
                    variant={selectedAnswer === weapon ? "contained" : "outlined"}
                    fullWidth
                    onClick={() => handleAnswer(weapon)}
                    disabled={showResult}
                    sx={{ height: 48, fontSize: '0.875rem' }}
                  >
                    {weapon}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {/* Controls */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button 
                variant="text" 
                onClick={resetGame}
                color="secondary"
              >
                End Game
              </Button>
            </Box>
          </CardContent>
        </Card>
      </FullSizeCentered>
    </>
  );
}

export default Welcome;
