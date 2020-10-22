import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddAnimal, IAnimalActions, insertAnimal } from 'src/lib/animal.actions';
import { AnimalStateDefaults, AnimalStateModel, AnimalStateSelectors, ANIMAL_STATE_NAME } from 'src/lib/animal.state';
import { createActionsFromState } from 'src/lib/state-helper';
import { DecrementVisitors, IncrementVisitors, IVisitorActions, patchVisitorState } from 'src/lib/visitor.actions';
import { VisitorStateModel, VISITOR_STATE_NAME, VisitorStateSelectors, VisitorStateDefaults } from 'src/lib/visitor.state';

const BASEL_STATE_NAME = 'basel';

export const BaselActions = createActionsFromState(BASEL_STATE_NAME);

export interface BaselStateModel {
  favoritAnimal: string;
  [ANIMAL_STATE_NAME]: AnimalStateModel;
  [VISITOR_STATE_NAME]: VisitorStateModel;
}

@State<Partial<BaselStateModel>>({
  name: BASEL_STATE_NAME,
  defaults: {
    favoritAnimal: 'Eagle',
    [ANIMAL_STATE_NAME]: AnimalStateDefaults,
    [VISITOR_STATE_NAME]: Object.assign({}, VisitorStateDefaults, { ticketPrize: 12 } as VisitorStateModel),
  },
})
@Injectable()
export class BaselState implements IAnimalActions<BaselStateModel>, IVisitorActions<BaselStateModel> {
  public static get [ANIMAL_STATE_NAME]() {
    return AnimalStateSelectors(BaselState);
  }

  public static get [VISITOR_STATE_NAME]() {
    return VisitorStateSelectors(BaselState);
  }

  @Selector()
  public static favoritAnimal(state: BaselStateModel): string {
    return state.favoritAnimal;
  }

  @Action(BaselActions(AddAnimal))
  public addAnimal(ctx: StateContext<BaselStateModel>, { animal }: AddAnimal): void {
    ctx.setState(insertAnimal(animal));
  }

  @Action(BaselActions(IncrementVisitors))
  public incrementVisitors(ctx: StateContext<BaselStateModel>): void {
    const current = ctx.getState()[VISITOR_STATE_NAME].visitors;
    ctx.setState(patchVisitorState({
      visitors: current + 1,
    }));
  }

  @Action(BaselActions(DecrementVisitors))
  public decrementVisitors(ctx: StateContext<BaselStateModel>): void {
    const current = ctx.getState()[VISITOR_STATE_NAME].visitors;
    ctx.setState(patchVisitorState({
      visitors: Math.max(current - 1, 0),
    }));
  }
}
