import { useId, useState } from "react";

/** Responsive SVG area/line chart with two series. Pure SVG, no chart library needed. */
export function GrowthChart({ labels, newSeries, activeSeries, height = 220 }) {
  const gid = useId();
  const [hover, setHover] = useState(null);
  const W = 560, H = height, padL = 36, padR = 10, padT = 10, padB = 24;
  const max = Math.max(...newSeries, ...activeSeries);
  const top = Math.ceil(max / 500) * 500 || 500;
  const x = (i) => padL + (i * (W - padL - padR)) / (labels.length - 1);
  const y = (v) => padT + (1 - v / top) * (H - padT - padB);
  const line = (s) => s.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = (s) => `${line(s)} L${x(s.length - 1)},${H - padB} L${x(0)},${H - padB} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(top * t));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Growth over time" onMouseLeave={() => setHover(null)}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="currentColor" className="text-outline-variant" strokeDasharray="3 4" opacity="0.7" />
          <text x={padL - 6} y={y(t) + 3} textAnchor="end" className="fill-outline" fontSize="10">{t >= 1000 ? `${t / 1000}K` : t}</text>
        </g>
      ))}
      {labels.map((l, i) => (
        <text key={l} x={x(i)} y={H - 6} textAnchor="middle" className="fill-outline" fontSize="10">{l}</text>
      ))}
      <path d={area(newSeries)} fill={`url(#${gid})`} />
      <path d={line(newSeries)} fill="none" stroke="#4f46e5" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      <path d={line(activeSeries)} fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
      {labels.map((l, i) => (
        <rect key={l} x={x(i) - 20} y={padT} width="40" height={H - padT - padB} fill="transparent" onMouseEnter={() => setHover(i)} />
      ))}
      {hover !== null && (
        <g pointerEvents="none">
          <line x1={x(hover)} x2={x(hover)} y1={padT} y2={H - padB} stroke="#4f46e5" opacity="0.3" />
          <circle cx={x(hover)} cy={y(newSeries[hover])} r="4" fill="#4f46e5" stroke="white" strokeWidth="2" />
          <circle cx={x(hover)} cy={y(activeSeries[hover])} r="4" fill="#a78bfa" stroke="white" strokeWidth="2" />
          <g transform={`translate(${Math.min(x(hover) + 8, W - 112)},${padT + 4})`}>
            <rect width="104" height="42" rx="6" className="fill-inverse-surface" />
            <text x="8" y="16" fontSize="10" className="fill-inverse-on-surface" fontWeight="600">{labels[hover]}</text>
            <text x="8" y="30" fontSize="10" className="fill-inverse-on-surface">New {newSeries[hover].toLocaleString()} · Active {activeSeries[hover].toLocaleString()}</text>
          </g>
        </g>
      )}
    </svg>
  );
}

/** SVG donut with a total in the middle. */
export function Donut({ data, size = 170, thickness = 26, centerLabel = "Total" }) {
  const total = data.reduce((a, d) => a + d.value, 0);
  const r = (size - thickness) / 2, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label="Content distribution" className="shrink-0">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((d) => {
          const len = (d.value / total) * c;
          const el = <circle key={d.label} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color} strokeWidth={thickness} strokeDasharray={`${Math.max(len - 2, 0)} ${c - Math.max(len - 2, 0)}`} strokeDashoffset={-offset} />;
          offset += len;
          return el;
        })}
      </g>
      <text x="50%" y="48%" textAnchor="middle" className="fill-on-surface" fontSize="22" fontWeight="700">{total.toLocaleString()}</text>
      <text x="50%" y="60%" textAnchor="middle" className="fill-outline" fontSize="10">{centerLabel}</text>
    </svg>
  );
}
