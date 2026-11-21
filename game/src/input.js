// Twin Scenes — input: mouse clicks on either panel and keyboard play.
// Clicks are converted to panel coordinates and tested against the
// differences; arrow keys move an on-screen crosshair, Enter marks a spot,
// H hints, R restarts, M mutes.
import { CONFIG } from './config.js';

export function svgPoint(panelEl, clientX, clientY) {
  const svg = panelEl.querySelector('svg');
  const rect = svg.getBoundingClientRect();
  return {
    x: ((clientX - rect.left) / rect.width) * CONFIG.panelWidth,
    y: ((clientY - rect.top) / rect.height) * CONFIG.panelHeight,
  };
}

export function nearestDiff(scene, foundIds, x, y) {
  let best = null;
  let bestDist = Infinity;
  for (const d of scene.diffs) {
    if (foundIds.has(d.id)) continue;
    const dist = Math.hypot(d.x - x, d.y - y);
    if (dist < bestDist) {
      bestDist = dist;
      best = d;
    }
  }
  return bestDist <= CONFIG.clickRadius ? best : null;
}

export function bindClicks(onMark) {
  for (const id of ['panel-a', 'panel-b']) {
    document.getElementById(id).addEventListener('click', (event) => {
      const p = svgPoint(event.currentTarget, event.clientX, event.clientY);
      onMark(p.x, p.y);
    });
  }
}

export function bindKeys(handlers) {
  const crosshair = document.getElementById('crosshair');
  const pos = { x: CONFIG.panelWidth / 2, y: CONFIG.panelHeight / 2, panel: 'panel-a' };
  let visible = false;

  function show() {
    const panel = document.getElementById(pos.panel);
    const svg = panel.querySelector('svg');
    const rect = svg.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    crosshair.style.display = 'block';
    crosshair.style.left = panelRect.left - document.getElementById('boards').getBoundingClientRect().left
      + (pos.x / CONFIG.panelWidth) * rect.width + 'px';
    crosshair.style.top = panelRect.top - document.getElementById('boards').getBoundingClientRect().top
      + (pos.y / CONFIG.panelHeight) * rect.height + 'px';
    // Position inside the boards container: crosshair is a child of #boards.
    crosshair.style.position = 'absolute';
  }

  document.addEventListener('keydown', (event) => {
    const step = event.shiftKey ? 60 : 20;
    if (event.key.startsWith('Arrow')) {
      event.preventDefault();
      visible = true;
      if (event.key === 'ArrowLeft') pos.x = Math.max(0, pos.x - step);
      if (event.key === 'ArrowRight') pos.x = Math.min(CONFIG.panelWidth, pos.x + step);
      if (event.key === 'ArrowUp') pos.y = Math.max(0, pos.y - step);
      if (event.key === 'ArrowDown') pos.y = Math.min(CONFIG.panelHeight, pos.y + step);
      if (event.key === 'Tab') { /* Tab is handled by the browser */ }
      show();
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (visible) {
        event.preventDefault();
        handlers.mark(pos.x, pos.y);
      }
    } else if (event.key === 'h' || event.key === 'H') {
      handlers.hint();
    } else if (event.key === 'r' || event.key === 'R') {
      handlers.restart();
    } else if (event.key === 'm' || event.key === 'M') {
      handlers.mute();
    } else if (event.key === 'n' || event.key === 'N') {
      handlers.next();
    }
  });

  return {
    hideCrosshair() {
      visible = false;
      crosshair.style.display = 'none';
    },
  };
}
