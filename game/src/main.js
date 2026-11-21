// Twin Scenes — main: the game itself. State machine (title -> playing ->
// round-clear -> win), timer, score, streaks, hints, and the ?shot=
// presets the screenshots are taken with. No network, no storage: the
// whole game lives in this file and its modules.
import { CONFIG } from './config.js';
import { SCENES } from './scenes.js';
import { renderPanels } from './render.js';
import { bindClicks, bindKeys, nearestDiff } from './input.js';
import { playFind, playMiss, playWin, playTick, toggleMute, isMuted } from './audio.js';

const $ = (id) => document.getElementById(id);

const game = {
  phase: 'title', // title | playing | roundClear | win | timeout
  round: 0,
  found: new Set(),
  foundOrder: [],
  score: 0,
  streak: 0,
  timeLeft: CONFIG.roundTimeSeconds,
  hintsLeft: CONFIG.hintsPerRound,
  hintId: null,
  hintTimer: null,
  timerId: null,
  totalFound: 0,
};

function scene() {
  return SCENES[game.round];
}

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function updateHud() {
  $('hud-round').textContent = `Round ${game.round + 1} of ${CONFIG.totalRounds}`;
  $('hud-scene').textContent = scene().name;
  $('hud-found').textContent = `${game.found.size} / ${CONFIG.differencesPerRound}`;
  $('hud-found-label').textContent = 'found';
  $('hud-time').textContent = fmtTime(Math.max(0, game.timeLeft));
  $('hud-time-chip').classList.toggle('warn', game.timeLeft <= 30 && game.phase === 'playing');
  $('hud-score').textContent = String(game.score);
  $('hud-hints').textContent = String(game.hintsLeft);
  $('btn-hint').disabled = game.phase !== 'playing' || game.hintsLeft <= 0;
  $('found-list').textContent = game.foundOrder.length
    ? 'Found: ' + game.foundOrder.join(' · ')
    : 'Click a difference in either picture — or move with the arrow keys and press Enter.';
}

function message(text, bad = false) {
  const el = $('message');
  el.textContent = text;
  el.classList.toggle('bad', bad);
}

function showOverlay(html) {
  $('overlay-card').innerHTML = html;
  $('overlay').classList.add('show');
}

function hideOverlay() {
  $('overlay').classList.remove('show');
}

function startRound(index) {
  game.round = index;
  game.found = new Set();
  game.foundOrder = [];
  game.timeLeft = CONFIG.roundTimeSeconds;
  game.hintsLeft = CONFIG.hintsPerRound;
  game.hintId = null;
  game.streak = 0;
  game.phase = 'playing';
  clearInterval(game.timerId);
  clearTimeout(game.hintTimer);
  hideOverlay();
  renderPanels(scene(), game.found, null);
  updateHud();
  message(`Round ${index + 1}: ${scene().name} — find ${CONFIG.differencesPerRound} differences!`);
  $('btn-restart').textContent = '↻ Restart round';
  game.timerId = setInterval(tick, 1000);
}

function tick() {
  if (game.phase !== 'playing') return;
  game.timeLeft -= 1;
  if (game.timeLeft <= 10 && game.timeLeft > 0) playTick();
  if (game.timeLeft <= 0) {
    game.timeLeft = 0;
    updateHud();
    return onTimeout();
  }
  updateHud();
}

function onTimeout() {
  clearInterval(game.timerId);
  game.phase = 'timeout';
  message('Time ran out!', true);
  showOverlay(`
    <h2>⏰ Time's up!</h2>
    <p>You found <b>${game.found.size} of ${CONFIG.differencesPerRound}</b> differences in ${scene().name}.</p>
    <p class="big">Score: ${game.score}</p>
    <p>The ${CONFIG.differencesPerRound - game.found.size} you missed are still hiding in the pictures.</p>
    <button id="ov-retry">Try this round again</button>
    <p class="keys">or press R to retry</p>`);
  $('ov-retry').addEventListener('click', () => startRound(game.round));
}

