// Twin Scenes — rendering: turns a scene into the two side-by-side panels.
// Each panel is one inline SVG: the shared base, then each difference drawn
// in its A form (left) or B form (right), then markers on the found ones.
import { CONFIG } from './config.js';

export function panelSvg(scene, variant, foundIds, hintId) {
  const diffArt = scene.diffs
    .map((d) => (variant === 'A' ? d.a : d.b))
    .join('');
  const marks = scene.diffs
    .filter((d) => foundIds.has(d.id))
    .map(
      (d) => `
      <g class="found-mark">
        <circle cx="${d.x}" cy="${d.y}" r="${d.r}" fill="none" stroke="#d33" stroke-width="5"/>
        <circle cx="${d.x}" cy="${d.y}" r="${d.r - 7}" fill="none" stroke="#d33" stroke-width="2" stroke-dasharray="4 4"/>
        <path d="M${d.x - 8} ${d.y} l5 5 l9 -10" stroke="#d33" stroke-width="4" fill="none" stroke-linecap="round"/>
      </g>`,
    )
    .join('');
  const hint = scene.diffs.find((d) => d.id === hintId);
  const hintMark = hint
    ? `<circle class="hint-mark" cx="${hint.x}" cy="${hint.y}" r="${hint.r + 6}" fill="none" stroke="#f2c14e" stroke-width="5" stroke-dasharray="10 6">
         <animate attributeName="r" values="${hint.r + 6};${hint.r + 14};${hint.r + 6}" dur="1s" repeatCount="indefinite"/>
       </circle>`
    : '';
  return `
    <svg viewBox="0 0 ${CONFIG.panelWidth} ${CONFIG.panelHeight}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${scene.name} panel ${variant}">
      ${scene.base}
      ${diffArt}
      ${marks}
      ${hintMark}
    </svg>`;
}

export function renderPanels(scene, foundIds, hintId) {
  document.getElementById('panel-a').innerHTML =
    panelSvg(scene, 'A', foundIds, hintId) + '<span class="tag">Picture A</span>';
  document.getElementById('panel-b').innerHTML =
    panelSvg(scene, 'B', foundIds, hintId) + '<span class="tag right">Picture B</span>';
}
