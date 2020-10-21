import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddAnimal, IAnimalActions, insertAnimal, setAnimalState } from 'src/lib/animal.actions';
import { AnimalState, AnimalStateModel, AnimalStateSelectors, AnimalStateSelectorsModel, ANIMAL_STATE_NAME } from 'src/lib/animal.state';
import { createActionsFromState } from 'src/lib/state-helper';

const BERN_STATE_NAME = 'bern';

export const BernActions = createActionsFromState(BERN_STATE_NAME, ANIMAL_STATE_NAME);

export interface BernStateModel {
  favoritAnimal: string;
  [ANIMAL_STATE_NAME]: AnimalStateModel;
}

@State<Partial<BernStateModel>>({
  name: BERN_STATE_NAME,
  defaults: {
    favoritAnimal: 'Bear',
  },
  children: [AnimalState],
})
@Injectable()
export class BernState implements IAnimalActions<BernStateModel> {
  public static get [ANIMAL_STATE_NAME](): AnimalStateSelectorsModel {
    return AnimalStateSelectors;
  }

  @Selector()
  public static favoritAnimal(state: BernStateModel): string {
    return state.favoritAnimal;
  }

  @Action(BernActions(AddAnimal))
  public addAnimal(ctx: StateContext<BernStateModel>, {animal}: AddAnimal): void {
    ctx.setState(setAnimalState(insertAnimal(animal)));
  }
}