function mark(x, y) {
  if (game.phase !== 'playing') return;
  const diff = nearestDiff(scene(), game.found, x, y);
  if (diff) {
    game.found.add(diff.id);
    game.foundOrder.push(diff.label);
    game.totalFound += 1;
    const gained = CONFIG.pointsPerFind + game.streak * CONFIG.streakBonusPerFind;
    game.score += gained;
    game.streak += 1;
    playFind();
    renderPanels(scene(), game.found, game.hintId);
    updateHud();
    message(`Found it — ${diff.label}! +${gained} points${game.streak > 1 ? ` (streak x${game.streak})` : ''}`);
    if (game.found.size === CONFIG.differencesPerRound) onRoundClear();
  } else {
    game.streak = 0;
    game.timeLeft = Math.max(0, game.timeLeft - CONFIG.wrongClickPenaltySeconds);
    game.score = Math.max(0, game.score - CONFIG.wrongClickPenaltyPoints);
    playMiss();
    updateHud();
    message(`Not quite — that's the same in both pictures. −${CONFIG.wrongClickPenaltySeconds}s`, true);
    const boards = $('boards');
    boards.classList.remove('shake');
    void boards.offsetWidth;
    boards.classList.add('shake');
  }
}

function onRoundClear() {
  clearInterval(game.timerId);
  game.phase = 'roundClear';
  const bonus = game.timeLeft * CONFIG.timeBonusPerSecond;
  game.score += bonus;
  playWin();
  updateHud();
  if (game.round + 1 < CONFIG.totalRounds) {
    const next = SCENES[game.round + 1];
    showOverlay(`
      <h2>🎉 Round clear!</h2>
      <p>You found all ${CONFIG.differencesPerRound} differences in <b>${scene().name}</b>.</p>
      <p class="big">Time bonus +${bonus} · Score: ${game.score}</p>
      <p>Next up: <b>${next.name}</b> — ${next.intro}</p>
      <button id="ov-next">Next round →</button>
      <p class="keys">or press N for the next round</p>`);
    $('ov-next').addEventListener('click', () => startRound(game.round + 1));
  } else {
    game.phase = 'win';
    showOverlay(`
      <h2>🏆 You found them all!</h2>
      <p>All ${CONFIG.totalRounds} scenes, ${game.totalFound} differences found.</p>
      <p class="big">Final score: ${game.score}</p>
      <p>Sharp eyes! Play again for a faster time and a bigger score.</p>
      <button id="ov-again">Play again</button>
      <p class="keys">or press R to play again</p>`);
    $('ov-again').addEventListener('click', () => startGame());
  }
}

function useHint() {
  if (game.phase !== 'playing' || game.hintsLeft <= 0) return;
  const remaining = scene().diffs.filter((d) => !game.found.has(d.id));
  if (!remaining.length) return;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  game.hintsLeft -= 1;
  game.score = Math.max(0, game.score - CONFIG.hintCostPoints);
  game.hintId = pick.id;
  renderPanels(scene(), game.found, game.hintId);
  updateHud();
  message(`Hint: look near the ${pick.label.toLowerCase()}… (−${CONFIG.hintCostPoints} points)`);
  clearTimeout(game.hintTimer);
  game.hintTimer = setTimeout(() => {
    game.hintId = null;
    if (game.phase === 'playing') renderPanels(scene(), game.found, null);
  }, CONFIG.hintRevealSeconds * 1000);
}

function startGame() {
  game.score = 0;
  game.totalFound = 0;
  startRound(0);
}

function showTitle() {
  game.phase = 'title';
  renderPanels(scene(), new Set(), null);
  updateHud();
  showOverlay(`
    <h2>🔍 Twin Scenes</h2>
    <p><b>Spot the difference!</b> Two pictures sit side by side — they look the same, but <b>${CONFIG.differencesPerRound} things</b> changed between them. Click every difference you can find before the clock runs out.</p>
    <p>Three scenes get trickier as you go: <b>Sunny Kitchen</b>, <b>Park Afternoon</b> and <b>Tinker Workshop</b>. A wrong click costs ${CONFIG.wrongClickPenaltySeconds} seconds, a hint costs ${CONFIG.hintCostPoints} points, and a hot streak earns bonus points.</p>
    <button id="ov-play">▶ Start playing</button>
    <p class="keys">Mouse: click a difference · Keyboard: arrow keys move the crosshair, Enter marks a spot<br>H hint · R restart · M mute · N next round</p>`);
  $('ov-play').addEventListener('click', startGame);
}

