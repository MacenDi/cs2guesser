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



// Define weapon sounds data - ONLY WEAPONS WITH ACTUAL SOUND FILES
const weaponSounds = [
  // Rifles
  { name: 'AK-47', folder: 'ak47', soundFiles: ['ak47_01.wav', 'ak47_02.wav', 'ak47_03.wav', 'ak47_04.wav', 'ak47-1.wav'], distantFiles: ['ak47_distant.wav'], drawFiles: ['ak47_draw.wav'] },
  { name: 'M4A1-S', folder: 'm4a1', soundFiles: ['m4a1_silencer_01.wav'], distantFiles: ['m4a1_distant_01.wav'], drawFiles: ['m4a1_draw.wav'] },
  { name: 'FAMAS', folder: 'famas', soundFiles: ['famas_01.wav', 'famas_02.wav', 'famas_03.wav'], distantFiles: ['famas_distant_01.wav'], drawFiles: ['famas_draw.wav'] },
  { name: 'Galil AR', folder: 'galilar', soundFiles: ['galil_01.wav', 'galil_02.wav', 'galil_03.wav', 'galil_04.wav'], distantFiles: ['galil_distant.wav'], drawFiles: ['galil_draw.wav'] },
  { name: 'AUG', folder: 'aug', soundFiles: ['aug_01.wav', 'aug_02.wav', 'aug_03.wav', 'aug_04.wav'], distantFiles: ['aug_distant.wav'], drawFiles: ['aug_draw.wav'] },
  { name: 'SG 553', folder: 'sg556', soundFiles: ['sg556_01.wav', 'sg556_02.wav', 'sg556_03.wav', 'sg556_04.wav'], distantFiles: ['sg556_distant.wav'], drawFiles: ['sg556_draw.wav'] },
  
  // Sniper Rifles
  { name: 'AWP', folder: 'awp', soundFiles: ['awp_01.wav', 'awp_02.wav'], distantFiles: ['awp_distant.wav'], drawFiles: ['awp_draw.wav'] },
  { name: 'SSG 08', folder: 'ssg08', soundFiles: ['ssg08_01.wav'], distantFiles: ['ssg08_distant.wav'], drawFiles: ['ssg08_draw.wav'] },
  { name: 'SCAR-20', folder: 'scar20', soundFiles: ['scar20_01.wav', 'scar20_02.wav', 'scar20_03.wav'], distantFiles: ['scar20_distant_01.wav', 'scar20_distant_02.wav', 'scar20_distant_03.wav'], drawFiles: ['scar20_draw.wav'] },
  { name: 'G3SG1', folder: 'g3sg1', soundFiles: ['g3sg1_01.wav', 'g3sg1_02.wav', 'g3sg1_03.wav'], distantFiles: ['g3sg1_distant_01.wav', 'g3sg1_distant_02.wav', 'g3sg1_distant_03.wav'], drawFiles: ['g3sg1_draw.wav'] },
  
  // Pistols
  { name: 'Glock-18', folder: 'glock18', soundFiles: ['glock_01.wav', 'glock_02.wav'], distantFiles: ['glock18-1-distant.wav'], drawFiles: ['glock_draw.wav'] },
  { name: 'USP-S', folder: 'usp', soundFiles: ['usp_01.wav', 'usp_02.wav', 'usp_03.wav'], distantFiles: [], drawFiles: ['usp_draw.wav'] },
  { name: 'P2000', folder: 'hkp2000', soundFiles: ['hkp2000_01.wav', 'hkp2000_02.wav', 'hkp2000_03.wav'], distantFiles: ['hkp2000-1-distant.wav'], drawFiles: ['hkp2000_draw.wav'] },
  { name: 'Dual Berettas', folder: 'elite', soundFiles: ['elites_01.wav', 'elites_02.wav', 'elites_03.wav', 'elites_04.wav'], distantFiles: ['elite-1-distant.wav'], drawFiles: ['elite_draw.wav'] },
  { name: 'P250', folder: 'p250', soundFiles: ['p250_01.wav'], distantFiles: ['p250_distant_01.wav'], drawFiles: ['p250_draw.wav'] },
  { name: 'Tec-9', folder: 'tec9', soundFiles: ['tec9_02.wav'], distantFiles: ['tec9_distant_01.wav'], drawFiles: ['tec9_draw.wav'] },
  { name: 'CZ75-Auto', folder: 'cz75a', soundFiles: ['cz75_01.wav', 'cz75_02.wav', 'cz75_03.wav'], distantFiles: ['cz75a-1-distant.wav'], drawFiles: [] },
  { name: 'Five-SeveN', folder: 'fiveseven', soundFiles: ['fiveseven_01.wav'], distantFiles: ['fiveseven-1-distant.wav'], drawFiles: ['fiveseven_draw.wav'] },
  { name: 'Desert Eagle', folder: 'deagle', soundFiles: ['deagle_01.wav', 'deagle_02.wav'], distantFiles: ['deagle-1-distant.wav'], drawFiles: ['de_draw.wav'] },
  { name: 'R8 Revolver', folder: 'revolver', soundFiles: ['revolver-1_01.wav'], distantFiles: ['revolver-1_distant.wav'], drawFiles: ['revolver_draw.wav'] },
  
  // SMGs
  { name: 'MAC-10', folder: 'mac10', soundFiles: ['mac10_01.wav', 'mac10_02.wav'], distantFiles: ['mac10-1-distant.wav'], drawFiles: ['mac10_draw.wav'] },
  { name: 'MP9', folder: 'mp9', soundFiles: ['mp9_01.wav', 'mp9_02.wav', 'mp9_03.wav', 'mp9_04.wav'], distantFiles: ['mp9-1-distant.wav'], drawFiles: ['mp9_draw.wav'] },
  { name: 'MP7', folder: 'mp7', soundFiles: ['mp7_01.wav', 'mp7_02.wav', 'mp7_03.wav', 'mp7_04.wav'], distantFiles: ['mp7-1-distant.wav'], drawFiles: ['mp7_draw.wav'] },
  { name: 'MP5-SD', folder: 'mp5', soundFiles: ['mp5_01.wav'], distantFiles: [], drawFiles: ['mp5_draw.wav'] },
  { name: 'UMP-45', folder: 'ump45', soundFiles: ['ump45_02.wav'], distantFiles: ['ump45-1-distant.wav'], drawFiles: ['ump45_draw.wav'] },
  { name: 'P90', folder: 'p90', soundFiles: ['p90_01.wav', 'p90_02.wav'], distantFiles: ['p90-1-distant.wav'], drawFiles: ['p90_draw.wav'] },
  { name: 'PP-Bizon', folder: 'bizon', soundFiles: ['bizon_01.wav', 'bizon_02.wav'], distantFiles: ['bizon-1-distant.wav'], drawFiles: ['bizon_draw.wav'] },
  
  // Shotguns
  { name: 'Nova', folder: 'nova', soundFiles: ['nova-1.wav'], distantFiles: ['nova-1-distant.wav'], drawFiles: ['nova_draw.wav'] },
  { name: 'XM1014', folder: 'xm1014', soundFiles: ['xm1014-1.wav'], distantFiles: ['xm1014-1-distant.wav'], drawFiles: ['xm1014_draw.wav'] },
  { name: 'Sawed-Off', folder: 'sawedoff', soundFiles: ['sawedoff-1.wav'], distantFiles: ['sawedoff-1-distant.wav'], drawFiles: ['sawedoff_draw.wav'] },
  { name: 'MAG-7', folder: 'mag7', soundFiles: ['mag7_01.wav', 'mag7_02.wav'], distantFiles: ['mag7_distant_01.wav', 'mag7_distant_02.wav'], drawFiles: ['mag7_draw.wav'] },
  
  // Machine Guns
  { name: 'M249', folder: 'm249', soundFiles: ['m249-1.wav'], distantFiles: ['m249-1-distant.wav'], drawFiles: ['m249_draw.wav'] },
  { name: 'Negev', folder: 'negev', soundFiles: ['negev_01.wav', 'negev_02.wav'], distantFiles: ['negev-1-distant.wav'], drawFiles: ['negev_draw.wav'] },
  
  // Equipment/Utility
  { name: 'Taser', folder: 'taser', soundFiles: ['taser_hit.wav', 'taser_shoot_birthday.wav'], distantFiles: [], drawFiles: ['taser_draw.wav'] },
  { name: 'C4', folder: 'c4', soundFiles: ['c4_explode1.wav', 'c4_beep2.wav', 'c4_beep3.wav'], distantFiles: [], drawFiles: ['c4_draw.wav'] },
];

