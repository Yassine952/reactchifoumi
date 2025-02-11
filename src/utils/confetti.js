import confetti from 'canvas-confetti';

export const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 170,
    origin: { y: 0.6 },
  });
};