// Screenshot presets (?shot=start|play|end), used only for the entry's
// screenshots: start shows the title, play a mid-round hunt with four
// differences already circled, end the win screen.
function applyShotPreset() {
  const params = new URLSearchParams(location.search);
  const shot = params.get('shot');
  if (shot === 'play') {
    startGame();
    const r = parseInt(params.get('round') || '0', 10);
    if (r > 0 && r < CONFIG.totalRounds) startRound(r);
    clearInterval(game.timerId);
    game.timeLeft = 87;
    game.score = 450;
    game.streak = 2;
    const firstFour = scene().diffs.slice(0, 4);
    for (const d of firstFour) {
      game.found.add(d.id);
      game.foundOrder.push(d.label);
      game.totalFound += 1;
    }
    renderPanels(scene(), game.found, null);
    updateHud();
    const lastFound = game.foundOrder[game.foundOrder.length - 1];
    message(`Found it — ${lastFound}! +100 points (streak x2)`);
  } else if (shot === 'end') {
    game.phase = 'win';
    game.score = 2840;
    game.totalFound = CONFIG.differencesPerRound * CONFIG.totalRounds;
    game.round = CONFIG.totalRounds - 1;
    game.found = new Set(scene().diffs.map((d) => d.id));
    game.foundOrder = scene().diffs.map((d) => d.label);
    renderPanels(scene(), game.found, null);
    updateHud();
    showOverlay(`
      <h2>🏆 You found them all!</h2>
      <p>All ${CONFIG.totalRounds} scenes, ${game.totalFound} differences found.</p>
      <p class="big">Final score: ${game.score}</p>
      <p>Sharp eyes! Play again for a faster time and a bigger score.</p>
      <button id="ov-again">Play again</button>
      <p class="keys">or press R to play again</p>`);
    $('ov-again').addEventListener('click', startGame);
  }
}

// Self-test (?selftest=1): marks one real difference and one wrong spot,
// then reports the result in the DOM so a headless run can verify play.
function runSelfTest() {
  const results = [];
  startGame();
  const d = scene().diffs[0];
  mark(d.x, d.y);
  results.push(`find:${game.found.size === 1 ? 'ok' : 'FAIL'}`);
  results.push(`score:${game.score === CONFIG.pointsPerFind ? 'ok' : 'FAIL(' + game.score + ')'}`);
  const before = game.timeLeft;
  mark(600, 470); // empty floor corner: a wrong spot in the kitchen scene
  results.push(`miss:${game.timeLeft === before - CONFIG.wrongClickPenaltySeconds ? 'ok' : 'FAIL'}`);
  useHint();
  results.push(`hint:${game.hintsLeft === CONFIG.hintsPerRound - 1 && game.hintId ? 'ok' : 'FAIL'}`);
  game.found = new Set(scene().diffs.map((x) => x.id));
  onRoundClear();
  results.push(`roundClear:${game.phase === 'roundClear' ? 'ok' : 'FAIL(' + game.phase + ')'}`);
  const el = document.createElement('div');
  el.id = 'selftest-result';
  el.textContent = 'SELFTEST ' + results.join(' ');
  document.body.appendChild(el);
  window.__selftest = results.join(' ');
}

bindClicks((x, y) => mark(x, y));
const keys = bindKeys({
  mark: (x, y) => mark(x, y),
  hint: useHint,
  restart: () => (game.phase === 'win' ? startGame() : startRound(game.round)),
  mute: () => {
    const m = toggleMute();
    $('btn-mute').textContent = m ? '🔇 Muted' : '🔊 Sound on';
  },
  next: () => {
    if (game.phase === 'roundClear' && game.round + 1 < CONFIG.totalRounds) startRound(game.round + 1);
  },
});

$('btn-hint').addEventListener('click', useHint);
$('btn-restart').addEventListener('click', () => startRound(game.round));
$('btn-mute').addEventListener('click', () => {
  const m = toggleMute();
  $('btn-mute').textContent = m ? '🔇 Muted' : '🔊 Sound on';
});

showTitle();
applyShotPreset();
if (new URLSearchParams(location.search).get('selftest') === '1') runSelfTest();
window.__game = game;
