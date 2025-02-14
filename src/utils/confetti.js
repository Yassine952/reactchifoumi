import confetti from 'canvas-confetti';

export const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 170,
    origin: { x: 0.65, y: 0.6 },
  });
  confetti({
    particleCount: 150,
    spread: 170,
    origin: { x: 0.35, y: 0.6 },
  });
};
