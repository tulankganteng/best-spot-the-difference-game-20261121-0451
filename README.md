# best-spot-the-difference-game-20261121-0451 — Twin Scenes

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/tulankganteng/best-spot-the-difference-game-20261121-0451/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/tulankganteng/best-spot-the-difference-game-20261121-0451/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

**Entry for the make.fun bounty [best-spot-the-difference-game-20261121-0451](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
($50, 10 places paid $5 each; entries close Sat 2026-11-21 23:51 WIB).**
A complete spot-the-difference game that plays offline in a desktop browser
from its own files — no network, no build step, keyboard + mouse.

## The game: Twin Scenes

Two near-identical pictures sit side by side. They look the same, but
**10 things changed** between them. Click every difference before the clock
runs out — three scenes, each trickier than the last:

| Round | Scene | The hunt |
|---|---|---|
| 1 | **Sunny Kitchen** | Milo the cat, the wall clock, the fruit bowl, kettle steam, a red mug… |
| 2 | **Park Afternoon** | Ducks on the pond, the kite's tail, the bench slats, the dog's spots… |
| 3 | **Tinker Workshop** | Gear teeth, the lamp glow, the robot's antenna, books on the shelf… |

Every picture is **original art drawn in code** (inline SVG shapes in
`game/src/scenes.js`) — no copied images, no external assets, no commercial
game's characters or levels.

## How it plays

- **Finds:** click a difference in either picture. Found ones get a red ring
  + check mark on both panels; the counter shows how many remain.
- **Score:** +100 per find, +25 streak bonus per consecutive find, time bonus
  at the end of each round (+5 per second left).
- **Wrong click:** −5 seconds and −10 points, with a shake.
- **Hints:** 3 per round, −50 points each; a gold ring pulses on one unfound
  difference for 3 seconds.
- **Timer:** 2:30 per round. Run out and you retry the round.
- **Keyboard:** arrow keys move the crosshair, Enter marks a spot, H hint,
  R restart, M mute, N next round.
- **Sound:** small WebAudio bleeps (find chime, miss buzz, win arpeggio) —
  generated, no audio files. M toggles mute.
- **Win:** clear all three rounds (30 differences) for the final score screen.

## Play it

Serve `game/` with any static server and open `index.html`:

```sh
cd game && python3 -m http.server 8080
# open http://localhost:8080
```

Or open `game/index.html` directly from disk — it plays from `file://` too.

Screenshot presets (used for the entry's screenshots, `?shot=` in the URL):

- `?shot=play` — mid-round, 4 differences already circled, counter 4/10
- `?shot=play&round=1` — same, on the Park scene
- `?shot=end` — the win screen, all 30 differences found
- `?selftest=1` — headless play test (find / miss / hint / round-clear)

## Layout

```
main.ts                 entrypoint: copies game/ + screenshots/ to /output,
                        writes dossier.json via vendor/makefun-game.ts
vendor/makefun-game.ts  the kit's library, unchanged
game/
  index.html            page shell + HUD
  styles.css            layout and look
  src/config.js         timers, scoring, hint rules (one place, one job)
  src/scenes.js         the three original scenes + their 30 differences
  src/render.js         turns a scene into the two side-by-side panels
  src/input.js          mouse clicks + keyboard play (crosshair, keys)
  src/audio.js          WebAudio bleeps, generated, no files
  src/main.js           game state: title → play → round clear → win
screenshots/            1-start.jpg, 2-play.jpg, 3-play-park.jpg, 4-end.jpg
                        (real renders of the game's own code, headless Chrome)
```

## Build / hand-in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` runs on Node 22 (standard library only) and writes `out/game/`,
`out/screenshots/` and `out/dossier.json`. See `TESTLOG.md` for how the game
was played, tested and screenshotted, and the kit check result.

## License

MIT — see [LICENSE](LICENSE).
