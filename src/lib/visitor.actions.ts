import { StateContext, StateOperator } from '@ngxs/store';
import { VisitorStateModel } from './visitor.state';

export abstract class IncrementVisitors {
  constructor() { }
}

export abstract class DecrementVisitors {
  constructor() { }
}

export interface IVisitorActions<TStateModel> {
  incrementVisitors(state: StateContext<TStateModel>, action: IncrementVisitors): void;
  decrementVisitors(state: StateContext<TStateModel>, action: DecrementVisitors): void;
}

export function updateVisitors(difference: number): StateOperator<VisitorStateModel> {
  return (state: Readonly<VisitorStateModel>) => ({
    ...state,
    visitors: Math.max(state.visitors + difference, 0),
  });
}
