import { useId } from 'react';

function BotanicalLeaf({ x, y, angle = 0, scale = 1, light = false }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <path className={`botanical-leaf${light ? ' is-light' : ''}`} d="M0 0C-28-12-37-42-20-78C13-62 25-24 0 0Z" />
      <path className="botanical-vein" d="M0 0Q-4-32-20-78M-5-20L-23-35M-8-32L4-48M-12-46L-28-57M-15-58L-7-65" />
    </g>
  );
}

export function HistoryBranch({ side, compact = false }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`history-event-branch branch-${side}`} viewBox="0 0 640 260" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-limb`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" className="bark-shadow" />
          <stop offset=".65" className="bark-highlight" />
          <stop offset="1" className="bark-shadow" />
        </linearGradient>
        <linearGradient id={`${id}-join`} x1="0" y1="0" x2="0" y2="1">
          <stop offset=".66" stopColor="white" />
          <stop offset=".9" stopColor="black" />
        </linearGradient>
        <mask id={`${id}-limb-join`} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="260">
          <rect width="640" height="260" fill={`url(#${id}-join)`} />
        </mask>
      </defs>
      <g transform={side === 'left' ? 'translate(640 0) scale(-1 1)' : undefined}>
        <g transform={compact ? 'translate(160 70) scale(.5)' : undefined} mask={`url(#${id}-limb-join)`}>
          <path d="M321 232C322 187 302 163 267 154C210 141 175 153 126 131L45 110C103 120 133 137 174 133C218 126 258 131 289 145C323 162 335 194 334 230Z" fill={`url(#${id}-limb)`} />
          <path className="botanical-limb-grain" d="M327 222C325 179 302 160 271 150S207 140 176 141" />
          <path className="botanical-twig" d="M191 138Q177 103 157 85M124 130Q103 139 82 141M259 151Q247 129 241 111M320 140Q350 126 382 134" />
          <BotanicalLeaf x={128} y={131} angle={-65} scale={1.2} />
          <BotanicalLeaf x={164} y={97} angle={-22} scale={1.1} />
          <BotanicalLeaf x={85} y={140} angle={-117} scale={.88} light />
          <BotanicalLeaf x={242} y={114} angle={28} scale={.88} light />
        </g>
      </g>
    </svg>
  );
}

const mainRoots = [
  'M367 43C349 116 274 134 221 155S111 203 27 227C124 213 184 184 236 174S350 146 381 66Z',
  'M364 66C340 133 313 159 269 201S195 283 115 317C201 292 248 243 285 220S360 158 385 86Z',
  'M372 77C362 140 335 194 330 237S285 323 259 362C306 329 342 288 347 251S383 167 392 103Z',
  'M377 98C386 161 370 210 379 253S399 324 387 376C410 331 399 291 395 253S408 168 395 102Z',
  'M390 58C419 119 469 143 523 168S632 205 734 226C642 218 582 206 518 187S418 146 378 78Z',
  'M393 71C426 124 447 175 487 206S559 263 623 302C550 271 508 252 471 220S414 145 375 91Z',
  'M391 85C410 152 413 185 434 231S483 316 521 358C475 329 445 289 420 244S399 153 376 99Z',
];

const fineRoots = [
  'M247 167Q203 224 157 238T63 282',
  'M179 195Q146 226 105 232T24 257',
  'M297 197Q252 255 205 267T138 297',
  'M269 228Q249 280 222 297L193 344',
  'M331 242Q313 282 302 314L299 366',
  'M348 185Q316 217 315 252L288 288',
  'M378 238Q353 274 359 310L344 376',
  'M392 282Q429 314 434 358L458 381',
  'M414 178Q447 224 476 236T532 264',
  'M468 160Q525 221 580 242L657 261',
  'M563 198Q615 226 656 230T742 261',
  'M488 227Q509 280 552 309L576 352',
  'M521 265Q565 282 592 323L621 345',
  'M154 239L116 273L74 295M117 272L93 316',
  'M230 284L242 313L228 356M242 313L273 334',
  'M358 305L330 339L317 382M351 326L364 366',
  'M435 280L420 329L433 373M420 329L399 354',
  'M581 243L628 291L685 312M628 291L644 329',
  'M648 231L685 255L731 272M694 259L711 292',
  'M105 233L63 248L36 278M63 248L18 252',
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
      <svg className="history-tree-trunk" viewBox="0 0 80 1000" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id={`${id}-bark`}>
            <stop offset="0" className="bark-shadow" />
            <stop offset=".46" className="bark-highlight" />
            <stop offset="1" className="bark-shadow" />
          </linearGradient>
        </defs>
        <path d="M34 0C20 128 37 216 25 326S17 492 33 610S42 822 4 1000H77C50 813 70 738 59 608S42 470 54 323S48 119 46 0Z" fill={`url(#${id}-bark)`} />
        <path className="botanical-bark-grain" d="M38 12Q28 133 35 239T32 455T44 694T25 996M44 115Q47 242 42 321T42 560M48 649Q56 784 50 934M31 770Q27 910 14 998M54 843L62 999" />
        <path className="botanical-bark-highlight" d="M39 77Q34 185 40 270M30 358Q26 455 37 551M46 708Q47 814 41 909" />
      </svg>
      <svg className="history-tree-roots" viewBox="0 0 760 390" focusable="false">
        <ellipse className="botanical-root-ground" cx="380" cy="296" rx="350" ry="82" />
        <path className="botanical-root-base" d="M338 0C346 55 335 94 291 131Q349 117 369 91Q356 152 339 187Q378 156 384 114Q406 157 439 177Q410 127 405 92Q438 131 477 143C422 98 416 54 422 0Z" fill={`url(#${id}-bark)`} />
        {mainRoots.map(d => <path key={d} d={d} fill={`url(#${id}-bark)`} />)}
        {fineRoots.map((d, index) => <path key={d} className={`botanical-root${index > 12 ? ' root-fine' : ''}`} d={d} />)}
        <path className="botanical-root-grain" d="M359 18Q360 75 328 111M383 27Q372 98 350 152M400 18Q398 71 425 110M350 116Q297 155 238 166T83 209M412 118Q470 164 532 182T668 211M372 133Q349 224 310 291M401 125Q420 209 475 297" />
        <BotanicalLeaf x={217} y={203} angle={-38} scale={.62} light />
        <BotanicalLeaf x={594} y={221} angle={54} scale={.54} />
        <ellipse className="botanical-seed" cx="381" cy="81" rx="17" ry="29" transform="rotate(-8 381 81)" />
        <path className="botanical-seed-seam" d="M381 53Q366 81 381 109" />
      </svg>
    </div>
  );
}
