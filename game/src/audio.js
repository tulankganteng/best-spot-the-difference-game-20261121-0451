// Twin Scenes — sound: tiny WebAudio bleeps, generated, no audio files.
// A happy two-note chime on a find, a low buzz on a miss, a little
// arpeggio when a round is cleared. Mute toggles the whole lot.
let audioCtx = null;
let muted = false;

export function isMuted() {
  return muted;
}

export function toggleMute() {
  muted = !muted;
  return muted;
}

function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tone(freq, startAt, duration, type = 'sine', volume = 0.12) {
  if (muted) return;
  try {
    const ac = ctx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ac.currentTime + startAt);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + startAt + duration);
    osc.connect(gain).connect(ac.destination);
    osc.start(ac.currentTime + startAt);
    osc.stop(ac.currentTime + startAt + duration);
  } catch (err) {
    // Sound is garnish: a browser without audio must never break the game.
  }
}

export function playFind() {
  tone(660, 0, 0.12);
  tone(880, 0.09, 0.18);
}

export function playMiss() {
  tone(160, 0, 0.2, 'sawtooth', 0.06);
}

export function playWin() {
  [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.22));
}

export function playTick() {
  tone(1200, 0, 0.05, 'square', 0.04);
}
