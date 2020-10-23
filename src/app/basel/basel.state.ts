import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddAnimal, IAnimalActions, insertAnimal } from 'src/lib/animal.actions';
import { AnimalStateDefaults, AnimalStateModel, AnimalStateSelectors } from 'src/lib/animal.state';
import { createActionsFromState } from 'src/lib/state-helper';
import { DecrementVisitors, IncrementVisitors, IVisitorActions } from 'src/lib/visitor.actions';
import { VisitorStateModel, VisitorStateSelectors, VisitorStateDefaults } from 'src/lib/visitor.state';
import { createChildSelectors } from '../../lib/state-helper';
import { patch } from '@ngxs/store/operators';
import { updateVisitors } from '../../lib/visitor.actions';

const BASEL_STATE_NAME = 'basel';

export const BaselActions = createActionsFromState(BASEL_STATE_NAME);

export interface BaselStateModel {
  favoritAnimal: string;
  animalState: AnimalStateModel;
  visitorState: VisitorStateModel;
}

@State<Partial<BaselStateModel>>({
  name: BASEL_STATE_NAME,
  defaults: {
    favoritAnimal: 'Eagle',
    animalState: AnimalStateDefaults,
    visitorState: Object.assign({}, VisitorStateDefaults, { ticketPrize: 12 } as VisitorStateModel),
  },
})
@Injectable()
export class BaselState implements IAnimalActions<BaselStateModel>, IVisitorActions<BaselStateModel> {
  public static get animalState() {
    return createChildSelectors<BaselStateModel, AnimalStateModel>(BaselState, AnimalStateSelectors, 'animalState');
  }

  public static get visitorState() {
    return createChildSelectors<BaselStateModel, VisitorStateModel>(BaselState, VisitorStateSelectors, 'visitorState');
  }

  @Selector()
  public static favoritAnimal(state: BaselStateModel): string {
    return state.favoritAnimal;
  }

  @Action(BaselActions(AddAnimal))
  public addAnimal(ctx: StateContext<BaselStateModel>, { animal }: AddAnimal): void {
    ctx.setState(patch<BaselStateModel>({
      animalState: insertAnimal(animal),
    }));
  }

  @Action(BaselActions(IncrementVisitors))
  public incrementVisitors(ctx: StateContext<BaselStateModel>): void {
    ctx.setState(patch<BaselStateModel>({
      visitorState: updateVisitors(1),
    }));
  }

  @Action(BaselActions(DecrementVisitors))
  public decrementVisitors(ctx: StateContext<BaselStateModel>): void {
    ctx.setState(patch<BaselStateModel>({
      visitorState: updateVisitors(-1),
    }));
  }
}
