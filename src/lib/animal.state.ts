import { Injectable } from '@angular/core';
import { createSelector, State } from '@ngxs/store';

/** State Name */
export const ANIMAL_STATE_NAME = 'animalState';

/** State Model */
export interface AnimalStateModel {
  animals: string[];
  count: number;
}

/** State */
@State<AnimalStateModel>({
  name: ANIMAL_STATE_NAME,
  defaults: {
    animals: ['Lion'],
    count: 1,
  }
})
@Injectable()
export class AnimalState {}

/** State Selector Model */
export interface AnimalStateSelectorsModel {
  getAnimals: (state: AnimalStateModel) => string[];
}

/** State Selectors */
export const AnimalStateSelectors: AnimalStateSelectorsModel = {
  getAnimals: createSelector([AnimalState], (state: AnimalStateModel) => state.animals)
};
