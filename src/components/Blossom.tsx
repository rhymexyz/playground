type BlossomProps = {
  color: string;
  radius: number;
};

const STAR_COUNT = 8;

// Darken a hex color slightly for glow
function darken(hex: string, amount = 40): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (n >> 16) - amount);
  const g = Math.max(0, ((n >> 8) & 0xff) - amount);
  const b = Math.max(0, (n & 0xff) - amount);
  return `rgb(${r},${g},${b})`;
}

export default function Blossom({ color, radius }: BlossomProps) {
  const glowColor = darken(color, 30);

  return (
    <>
      <style>{`
        @keyframes atlas-pulse-1 {
          0%   { r: ${radius + 1}px; opacity: 0.75; stroke-width: 2px; }
          100% { r: ${radius + 38}px; opacity: 0;   stroke-width: 0.5px; }
        }
        @keyframes atlas-pulse-2 {
          0%   { r: ${radius + 1}px; opacity: 0.5;  stroke-width: 1.5px; }
          100% { r: ${radius + 28}px; opacity: 0;   stroke-width: 0.5px; }
        }
        @keyframes atlas-star-out {
          0%   { transform: translate(0px, 0px) scale(0.2); opacity: 0; }
          25%  { opacity: 1; }
          70%  { opacity: 0.8; }
          100% { opacity: 0; }
        }
        .atlas-pulse-ring-1 { animation: atlas-pulse-1 1.6s ease-out infinite; }
        .atlas-pulse-ring-2 { animation: atlas-pulse-2 1.6s ease-out infinite 0.55s; }
        ${Array.from({ length: STAR_COUNT }, (_, i) => {
          const angle = (i / STAR_COUNT) * Math.PI * 2 - Math.PI / 2;
          const dist = radius + 22 + (i % 2 === 0 ? 0 : 8);
          const tx = Math.cos(angle) * dist;
          const ty = Math.sin(angle) * dist;
          const delay = (i / STAR_COUNT) * 0.28;
          return `
            @keyframes atlas-star-${i} {
              0%   { transform: translate(0px, 0px) scale(0.1); opacity: 0; }
              20%  { opacity: 1; }
              75%  { transform: translate(${tx}px, ${ty}px) scale(1); opacity: 0.9; }
              100% { transform: translate(${tx * 1.25}px, ${ty * 1.25}px) scale(0.5); opacity: 0; }
            }
            .atlas-star-${i} {
              animation: atlas-star-${i} 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards ${delay}s;
              transform-box: fill-box;
              transform-origin: center;
            }
          `;
        }).join("")}
      `}</style>

      {/* Glow disc behind planet */}
      <circle
        cx={0} cy={0}
        r={radius + 8}
        fill={color}
        opacity={0.35}
        style={{ filter: `blur(8px)` }}
      />

      {/* Two pulse rings */}
      <circle className="atlas-pulse-ring-1" cx={0} cy={0} r={radius + 1}
        fill="none" stroke={glowColor} />
      <circle className="atlas-pulse-ring-2" cx={0} cy={0} r={radius + 1}
        fill="none" stroke={color} />

      {/* Starburst dots */}
      {Array.from({ length: STAR_COUNT }, (_, i) => {
        const isAlt = i % 2 === 0;
        return (
          <circle
            key={i}
            className={`atlas-star-${i}`}
            cx={0} cy={0}
            r={isAlt ? 3.5 : 2.2}
            fill={isAlt ? glowColor : color}
            opacity={0}
          />
        );
      })}
    </>
  );
}
