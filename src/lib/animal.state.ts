import { createSelector } from '@ngxs/store';

/** State Name */
export const ANIMAL_STATE_NAME = 'animal';

// TODO generalize?
export interface ParentStateModel {
  [ANIMAL_STATE_NAME]: AnimalStateModel;
}

/** State Model */
export interface AnimalStateModel {
  animals: string[];
  count: number;
}

export const AnimalStateDefaults = {
  animals: ['Lion'],
  count: 1,
};

/** State Selectors */
export function AnimalStateSelectors<TStateModel extends ParentStateModel>(parentState) {
  return {
    getAnimals: createSelector([parentState], ({[ANIMAL_STATE_NAME]: state}: TStateModel) => state.animals),
  };
}
