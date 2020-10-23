import { StateContext, StateOperator } from '@ngxs/store';
import { AnimalStateModel } from './animal.state';

export abstract class AddAnimal {
  constructor(public animal: string) { }
}

export interface AnimalActions<TStateModel> {
  addAnimal(state: StateContext<TStateModel>, action: AddAnimal): any;
}

export function insertAnimal(animal: string): StateOperator<AnimalStateModel> {
  return (state: Readonly<AnimalStateModel>) => ({
    ...state,
    animals: [...state.animals, animal],
    count: state.count + 1,
  });
}
