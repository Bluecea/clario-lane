import Confetti from "react-confetti-boom";

const colors = [
  "#1E90FF",
  "#FF6B6B",
  "#FFD166",
  "#06D6A0",
  "#8338EC",
  "#118AB2",
  "#EF476F",
  "#073B4C",
  "#F8F9FA",
  "#2B2D42",
];

export const ConfettiComponent = ({
  particleCount,
  effectCount = 2,
}: {
  particleCount: number;
  effectCount?: number;
}) => {
  return (
    <Confetti
      mode="boom"
      spreadDeg={270}
      deg={20}
      launchSpeed={1}
      effectCount={effectCount}
      effectInterval={1000}
      colors={colors}
      particleCount={particleCount}
    />
  );
};
