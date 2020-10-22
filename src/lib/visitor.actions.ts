import { StateContext, StateOperator } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { PatchSpec } from '@ngxs/store/operators/patch';
import { ParentStateModel, VisitorStateModel, VISITOR_STATE_NAME } from './visitor.state';

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

export function patchVisitorState<TStateModel extends ParentStateModel>(visitorState: PatchSpec<VisitorStateModel>)
  : StateOperator<TStateModel> {
  return patch({
    [VISITOR_STATE_NAME]: patch(visitorState)
  });
}

export function setVisitorState<TStateModel extends ParentStateModel>(visitorState: VisitorStateModel | StateOperator<VisitorStateModel>)
  : StateOperator<TStateModel> {
  return patch({
    [VISITOR_STATE_NAME]: visitorState
  });
}
