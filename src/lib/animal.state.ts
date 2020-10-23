import { StateSelectors } from './state-helper';

export interface AnimalStateModel {
  animals: string[];
  count: number;
}

export const AnimalStateDefaults: Readonly<AnimalStateModel> = Object.freeze({
  animals: ['Lion'],
  count: 1,
});

export const AnimalStateSelectors: StateSelectors<AnimalStateModel> = {
  getAnimals: (state: AnimalStateModel) => state.animals,
};
