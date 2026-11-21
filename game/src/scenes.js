// Twin Scenes — the three scenes. Every picture is original art drawn here
// with plain SVG shapes: no copied images, no external assets.
// A scene is a shared base plus one difference entry per change. Each entry
// carries the art for panel A and panel B, and the marker spot (x, y, r)
// where the change lives, so the marker always sits on the real difference.
export const SCENES = [
  {
    id: 'kitchen',
    name: 'Sunny Kitchen',
    intro: 'A cosy kitchen, morning light, and Milo the cat guarding the table.',
    base: `
      <rect x="0" y="0" width="640" height="380" fill="#ffe8c2"/>
      <rect x="0" y="380" width="640" height="100" fill="#c98f5f"/>
      <line x1="0" y1="420" x2="640" y2="420" stroke="#a9764a" stroke-width="3"/>
      <line x1="0" y1="452" x2="640" y2="452" stroke="#a9764a" stroke-width="3"/>
      <rect x="60" y="40" width="180" height="140" fill="#8b5a2b" rx="6"/>
      <rect x="70" y="50" width="160" height="120" fill="#bfe3ff"/>
      <line x1="150" y1="50" x2="150" y2="170" stroke="#8b5a2b" stroke-width="6"/>
      <line x1="70" y1="110" x2="230" y2="110" stroke="#8b5a2b" stroke-width="6"/>
      <rect x="44" y="30" width="26" height="160" fill="#e07856" rx="8"/>
      <rect x="230" y="30" width="26" height="160" fill="#e07856" rx="8"/>
      <rect x="380" y="140" width="180" height="12" fill="#8b5a2b" rx="4"/>
      <rect x="400" y="96" width="34" height="44" fill="#7fb069" rx="6"/>
      <rect x="444" y="96" width="34" height="44" fill="#f2c14e" rx="6"/>
      <rect x="120" y="320" width="400" height="18" fill="#a06a35" rx="6"/>
      <rect x="140" y="338" width="16" height="62" fill="#7d4f24"/>
      <rect x="484" y="338" width="16" height="62" fill="#7d4f24"/>
      <ellipse cx="320" cy="442" rx="95" ry="24" fill="#e07856"/>
      <ellipse cx="100" cy="352" rx="52" ry="38" fill="#f2a541"/>
      <circle cx="92" cy="316" r="26" fill="#f2a541"/>
      <polygon points="76,296 84,272 96,294" fill="#f2a541"/>
      <polygon points="96,294 108,272 112,296" fill="#f2a541"/>
      <circle cx="84" cy="312" r="3" fill="#3a2a1a"/><circle cx="100" cy="312" r="3" fill="#3a2a1a"/>
      <path d="M86 324 Q92 329 98 324" stroke="#3a2a1a" stroke-width="2" fill="none"/>
      <path d="M60 318 L40 314 M60 326 L42 328" stroke="#3a2a1a" stroke-width="1.5"/>
      <circle cx="520" cy="70" r="34" fill="#fff" stroke="#8b5a2b" stroke-width="5"/>
      <circle cx="520" cy="70" r="4" fill="#3a2a1a"/>
      <rect x="470" y="180" width="80" height="60" fill="#8b5a2b" rx="4"/>
      <rect x="476" y="186" width="68" height="48" fill="#fdf6e3"/>
      <ellipse cx="320" cy="306" rx="52" ry="14" fill="#4a90d9"/>
      <ellipse cx="320" cy="300" rx="46" ry="12" fill="#6fb1e8"/>
      <path d="M196 300 L196 268 Q196 258 208 258 L226 258 Q238 258 238 268 L238 300 Z" fill="#5b7fa6"/>
      <rect x="204" y="246" width="26" height="14" fill="#3a2a1a" rx="4"/>
      <rect x="412" y="288" width="34" height="30" fill="#c0392b" rx="4"/>
      <path d="M446 294 Q462 294 462 303 Q462 312 446 312" stroke="#c0392b" stroke-width="5" fill="none"/>
      <rect x="500" y="296" width="40" height="26" fill="#e07856" rx="4"/>
      <polygon points="506,296 512,272 518,296" fill="#2f7d5b"/>
      <polygon points="518,296 528,268 538,296" fill="#2f7d5b"/>
      <polygon points="512,272 520,250 530,272" fill="#2f7d5b"/>
    `,
    diffs: [
      { id: 'clock', label: 'Clock hands', x: 520, y: 70, r: 34,
        a: '<line x1="520" y1="70" x2="520" y2="44" stroke="#3a2a1a" stroke-width="4"/><line x1="520" y1="70" x2="542" y2="70" stroke="#3a2a1a" stroke-width="4"/>',
        b: '<line x1="520" y1="70" x2="520" y2="92" stroke="#3a2a1a" stroke-width="4"/><line x1="520" y1="70" x2="498" y2="70" stroke="#3a2a1a" stroke-width="4"/>' },
      { id: 'tail', label: "Cat's tail", x: 148, y: 340, r: 26,
        a: '<path d="M148 350 Q168 330 160 306" stroke="#f2a541" stroke-width="9" fill="none" stroke-linecap="round"/>',
        b: '<path d="M148 352 Q166 366 150 382" stroke="#f2a541" stroke-width="9" fill="none" stroke-linecap="round"/>' },
      { id: 'apples', label: 'Apples in the bowl', x: 320, y: 288, r: 26,
        a: '<circle cx="302" cy="288" r="11" fill="#d33"/><circle cx="322" cy="284" r="11" fill="#d33"/><circle cx="340" cy="290" r="11" fill="#d33"/>',
        b: '<circle cx="306" cy="288" r="11" fill="#d33"/><circle cx="334" cy="288" r="11" fill="#d33"/>' },
      { id: 'steam', label: 'Kettle steam', x: 217, y: 234, r: 22,
        a: '<path d="M210 244 Q204 232 212 222 Q220 212 212 202" stroke="#cfd8dc" stroke-width="5" fill="none" stroke-linecap="round"/>',
        b: '' },
      { id: 'mug', label: 'Mug colour', x: 429, y: 303, r: 22,
        a: '<rect x="412" y="288" width="34" height="30" fill="#c0392b" rx="4"/><path d="M446 294 Q462 294 462 303 Q462 312 446 312" stroke="#c0392b" stroke-width="5" fill="none"/>',
        b: '<rect x="412" y="288" width="34" height="30" fill="#2471a3" rx="4"/><path d="M446 294 Q462 294 462 303 Q462 312 446 312" stroke="#2471a3" stroke-width="5" fill="none"/>' },
      { id: 'flower', label: 'Flower on the plant', x: 520, y: 252, r: 22,
        a: '<circle cx="520" cy="250" r="9" fill="#e75480"/><circle cx="520" cy="250" r="3.5" fill="#f2c14e"/>',
        b: '' },
      { id: 'sun', label: 'Sun in the window', x: 110, y: 80, r: 26,
        a: '<circle cx="110" cy="80" r="18" fill="#f2c14e"/><g stroke="#f2c14e" stroke-width="4"><line x1="110" y1="54" x2="110" y2="46"/><line x1="110" y1="106" x2="110" y2="114"/><line x1="84" y1="80" x2="76" y2="80"/><line x1="136" y1="80" x2="144" y2="80"/></g>',
        b: '<ellipse cx="104" cy="82" rx="22" ry="12" fill="#fff"/><ellipse cx="120" cy="74" rx="16" ry="10" fill="#fff"/>' },
      { id: 'picture', label: 'Picture on the wall', x: 510, y: 210, r: 24,
        a: '<circle cx="510" cy="206" r="12" fill="#f2a541"/><polygon points="500,196 504,186 508,196" fill="#f2a541"/><polygon points="512,196 516,186 520,196" fill="#f2a541"/>',
        b: '<ellipse cx="510" cy="210" rx="14" ry="8" fill="#4a90d9"/><polygon points="524,210 530,202 532,210" fill="#4a90d9"/>' },
      { id: 'rug', label: 'Rug stripes', x: 320, y: 442, r: 26,
        a: '<line x1="250" y1="428" x2="250" y2="456" stroke="#fff" stroke-width="5"/><line x1="320" y1="422" x2="320" y2="462" stroke="#fff" stroke-width="5"/><line x1="390" y1="428" x2="390" y2="456" stroke="#fff" stroke-width="5"/>',
        b: '<line x1="285" y1="424" x2="285" y2="460" stroke="#fff" stroke-width="5"/><line x1="355" y1="424" x2="355" y2="460" stroke="#fff" stroke-width="5"/>' },
      { id: 'jar', label: 'Jar lid', x: 461, y: 92, r: 20,
        a: '<rect x="444" y="88" width="34" height="10" fill="#8b5a2b" rx="3"/>',
        b: '' },
    ],
  },
  {
    id: 'park',
    name: 'Park Afternoon',
    intro: 'A lazy afternoon in the park: ducks on the pond, a kite overhead.',
    base: `
      <rect x="0" y="0" width="640" height="330" fill="#bfe3ff"/>
      <rect x="0" y="330" width="640" height="150" fill="#7fb069"/>
      <path d="M0 330 Q160 310 320 330 T640 330 L640 480 L0 480 Z" fill="#6aa84f"/>
      <path d="M280 480 L310 340 L330 340 L360 480 Z" fill="#e8d5a3"/>
      <circle cx="120" cy="170" r="70" fill="#4e9a51"/>
      <circle cx="80" cy="210" r="46" fill="#5cb85c"/>
      <circle cx="165" cy="215" r="42" fill="#5cb85c"/>
      <rect x="112" y="225" width="16" height="115" fill="#7d4f24"/>
      <rect x="370" y="330" width="130" height="12" fill="#8b5a2b" rx="4"/>
      <rect x="370" y="352" width="130" height="12" fill="#8b5a2b" rx="4"/>
      <rect x="378" y="364" width="12" height="40" fill="#5d3a1a"/>
      <rect x="480" y="364" width="12" height="40" fill="#5d3a1a"/>
      <ellipse cx="500" cy="420" rx="90" ry="34" fill="#4a90d9"/>
      <ellipse cx="500" cy="420" rx="90" ry="34" fill="none" stroke="#2f6fb2" stroke-width="3"/>
      <rect x="138" y="196" width="34" height="40" fill="#f2c14e" rx="4"/>
      <polygon points="132,196 189,196 160,178" fill="#b34a2b"/>
      <path d="M150 300 Q148 318 146 330" stroke="#3a2a1a" stroke-width="3" fill="none"/>
      <polygon points="150,120 168,140 132,140" fill="#e75480"/>
      <line x1="150" y1="140" x2="150" y2="190" stroke="#3a2a1a" stroke-width="2"/>
      <ellipse cx="300" cy="408" rx="34" ry="20" fill="#d9a066"/>
      <circle cx="330" cy="392" r="14" fill="#d9a066"/>
      <polygon points="322,380 326,368 332,380" fill="#d9a066"/>
      <circle cx="334" cy="390" r="2.5" fill="#3a2a1a"/>
      <rect x="268" y="404" width="8" height="18" fill="#d9a066"/>
      <rect x="318" y="404" width="8" height="18" fill="#d9a066"/>
      <circle cx="200" cy="430" r="7" fill="#e75480"/><rect x="198" y="436" width="4" height="16" fill="#2f7d5b"/>
      <circle cx="230" cy="442" r="7" fill="#f2c14e"/><rect x="228" y="448" width="4" height="14" fill="#2f7d5b"/>
      <circle cx="580" cy="440" r="7" fill="#e75480"/><rect x="578" y="446" width="4" height="16" fill="#2f7d5b"/>
    `,
    diffs: [
      { id: 'ducks', label: 'Ducks on the pond', x: 500, y: 414, r: 28,
        a: '<ellipse cx="478" cy="414" rx="16" ry="9" fill="#fff"/><circle cx="490" cy="406" r="7" fill="#fff"/><ellipse cx="524" cy="420" rx="16" ry="9" fill="#fff"/><circle cx="536" cy="412" r="7" fill="#fff"/>',
        b: '<ellipse cx="500" cy="416" rx="17" ry="10" fill="#fff"/><circle cx="514" cy="407" r="7" fill="#fff"/>' },
      { id: 'kite', label: 'Kite tail bows', x: 150, y: 168, r: 20,
        a: '<circle cx="150" cy="152" r="4" fill="#2471a3"/><circle cx="150" cy="168" r="4" fill="#2471a3"/><circle cx="150" cy="184" r="4" fill="#2471a3"/>',
        b: '<circle cx="150" cy="156" r="4" fill="#2471a3"/><circle cx="150" cy="178" r="4" fill="#2471a3"/>' },
      { id: 'bench', label: 'Bench slats', x: 435, y: 342, r: 22,
        a: '<rect x="370" y="330" width="130" height="12" fill="#8b5a2b" rx="4"/><rect x="370" y="352" width="130" height="12" fill="#8b5a2b" rx="4"/><rect x="370" y="308" width="130" height="12" fill="#8b5a2b" rx="4"/>',
        b: '<rect x="370" y="330" width="130" height="12" fill="#8b5a2b" rx="4"/><rect x="370" y="352" width="130" height="12" fill="#8b5a2b" rx="4"/>' },
      { id: 'spots', label: "Dog's spots", x: 300, y: 404, r: 24,
        a: '<ellipse cx="292" cy="402" rx="8" ry="6" fill="#8b5a2b"/><ellipse cx="312" cy="412" rx="6" ry="5" fill="#8b5a2b"/>',
        b: '' },
      { id: 'tulip', label: 'Tulip colour', x: 200, y: 430, r: 18,
        a: '<circle cx="200" cy="430" r="7" fill="#e75480"/>',
        b: '<circle cx="200" cy="430" r="7" fill="#f2c14e"/>' },
      { id: 'hole', label: 'Birdhouse hole', x: 155, y: 214, r: 16,
        a: '<circle cx="155" cy="214" r="8" fill="#3a2a1a"/>',
        b: '<rect x="147" y="206" width="16" height="16" fill="#3a2a1a" rx="2"/>' },
      { id: 'rays', label: 'Sun rays', x: 560, y: 70, r: 30,
        a: '<circle cx="560" cy="70" r="24" fill="#f2c14e"/><g stroke="#f2c14e" stroke-width="5" stroke-linecap="round"><line x1="560" y1="36" x2="560" y2="24"/><line x1="560" y1="104" x2="560" y2="116"/><line x1="526" y1="70" x2="514" y2="70"/><line x1="594" y1="70" x2="606" y2="70"/><line x1="536" y1="46" x2="528" y2="38"/><line x1="584" y1="46" x2="592" y2="38"/><line x1="536" y1="94" x2="528" y2="102"/><line x1="584" y1="94" x2="592" y2="102"/></g>',
        b: '<circle cx="560" cy="70" r="24" fill="#f2c14e"/><g stroke="#f2c14e" stroke-width="5" stroke-linecap="round"><line x1="560" y1="36" x2="560" y2="24"/><line x1="526" y1="70" x2="514" y2="70"/><line x1="594" y1="70" x2="606" y2="70"/><line x1="536" y1="46" x2="528" y2="38"/><line x1="584" y1="94" x2="592" y2="102"/></g>' },
      { id: 'apples', label: 'Apples on the tree', x: 120, y: 168, r: 26,
        a: '<circle cx="96" cy="150" r="7" fill="#d33"/><circle cx="140" cy="142" r="7" fill="#d33"/><circle cx="158" cy="182" r="7" fill="#d33"/><circle cx="88" cy="190" r="7" fill="#d33"/>',
        b: '<circle cx="96" cy="150" r="7" fill="#d33"/><circle cx="140" cy="142" r="7" fill="#d33"/><circle cx="158" cy="182" r="7" fill="#d33"/>' },
      { id: 'ripple', label: 'Pond ripples', x: 470, y: 436, r: 22,
        a: '<ellipse cx="470" cy="436" rx="18" ry="4" fill="none" stroke="#bfe3ff" stroke-width="3"/><ellipse cx="520" cy="442" rx="14" ry="3" fill="none" stroke="#bfe3ff" stroke-width="3"/>',
        b: '' },
      { id: 'cloud', label: 'Cloud in the sky', x: 320, y: 80, r: 28,
        a: '<ellipse cx="310" cy="82" rx="30" ry="14" fill="#fff"/><ellipse cx="332" cy="72" rx="22" ry="12" fill="#fff"/>',
        b: '' },
    ],
  },
  {
    id: 'workshop',
    name: 'Tinker Workshop',
    intro: 'A tinkerer’s workshop: gears on the wall, a little robot on the bench.',
    base: `
      <rect x="0" y="0" width="640" height="340" fill="#e8dcc8"/>
      <rect x="0" y="340" width="640" height="140" fill="#b08954"/>
      <rect x="0" y="340" width="640" height="14" fill="#8b5a2b"/>
      <rect x="40" y="60" width="180" height="140" fill="#c9b18c" rx="8"/>
      <g fill="#a08050"><circle cx="70" cy="90" r="4"/><circle cx="100" cy="90" r="4"/><circle cx="130" cy="90" r="4"/><circle cx="160" cy="90" r="4"/><circle cx="190" cy="90" r="4"/><circle cx="70" cy="120" r="4"/><circle cx="100" cy="120" r="4"/><circle cx="130" cy="120" r="4"/><circle cx="160" cy="120" r="4"/><circle cx="190" cy="120" r="4"/><circle cx="70" y="150" r="4"/><circle cx="100" cy="150" r="4"/><circle cx="130" cy="150" r="4"/><circle cx="160" cy="150" r="4"/><circle cx="190" cy="150" r="4"/></g>
      <rect x="60" y="280" width="120" height="12" fill="#8b5a2b" rx="4"/>
      <rect x="440" y="40" width="110" height="130" fill="#fdf6e3" stroke="#8b5a2b" stroke-width="5"/>
      <circle cx="580" cy="60" r="26" fill="#fff" stroke="#8b5a2b" stroke-width="4"/>
      <rect x="300" y="240" width="70" height="60" fill="#7fb069" rx="8"/>
      <rect x="312" y="256" width="12" height="12" fill="#fff" rx="2"/>
      <rect x="346" y="256" width="12" height="12" fill="#fff" rx="2"/>
      <path d="M322 300 L322 318 M348 300 L348 318" stroke="#5b8a4e" stroke-width="6"/>
      <rect x="316" y="318" width="38" height="10" fill="#5b8a4e" rx="3"/>
      <rect x="300" y="282" width="10" height="8" fill="#5b8a4e"/><rect x="360" y="282" width="10" height="8" fill="#5b8a4e"/>
      <rect x="500" y="180" width="14" height="120" fill="#5d3a1a"/>
      <ellipse cx="507" cy="176" rx="26" ry="12" fill="#f2c14e"/>
      <rect x="412" y="306" width="36" height="34" fill="#c0392b" rx="4"/>
      <path d="M448 312 Q464 312 464 321 Q464 330 448 330" stroke="#c0392b" stroke-width="5" fill="none"/>
      <rect x="100" y="354" width="440" height="16" fill="#7d4f24"/>
      <rect x="120" y="370" width="14" height="70" fill="#5d3a1a"/>
      <rect x="506" y="370" width="14" height="70" fill="#5d3a1a"/>
    `,
    diffs: [
      { id: 'gear', label: 'Gear teeth', x: 120, y: 120, r: 30,
        a: '<g fill="#8b5a2b"><rect x="112" y="82" width="16" height="14" rx="3"/><rect x="112" y="144" width="16" height="14" rx="3"/><rect x="82" y="112" width="14" height="16" rx="3"/><rect x="144" y="112" width="14" height="16" rx="3"/><rect x="92" y="88" width="14" height="14" rx="3" transform="rotate(45 99 95)"/><rect x="134" y="88" width="14" height="14" rx="3" transform="rotate(-45 141 95)"/><rect x="92" y="138" width="14" height="14" rx="3" transform="rotate(-45 99 145)"/><rect x="134" y="138" width="14" height="14" rx="3" transform="rotate(45 141 145)"/></g><circle cx="120" cy="120" r="26" fill="#d9b98a"/><circle cx="120" cy="120" r="8" fill="#8b5a2b"/>',
        b: '<g fill="#8b5a2b"><rect x="112" y="82" width="16" height="14" rx="3"/><rect x="112" y="144" width="16" height="14" rx="3"/><rect x="82" y="112" width="14" height="16" rx="3"/><rect x="144" y="112" width="14" height="16" rx="3"/><rect x="92" y="88" width="14" height="14" rx="3" transform="rotate(45 99 95)"/><rect x="134" y="138" width="14" height="14" rx="3" transform="rotate(45 141 145)"/></g><circle cx="120" cy="120" r="26" fill="#d9b98a"/><circle cx="120" cy="120" r="8" fill="#8b5a2b"/>' },
      { id: 'lamp', label: 'Lamp glow', x: 507, y: 176, r: 26,
        a: '<ellipse cx="507" cy="176" rx="26" ry="12" fill="#ffe066"/><circle cx="507" cy="176" r="34" fill="#f2c14e" opacity="0.25"/>',
        b: '<ellipse cx="507" cy="176" rx="26" ry="12" fill="#b8a888"/>' },
      { id: 'antenna', label: 'Robot antenna', x: 335, y: 232, r: 20,
        a: '<line x1="335" y1="240" x2="335" y2="220" stroke="#5b8a4e" stroke-width="4"/><circle cx="335" cy="216" r="7" fill="#e75480"/>',
        b: '<line x1="335" y1="240" x2="335" y2="224" stroke="#5b8a4e" stroke-width="4"/>' },
      { id: 'wrenches', label: 'Wrenches on the pegboard', x: 205, y: 130, r: 24,
        a: '<g stroke="#5b7fa6" stroke-width="7" stroke-linecap="round"><line x1="200" y1="110" x2="200" y2="150"/><line x1="214" y1="110" x2="214" y2="150"/></g><circle cx="200" cy="106" r="6" fill="none" stroke="#5b7fa6" stroke-width="4"/><circle cx="214" cy="106" r="6" fill="none" stroke="#5b7fa6" stroke-width="4"/>',
        b: '<g stroke="#5b7fa6" stroke-width="7" stroke-linecap="round"><line x1="207" y1="110" x2="207" y2="150"/></g><circle cx="207" cy="106" r="6" fill="none" stroke="#5b7fa6" stroke-width="4"/>' },
      { id: 'poster', label: 'Poster picture', x: 495, y: 105, r: 28,
        a: '<polygon points="495,70 505,95 515,70 500,92 490,92" fill="#e75480"/><circle cx="495" cy="120" r="10" fill="#f2c14e"/>',
        b: '<polygon points="495,68 501,86 519,86 505,97 510,115 495,104 480,115 485,97 471,86 489,86" fill="#f2c14e"/>' },
      { id: 'steam', label: 'Mug steam', x: 430, y: 292, r: 20,
        a: '<path d="M424 302 Q418 290 426 280 Q434 270 426 260" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>',
        b: '' },
      { id: 'clock', label: 'Wall clock', x: 580, y: 60, r: 26,
        a: '<line x1="580" y1="60" x2="580" y2="40" stroke="#3a2a1a" stroke-width="3"/><line x1="580" y1="60" x2="562" y2="60" stroke="#3a2a1a" stroke-width="3"/>',
        b: '<line x1="580" y1="60" x2="580" y2="78" stroke="#3a2a1a" stroke-width="3"/><line x1="580" y1="60" x2="562" y2="60" stroke="#3a2a1a" stroke-width="3"/>' },
      { id: 'books', label: 'Books on the shelf', x: 120, y: 268, r: 24,
        a: '<rect x="76" y="248" width="16" height="32" fill="#c0392b"/><rect x="94" y="248" width="16" height="32" fill="#2471a3"/><rect x="112" y="248" width="16" height="32" fill="#2f7d5b"/>',
        b: '<rect x="84" y="248" width="16" height="32" fill="#c0392b"/><rect x="102" y="248" width="16" height="32" fill="#2471a3"/>' },
      { id: 'screwdriver', label: 'Screwdriver handle', x: 280, y: 356, r: 18,
        a: '<rect x="268" y="348" width="10" height="26" fill="#c0392b" rx="4"/><rect x="271" y="336" width="4" height="14" fill="#cfd8dc"/>',
        b: '<rect x="268" y="348" width="10" height="26" fill="#2f7d5b" rx="4"/><rect x="271" y="336" width="4" height="14" fill="#cfd8dc"/>' },
      { id: 'hammer', label: 'Hammer direction', x: 380, y: 150, r: 24,
        a: '<rect x="360" y="146" width="40" height="10" fill="#8b5a2b" rx="3"/><rect x="358" y="136" width="18" height="22" fill="#5d3a1a" rx="3"/>',
        b: '<rect x="360" y="146" width="40" height="10" fill="#8b5a2b" rx="3"/><rect x="384" y="136" width="18" height="22" fill="#5d3a1a" rx="3"/>' },
    ],
  },
];
