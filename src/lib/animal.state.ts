import { IStateSelectors } from './state-helper';

export const ANIMAL_STATE_NAME = 'animal';

export interface AnimalStateModel {
  animals: string[];
  count: number;
}

export const AnimalStateDefaults: Readonly<AnimalStateModel> = Object.freeze({
  animals: ['Lion'],
  count: 1,
});

export const AnimalStateSelectors: IStateSelectors<AnimalStateModel> = {
  getAnimals: (state: AnimalStateModel) => state.animals,
};