// All possible weapon names for answer choices
const allWeaponNames = weaponSounds.map(weapon => weapon.name);

type GameMode = 'normal' | 'distant' | 'draw';

function Welcome() {
  const [currentWeapon, setCurrentWeapon] = useState<string>('');
  const [currentSound, setCurrentSound] = useState<string>('');
  const [score, setScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [modeSelected, setModeSelected] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('normal');
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
    // Filter weapons based on game mode
    const availableWeapons = gameMode === 'distant' 
      ? weaponSounds.filter(weapon => weapon.distantFiles.length > 0)
      : gameMode === 'draw'
      ? weaponSounds.filter(weapon => weapon.drawFiles.length > 0)
      : weaponSounds;
    
    // Select a random weapon from available weapons
    const weapon = availableWeapons[Math.floor(Math.random() * availableWeapons.length)];
    const soundFiles = gameMode === 'distant' 
      ? weapon.distantFiles 
      : gameMode === 'draw'
      ? weapon.drawFiles
      : weapon.soundFiles;
    const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];
    
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
    setModeSelected(false);
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
        <meta name="title" content="CS2 Sound Guesser" />
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: { xs: 1, sm: 2 }
        }}>
          <Card sx={{ 
            maxWidth: 600, 
            width: '100%', 
            textAlign: 'center',
            maxHeight: { xs: 'calc(100vh - 16px)', sm: 'calc(100vh - 32px)' },
            overflow: 'auto'
          }}>
            <CardContent>
              <Typography variant="h3" gutterBottom color="primary">
                Game Over!
              </Typography>
              <Typography variant="h6" gutterBottom color="text.secondary">
                {gameMode === 'distant' ? 'Distant Mode' : gameMode === 'draw' ? 'Draw Mode' : 'Normal Mode'}
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
        </Box>
      </>
    );
  }

  if (!modeSelected) {
    return (
      <>
        <meta name="title" content="CS2 Sound Guesser" />
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: { xs: 1, sm: 2 }
        }}>
          <Card sx={{ 
            maxWidth: 600, 
            width: '100%', 
            textAlign: 'center',
            maxHeight: { xs: 'calc(100vh - 16px)', sm: 'calc(100vh - 32px)' },
            overflow: 'auto'
          }}>
            <CardContent>
              <Typography variant="h3" gutterBottom color="primary">
                CS2 Sound Guesser
              </Typography>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Choose your game mode
              </Typography>
              <Typography variant="body1" paragraph>
                Select the type of weapon sounds you want to guess:
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => {
                    setGameMode('normal');
                    setModeSelected(true);
                  }}
                  startIcon={<VolumeUp />}
                  sx={{ py: 2 }}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6">Normal Sounds</Typography>
                    <Typography variant="body2">Close-range weapon sounds</Typography>
                  </Box>
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={() => {
                    setGameMode('distant');
                    setModeSelected(true);
                  }}
                  startIcon={<VolumeUp />}
                  sx={{ py: 2 }}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6">Distant Sounds</Typography>
                    <Typography variant="body2">Far-away weapon sounds - More challenging!</Typography>
                  </Box>
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={() => {
                    setGameMode('draw');
                    setModeSelected(true);
                  }}
                  startIcon={<VolumeUp />}
                  sx={{ py: 2 }}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6">Draw Sounds</Typography>
                    <Typography variant="body2">Weapon drawing/equipping sounds - Very challenging!</Typography>
                  </Box>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </>
    );
  }

  if (!gameStarted) {
    const availableWeapons = gameMode === 'distant' 
      ? weaponSounds.filter(weapon => weapon.distantFiles.length > 0)
      : gameMode === 'draw'
      ? weaponSounds.filter(weapon => weapon.drawFiles.length > 0)
      : weaponSounds;
      
    const getModeDisplayName = () => {
      switch(gameMode) {
        case 'distant': return 'Distant Mode';
        case 'draw': return 'Draw Mode';
        default: return 'Normal Mode';
      }
    };
    
    const getModeDescription = () => {
      switch(gameMode) {
        case 'distant': return 'distant';
        case 'draw': return 'weapon draw';
        default: return 'normal';
      }
    };
      
    return (
      <>
        <meta name="title" content="CS2 Sound Guesser" />
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: { xs: 1, sm: 2 }
        }}>
          <Card sx={{ 
            maxWidth: 600, 
            width: '100%', 
            textAlign: 'center',
            maxHeight: { xs: 'calc(100vh - 16px)', sm: 'calc(100vh - 32px)' },
            overflow: 'auto'
          }}>
            <CardContent>
              <Typography variant="h3" gutterBottom color="primary">
                CS2 Sound Guesser
              </Typography>
              <Typography variant="h6" gutterBottom color="text.secondary">
                {getModeDisplayName()}
              </Typography>
              <Typography variant="body1" paragraph>
                Listen to {getModeDescription()} sounds from {availableWeapons.length} different CS2 weapons and guess which one it is.
                Each round gives you 12 randomized choices. You have 15 seconds per round.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={startGame}
                  startIcon={<VolumeUp />}
                >
                  Start Game
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={() => setModeSelected(false)}
                >
                  Change Mode
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </>
    );
  }

  return (
    <>
      <meta name="title" content="CS2 Sound Guesser" />
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: { xs: 1, sm: 2 }
      }}>
        <Card sx={{ 
          maxWidth: 800, 
          width: '100%',
          maxHeight: { xs: 'calc(100vh - 16px)', sm: 'calc(100vh - 32px)' },
          overflow: 'auto'
        }}>
          <CardContent>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h4" color="primary">
                  CS2 Sound Guesser
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {gameMode === 'distant' ? 'Distant Mode' : gameMode === 'draw' ? 'Draw Mode' : 'Normal Mode'}
                </Typography>
              </Box>
              <Box>
                <Chip label={`Round ${totalRounds + 1}/10`} sx={{ mr: 1 }} />
                <Chip label={`Score: ${score}/${totalRounds + 1}`} color="primary" />
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
                  disabled={showResult}
                  size="large"
                >
                  {isPlaying ? 'Play Again' : 'Play Sound'}
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
      </Box>
    </>
  );
}

export default Welcome;
