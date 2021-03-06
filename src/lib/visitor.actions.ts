import { StateContext, StateOperator } from '@ngxs/store';
import { VisitorStateModel } from './visitor.state';

export abstract class IncrementVisitors {
  constructor() { }
}

export abstract class DecrementVisitors {
  constructor() { }
}

export interface VisitorActions<TStateModel> {
  incrementVisitors(state: StateContext<TStateModel>, action: IncrementVisitors): any;
  decrementVisitors(state: StateContext<TStateModel>, action: DecrementVisitors): any;
}

export function updateVisitors(difference: number): StateOperator<VisitorStateModel> {
  return (state: Readonly<VisitorStateModel>) => ({
    ...state,
    visitors: Math.max(state.visitors + difference, 0),
  });
}
