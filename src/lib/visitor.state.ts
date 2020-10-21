import { createSelector } from '@ngxs/store';

/** State Name */
export const VISITOR_STATE_NAME = 'visitor';

export interface ParentStateModel {
  [VISITOR_STATE_NAME]: VisitorStateModel;
}

/** State Model */
export interface VisitorStateModel {
  visitors: number;
}

export const VisitorStateDefaults = {
  visitors: 0,
};

/** State Selectors */
export function VisitorStateSelectors<TStateModel extends ParentStateModel>(parentState) {
  return {
    getVisitors: createSelector([parentState], ({[VISITOR_STATE_NAME]: state}: TStateModel) => state.visitors),
  };
};
