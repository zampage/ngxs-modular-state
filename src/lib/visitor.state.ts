import { createSelector } from '@ngxs/store';

export const VISITOR_STATE_NAME = 'visitor';

export interface ParentStateModel {
  [VISITOR_STATE_NAME]: VisitorStateModel;
}

export interface VisitorStateModel {
  visitors: number;
  ticketPrize: number;
}

export const VisitorStateDefaults: Readonly<VisitorStateModel> = Object.freeze({
  visitors: 0,
  ticketPrize: 10,
});

export function VisitorStateSelectors<TStateModel extends ParentStateModel>(parentState) {
  return {
    getVisitors: createSelector([parentState], ({[VISITOR_STATE_NAME]: state}: TStateModel) => state.visitors),
    getRevenue: createSelector([parentState], ({[VISITOR_STATE_NAME]: state}: TStateModel) => state.visitors * state.ticketPrize),
  };
};
