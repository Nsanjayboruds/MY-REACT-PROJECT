// Play a one-time sound
export const playSound = (src, volume = 1) => {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play();
};

// Play looping background music
export const playBackgroundMusic = (src, volume = 0.5) => {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = volume;
  audio.play();
  return audio; // So you can stop it later
};

// Stop a specific audio instance
export const stopAudio = (audio) => {
  if (audio && !audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }
};
