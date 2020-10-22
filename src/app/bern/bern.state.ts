import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddAnimal, IAnimalActions, insertAnimal, setAnimalState } from 'src/lib/animal.actions';
import { AnimalStateDefaults, AnimalStateModel, AnimalStateSelectors, ANIMAL_STATE_NAME } from 'src/lib/animal.state';
import { createActionsFromState } from 'src/lib/state-helper';
import { DecrementVisitors, IncrementVisitors, IVisitorActions, patchVisitorState } from 'src/lib/visitor.actions';
import { VisitorStateModel, VISITOR_STATE_NAME, VisitorStateSelectors, VisitorStateDefaults } from 'src/lib/visitor.state';

const BERN_STATE_NAME = 'bern';

export const BernActions = createActionsFromState(BERN_STATE_NAME);

export interface BernStateModel {
  favoritAnimal: string;
  [ANIMAL_STATE_NAME]: AnimalStateModel;
  [VISITOR_STATE_NAME]: VisitorStateModel;
}

@State<Partial<BernStateModel>>({
  name: BERN_STATE_NAME,
  defaults: {
    favoritAnimal: 'Bear',
    [ANIMAL_STATE_NAME]: AnimalStateDefaults,
    [VISITOR_STATE_NAME]: VisitorStateDefaults
  },
})
@Injectable()
export class BernState implements IAnimalActions<BernStateModel>, IVisitorActions<BernStateModel> {
  public static get [ANIMAL_STATE_NAME]() {
    return AnimalStateSelectors(BernState);
  }

  public static get [VISITOR_STATE_NAME]() {
    return VisitorStateSelectors(BernState);
  }

  @Selector()
  public static favoritAnimal(state: BernStateModel): string {
    return state.favoritAnimal;
  }

  @Action(BernActions(AddAnimal))
  public addAnimal(ctx: StateContext<BernStateModel>, { animal }: AddAnimal): void {
    ctx.setState(insertAnimal<BernStateModel>(animal));
  }

  @Action(BernActions(IncrementVisitors))
  public incrementVisitors(ctx: StateContext<BernStateModel>): void {
    const current = ctx.getState()[VISITOR_STATE_NAME].visitors;
    ctx.setState(patchVisitorState({
      visitors: current + 1,
    }));
  }

  @Action(BernActions(DecrementVisitors))
  public decrementVisitors(ctx: StateContext<BernStateModel>): void {
    const current = ctx.getState()[VISITOR_STATE_NAME].visitors;
    ctx.setState(patchVisitorState({
      visitors: Math.max(current - 1, 0),
    }));
  }
}
