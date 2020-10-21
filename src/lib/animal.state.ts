import { createSelector } from '@ngxs/store';

export const ANIMAL_STATE_NAME = 'animal';

export interface ParentStateModel {
  [ANIMAL_STATE_NAME]: AnimalStateModel;
}

export interface AnimalStateModel {
  animals: string[];
  count: number;
}

export const AnimalStateDefaults: Readonly<AnimalStateModel> = Object.freeze({
  animals: ['Lion'],
  count: 1,
});

export function AnimalStateSelectors<TStateModel extends ParentStateModel>(parentState) {
  return {
    getAnimals: createSelector([parentState], ({[ANIMAL_STATE_NAME]: state}: TStateModel) => state.animals),
  };
}
