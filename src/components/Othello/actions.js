const AI_PLACE = 'AI_PLACE';
const TRY_PLACE = 'TRY_PLACE';
const RESTART = 'RESTART';

const aiPlace = () => ({
  type: AI_PLACE,
});

const tryPlace = (x, y) => ({
  type: TRY_PLACE,
  payload: { x, y },
});

const restart = () => ({
  type: RESTART,
});

export {
  AI_PLACE, aiPlace,
  TRY_PLACE, tryPlace,
  RESTART, restart,
};
