import ReactGA from 'react-ga4';

// Replace with your actual Google Analytics 4 Measurement ID
// You can get this from Google Analytics -> Admin -> Data Streams -> Web Stream Details
// Example: 'G-1234567890' (replace the X's with your actual ID)
const GA_MEASUREMENT_ID = 'G-TBDRJMFJ7F'; // TODO: Replace with your actual GA4 Measurement ID

export const initGA = () => {
  // Only initialize in production
  if (import.meta.env.PROD) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

export const trackPageView = (page: string) => {
  if (import.meta.env.PROD ) {
    ReactGA.send({ hitType: 'pageview', page });
  }
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (import.meta.env.PROD ) {
    ReactGA.event(eventName, parameters);
  }
};

// Game-specific tracking events
export const trackGameEvent = {
  startGame: (mode: string) => {
    trackEvent('game_start', {
      game_mode: mode,
    });
  },
  
  correctGuess: (weapon: string, mode: string, round: number) => {
    trackEvent('correct_guess', {
      weapon_name: weapon,
      game_mode: mode,
      round_number: round,
    });
  },
  
  incorrectGuess: (actualWeapon: string, guessedWeapon: string, mode: string, round: number) => {
    trackEvent('incorrect_guess', {
      actual_weapon: actualWeapon,
      guessed_weapon: guessedWeapon,
      game_mode: mode,
      round_number: round,
    });
  },
  
  gameComplete: (score: number, totalRounds: number, mode: string) => {
    trackEvent('game_complete', {
      final_score: score,
      total_rounds: totalRounds,
      accuracy: Math.round((score / totalRounds) * 100),
      game_mode: mode,
    });
  },
  
  playSound: (weapon: string, mode: string) => {
    trackEvent('play_sound', {
      weapon_name: weapon,
      game_mode: mode,
    });
  },
}; 