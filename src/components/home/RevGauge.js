// Tachometer dial for the home hero. The needle "blips" into the
// redline on load, then settles to a lazy idle (keyframes in
// tailwind.config.js). Pure SVG, rendered on the server.

const CX = 200;
const CY = 200;
const MAX_RPM = 12; // x1000
const START = -120; // degrees, 0 = straight up, clockwise positive
const SWEEP = 240;

function angleFor(value) {
  return START + (value / MAX_RPM) * SWEEP;
}

function point(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.sin(rad), CY - radius * Math.cos(rad)];
}

function arc(fromValue, toValue, radius) {
  const a1 = angleFor(fromValue);
  const a2 = angleFor(toValue);
  const [x1, y1] = point(a1, radius);
  const [x2, y2] = point(a2, radius);
  const largeArc = a2 - a1 > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
}

const TICKS = Array.from({ length: MAX_RPM * 4 + 1 }, (_, i) => i / 4);

export default function RevGauge({ className = "" }) {
  return (
    <div className={`relative aspect-square ${className}`}>
      {/* Glow behind the dial */}
      <div className="absolute inset-[12%] rounded-full bg-throttle-orange/25 blur-[80px]" aria-hidden="true" />

      <svg viewBox="0 0 400 400" className="relative h-full w-full" role="img" aria-label="Rev counter hitting the redline">
        <defs>
          <radialGradient id="dial-face" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#1F1F1F" />
            <stop offset="100%" stopColor="#0A0A0A" />
          </radialGradient>
          <linearGradient id="needle" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#F58021" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F58021" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Bezel and face */}
        <circle cx={CX} cy={CY} r="196" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <circle cx={CX} cy={CY} r="186" fill="url(#dial-face)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Scale track + redline */}
        <path d={arc(0, MAX_RPM, 160)} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        <path d={arc(10, MAX_RPM, 160)} fill="none" stroke="#F58021" strokeWidth="10" filter="url(#glow)" />

        {/* Ticks */}
        {TICKS.map((value) => {
          const major = Number.isInteger(value);
          const half = !major && value % 0.5 === 0;
          const a = angleFor(value);
          const [x1, y1] = point(a, 172);
          const [x2, y2] = point(a, major ? 146 : half ? 156 : 162);
          const red = value >= 10;
          return (
            <line
              key={value}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={red ? "#F58021" : major ? "#FFFFFF" : "rgba(255,255,255,0.35)"}
              strokeWidth={major ? 3 : 1.5}
            />
          );
        })}

        {/* Numbers */}
        {Array.from({ length: MAX_RPM + 1 }, (_, v) => {
          const [x, y] = point(angleFor(v), 124);
          return (
            <text
              key={v}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-display"
              fontSize="26"
              fill={v >= 10 ? "#F58021" : "rgba(255,255,255,0.85)"}
            >
              {v}
            </text>
          );
        })}

        <text x={CX} y={CY + 62} textAnchor="middle" className="font-body" fontSize="10" letterSpacing="4" fill="rgba(255,255,255,0.45)">
          RPM × 1000
        </text>
        <text x={CX} y={CY + 100} textAnchor="middle" className="font-display" fontSize="40" letterSpacing="2" fill="#FFFFFF">
          PIT<tspan fill="#F58021">STOP</tspan>
        </text>

        {/* Needle */}
        <g className="animate-rev" style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <polygon points={`${CX - 5},${CY + 18} ${CX + 5},${CY + 18} ${CX + 1.5},${CY - 150} ${CX - 1.5},${CY - 150}`} fill="url(#needle)" filter="url(#glow)" />
        </g>
        <circle cx={CX} cy={CY} r="16" fill="#0A0A0A" stroke="#F58021" strokeWidth="3" />
        <circle cx={CX} cy={CY} r="5" fill="#F58021" />
      </svg>
    </div>
  );
}
