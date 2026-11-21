// Twin Scenes — configuration: timers, scoring and hint rules.
// One place for every number the game balances on, so tuning never
// means hunting through the game logic.
export const CONFIG = {
  panelWidth: 640,
  panelHeight: 480,
  differencesPerRound: 10,
  roundTimeSeconds: 150,
  pointsPerFind: 100,
  streakBonusPerFind: 25,
  wrongClickPenaltySeconds: 5,
  wrongClickPenaltyPoints: 10,
  hintCostPoints: 50,
  hintsPerRound: 3,
  hintRevealSeconds: 3,
  timeBonusPerSecond: 5,
  clickRadius: 30,
  totalRounds: 3,
};
