import { StateContext, StateOperator } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { PatchSpec } from '@ngxs/store/operators/patch';
import { AnimalStateModel, ANIMAL_STATE_NAME } from './animal.state';

export abstract class AddAnimal {
  constructor(public animal: string) {}
}

export interface IAnimalActions<TStateModel> {
  addAnimal(state: StateContext<TStateModel>, action: AddAnimal): void;
}

interface ParentStateModel {
  [ANIMAL_STATE_NAME]: AnimalStateModel;
}

export function patchAnimalState<TStateModel extends ParentStateModel>(animalState: PatchSpec<AnimalStateModel>)
: StateOperator<TStateModel> {
  return patch({
    [ANIMAL_STATE_NAME]: patch(animalState)
  });
}

export function setAnimalState<TStateModel extends ParentStateModel>(animalState: AnimalStateModel | StateOperator<AnimalStateModel>)
: StateOperator<TStateModel> {
  return patch({
    [ANIMAL_STATE_NAME]: animalState
  });
}

export function insertAnimal(animal: string): StateOperator<AnimalStateModel> {
  return (state: Readonly<AnimalStateModel>) => ({
    ...state,
    animals: [...state.animals, animal],
    count: state.count + 1
  });
}

