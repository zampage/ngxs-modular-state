import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddAnimal, IAnimalActions, insertAnimal, setAnimalState } from 'src/lib/animal.actions';
import { AnimalState, AnimalStateModel, AnimalStateSelectors, AnimalStateSelectorsModel, ANIMAL_STATE_NAME } from 'src/lib/animal.state';
import { createActionsFromState } from 'src/lib/state-helper';
import { DecrementVisitors, IncrementVisitors, IVisitorActions, patchVisitorState } from 'src/lib/visitor.actions';
import { VisitorState, VisitorStateModel, VISITOR_STATE_NAME, VisitorStateSelectors } from 'src/lib/visitor.state';

const BASEL_STATE_NAME = 'basel';

export const AnimalActions = createActionsFromState(BASEL_STATE_NAME, ANIMAL_STATE_NAME);
export const VisitorActions = createActionsFromState(BASEL_STATE_NAME, VISITOR_STATE_NAME);

export interface BaselStateModel {
  favoritAnimal: string;
  [ANIMAL_STATE_NAME]: AnimalStateModel;
  [VISITOR_STATE_NAME]: VisitorStateModel;
}

@State<Partial<BaselStateModel>>({
  name: BASEL_STATE_NAME,
  defaults: {
    favoritAnimal: 'Lion',
  },
  children: [AnimalState, VisitorState],
})
@Injectable()
export class BaselState implements IAnimalActions<BaselStateModel>, IVisitorActions<BaselStateModel> {
  public static get [ANIMAL_STATE_NAME](): AnimalStateSelectorsModel {
    return AnimalStateSelectors;
  }

  public static get [VISITOR_STATE_NAME]() {
    return VisitorStateSelectors;
  }

  @Selector()
  public static favoritAnimal(state: BaselStateModel): string {
    return state.favoritAnimal;
  }

  @Action(AnimalActions(AddAnimal))
  public addAnimal(ctx: StateContext<BaselStateModel>, {animal}: AddAnimal): void {
    ctx.setState(setAnimalState(insertAnimal(animal)));
  }

  @Action(VisitorActions(IncrementVisitors))
  public incrementVisitors(ctx: StateContext<BaselStateModel>): void {
    const current = ctx.getState()[VISITOR_STATE_NAME].visitors;
    ctx.setState(patchVisitorState({
      visitors: current + 1,
    }));
  }

  @Action(VisitorActions(DecrementVisitors))
  public decrementVisitors(ctx: StateContext<BaselStateModel>): void {
    const current = ctx.getState()[VISITOR_STATE_NAME].visitors;
    ctx.setState(patchVisitorState({
      visitors: Math.max(current - 1, 0),
    }));
  }
}
