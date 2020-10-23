import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { AddAnimal, IAnimalActions, insertAnimal } from 'src/lib/animal.actions';
import { AnimalStateDefaults, AnimalStateModel, AnimalStateSelectors } from 'src/lib/animal.state';
import { createActionsFromState } from 'src/lib/state-helper';
import { DecrementVisitors, IncrementVisitors, IVisitorActions } from 'src/lib/visitor.actions';
import { VisitorStateModel, VisitorStateSelectors, VisitorStateDefaults } from 'src/lib/visitor.state';
import { createChildSelectors, createActionExecutersFromState as createActionCreatorsFromState } from '../../lib/state-helper';
import { updateVisitors } from '../../lib/visitor.actions';

const BERN_STATE_NAME = 'bern';

export const BernAction = createActionsFromState(BERN_STATE_NAME);
export const CreateBernAction = createActionCreatorsFromState(BERN_STATE_NAME);

export interface BernStateModel {
  favoritAnimal: string;
  animalState: AnimalStateModel;
  visitorState: VisitorStateModel;
}

@State<Partial<BernStateModel>>({
  name: BERN_STATE_NAME,
  defaults: {
    favoritAnimal: 'Bear',
    animalState: AnimalStateDefaults,
    visitorState: VisitorStateDefaults
  },
})
@Injectable()
export class BernState implements IAnimalActions<BernStateModel>, IVisitorActions<BernStateModel> {
  public static get animalState() {
    return createChildSelectors<BernStateModel, AnimalStateModel>(BernState, AnimalStateSelectors, 'animalState');
  }

  public static get visitorState() {
    return createChildSelectors<BernStateModel, VisitorStateModel>(BernState, VisitorStateSelectors, 'visitorState');
  }

  @Selector()
  public static favoritAnimal(state: BernStateModel): string {
    return state.favoritAnimal;
  }

  @Action(BernAction(AddAnimal))
  public addAnimal(ctx: StateContext<BernStateModel>, { animal }: AddAnimal): void {
    ctx.setState(patch<BernStateModel>({
      animalState: insertAnimal(animal),
    }));
  }

  @Action(BernAction(IncrementVisitors))
  public incrementVisitors(ctx: StateContext<BernStateModel>): void {
    ctx.setState(patch<BernStateModel>({
      visitorState: updateVisitors(1),
    }));
  }

  @Action(BernAction(DecrementVisitors))
  public decrementVisitors(ctx: StateContext<BernStateModel>): void {
    ctx.setState(patch<BernStateModel>({
      visitorState: updateVisitors(-1),
    }));
  }
}
