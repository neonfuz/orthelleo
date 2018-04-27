const TRY_PLACE = 'TRY_PLACE';

const tryPlace = (x, y) => ({
  type: TRY_PLACE,
  payload: { x, y },
});

export { TRY_PLACE, tryPlace };
