import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { AddAnimal, getAction, IAnimalActions, insertAnimal, setAnimalState } from '../lib/animal.actions';
import { AnimalState, AnimalStateModel, AnimalStateSelectors, AnimalStateSelectorsModel, ANIMAL_STATE_NAME } from '../lib/animal.state';
import { UpdateFoo } from './main.actions';

/** State Model */
export interface MainStateModel {
  foo: string;
  [ANIMAL_STATE_NAME]: AnimalStateModel;
}

export const MAIN_ACTION = 'main-action';

export const getMainAction = (action) => {
  return getAction(MAIN_ACTION, action);
};

/** State */
@State<Partial<MainStateModel>>({
  name: 'mainState',
  defaults: {
    foo: 'bar',
  },
  children: [AnimalState]
})
@Injectable()
export class MainState implements IAnimalActions<MainStateModel> {

  /** Hook Selectors of Sub-State */
  public static get [ANIMAL_STATE_NAME](): AnimalStateSelectorsModel {
    return AnimalStateSelectors;
  }

  /** Main State Selector */
  @Selector()
  public static foo(state: MainStateModel): string {
    return state.foo;
  }

  @Action(UpdateFoo)
  public updateFoo(ctx: StateContext<MainStateModel>, {foo}: UpdateFoo) {
    ctx.setState(patch<MainStateModel>({foo}));
  }

  @Action(getMainAction(AddAnimal))
  public addAnimal(ctx: StateContext<MainStateModel>, {animal}: AddAnimal): void {
    ctx.setState(setAnimalState(insertAnimal(animal)));
  }

}
