const leaves = [
  [[158, 320, -58], [160, 321, 52]],
  [[100, 268, -45], [113, 278, 18], [218, 258, 42], [208, 274, -12]],
  [[86, 212, -48], [107, 217, 12], [232, 191, 45], [208, 212, -16]],
  [[106, 148, -50], [127, 167, 5], [217, 136, 42], [194, 164, -10]],
  [[144, 94, -32], [166, 85, 30], [69, 178, -46], [249, 155, 52], [119, 110, -26], [195, 106, 31]],
];

function Leaf({ x, y, angle, shade }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path className={`tree-leaf tree-leaf-${shade}`} d="M0 0C-23-9-26-33-8-49C15-39 25-16 0 0Z" />
      <path className="tree-leaf-vein" d="M0 0Q-2-20-8-42" />
    </g>
  );
}

export default function HistoryTree({ stage }) {
  return (
    <svg className="history-tree-svg" viewBox="0 0 320 430" aria-hidden="true" focusable="false">
      <ellipse className="tree-halo" cx="160" cy="205" rx="145" ry="174" />
      <ellipse className="tree-ground" cx="160" cy="371" rx="103" ry="13" />
      <path className="tree-soil" d="M57 368Q105 357 160 365T265 366" />
      <g className={`tree-growth-layer tree-roots${stage >= 1 ? ' is-grown' : ''}`}>
        <path d="M160 362Q159 383 140 395M158 378Q136 376 119 388M160 374Q180 376 195 391M157 389L159 405M139 395L125 399M180 384L185 404" />
      </g>
      <path className="tree-trunk" d="M160 365C150 313 167 295 158 248S170 173 159 90" pathLength="1" style={{ strokeDashoffset: [1, .84, .55, .3, .09, 0][stage] }} />
      <g className={`tree-seeds${stage === 0 ? ' is-seed-stage' : ''}`}>
        <path d="M126 360C105 361 104 341 123 330C144 335 146 354 126 360Z" />
        <path d="M161 364C142 357 148 338 167 331C185 344 183 361 161 364Z" />
        <path d="M194 361C181 349 190 334 209 336C219 356 211 367 194 361Z" />
        <path className="tree-seed-seam" d="M116 351L132 339M159 351L170 340M198 354L205 343" />
      </g>
      {[
        '',
        'M158 311Q130 289 99 268M158 299Q194 292 219 258',
        'M160 252Q114 245 86 212M160 236Q210 231 232 191',
        'M161 193Q126 190 106 148M164 180Q204 173 217 136',
        'M160 131Q140 119 144 94M161 110L166 85M104 225Q80 208 69 178M226 205Q250 184 249 155M137 179Q117 151 119 110M180 162Q196 135 195 106',
      ].map((branch, index) => (
        <g key={index} className={`tree-growth-layer${stage >= index + 1 ? ' is-grown' : ''}`}>
          {branch && <path className="tree-branch" d={branch} />}
          {leaves[index].map(([x, y, angle], leafIndex) => <Leaf key={leafIndex} x={x} y={y} angle={angle} shade={(index + leafIndex) % 3} />)}
        </g>
      ))}
      <g className={`tree-growth-layer${stage === 5 ? ' is-grown' : ''}`}>
        <circle className="tree-fruit" cx="105" cy="230" r="7" />
        <circle className="tree-fruit" cx="215" cy="213" r="6" />
        <circle className="tree-fruit" cx="181" cy="123" r="6" />
      </g>
    </svg>
  );
}
