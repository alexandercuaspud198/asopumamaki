import { useId } from 'react';

function BotanicalLeaf({ x, y, angle = 0, scale = 1, light = false }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <path className={`botanical-leaf${light ? ' is-light' : ''}`} d="M0 0C-28-12-37-42-20-78C13-62 25-24 0 0Z" />
      <path className="botanical-vein" d="M0 0Q-4-32-20-78M-5-20L-23-35M-8-32L4-48M-12-46L-28-57M-15-58L-7-65" />
    </g>
  );
}

export function HistoryBranch({ side }) {
  return (
    <svg className={`history-event-branch branch-${side}`} viewBox="0 0 200 180" aria-hidden="true" focusable="false">
      <g transform={side === 'left' ? 'translate(200 0) scale(-1 1)' : undefined}>
        <path className="botanical-twig" d="M100 164Q94 120 58 85M100 118Q124 90 164 99M100 125Q116 73 135 57" />
        <BotanicalLeaf x={58} y={85} angle={-22} scale={.88} />
        <BotanicalLeaf x={132} y={64} angle={65} scale={.74} light />
      </g>
    </svg>
  );
}

const roots = [
  'M216 29Q209 78 170 100T105 144L43 160',
  'M220 30Q205 91 199 126T163 208',
  'M223 35Q236 83 266 105T328 137L391 160',
  'M218 51Q227 109 244 137T264 215',
  'M214 63Q190 97 152 112T72 131L25 146',
  'M222 67Q248 110 293 123T365 137L415 151',
  'M203 89Q170 137 130 153T80 197',
  'M237 99Q270 142 308 156T351 208',
  'M202 105Q208 152 195 181L184 227',
  'M223 95Q214 145 230 183L239 230',
  'M171 99L152 140L125 181L97 211',
  'M268 108L277 153L296 195L320 221',
  'M135 134L111 161L108 190',
  'M111 143L71 168L47 193',
  'M91 128L61 151L31 157',
  'M292 124L320 164L355 181',
  'M328 138L351 162L390 179',
  'M167 162L157 193L128 221',
  'M195 177L213 208L208 237',
  'M243 139L252 170L284 193',
  'M227 177L218 209L223 239',
];

export default function HistoryTree() {
  const id = useId().replace(/:/g, '');
  return (
    <div className="history-botanical-tree" aria-hidden="true">
      <svg className="history-tree-crown" viewBox="0 0 320 270" focusable="false">
        <defs>
          <radialGradient id={`${id}-fruit`} cx="30%" cy="25%" r="75%">
            <stop offset="0" className="fruit-highlight" />
            <stop offset=".45" className="fruit-middle" />
            <stop offset="1" className="fruit-shadow" />
          </radialGradient>
        </defs>
        <path className="botanical-crown-stem" d="M162 272Q166 224 158 174T151 87M158 199Q128 140 76 137M158 157Q199 129 210 85M157 127Q138 94 123 71M157 108Q179 65 179 43M102 146Q59 154 35 167" />
        <BotanicalLeaf x={125} y={83} angle={-25} scale={.97} />
        <BotanicalLeaf x={179} y={51} angle={43} scale={.92} light />
        <BotanicalLeaf x={80} y={137} angle={-25} scale={.85} />
        <BotanicalLeaf x={52} y={156} angle={-92} scale={.95} light />
        <BotanicalLeaf x={204} y={100} angle={47} scale={.9} />
        <BotanicalLeaf x={170} y={205} angle={68} scale={.85} light />
        <path className="botanical-fruit-stem" d="M151 98L142 121M158 132L174 151M156 152L145 168M121 139L105 166M111 145L92 159" />
        {[[142, 125, 12], [176, 157, 13], [146, 172, 13], [105, 172, 12], [90, 161, 11]].map(([cx, cy, r]) => (
          <ellipse key={cx} cx={cx} cy={cy} rx={r} ry={r * 1.13} fill={`url(#${id}-fruit)`} />
        ))}
      </svg>
      <svg className="history-tree-trunk" viewBox="0 0 40 1000" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id={`${id}-bark`}>
            <stop offset="0" className="bark-shadow" />
            <stop offset=".46" className="bark-highlight" />
            <stop offset="1" className="bark-shadow" />
          </linearGradient>
        </defs>
        <path d="M19 0C14 180 23 320 17 480S24 760 6 1000H36C20 777 29 598 25 432S24 156 23 0Z" fill={`url(#${id}-bark)`} />
        <path className="botanical-bark-grain" d="M20 18Q18 191 20 299T20 615T17 987M24 337Q21 412 24 487M24 657Q23 809 28 932M15 819L13 963" />
      </svg>
      <svg className="history-tree-roots" viewBox="0 0 440 250" focusable="false">
        <path className="botanical-root-base" d="M210 0Q216 41 192 73L167 102Q199 91 213 70Q208 111 197 139Q221 120 221 88Q229 112 250 133Q240 98 232 66Q251 93 280 105L245 65Q226 39 230 0Z" />
        {roots.map((d, index) => <path key={d} className={`botanical-root root-weight-${Math.min(2, Math.floor(index / 5))}`} d={d} />)}
        <ellipse className="botanical-seed" cx="219" cy="78" rx="12" ry="22" transform="rotate(-8 219 78)" />
        <path className="botanical-seed-seam" d="M219 57Q209 78 219 99" />
      </svg>
    </div>
  );
}
