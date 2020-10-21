import { Injectable } from '@angular/core';
import { createSelector, State } from '@ngxs/store';

/** State Name */
export const VISITOR_STATE_NAME = 'visitor';

/** State Model */
export interface VisitorStateModel {
  visitors: number;
}

/** State */
@State<VisitorStateModel>({
  name: VISITOR_STATE_NAME,
  defaults: {
    visitors: 0,
  }
})
@Injectable()
export class VisitorState {}

/** State Selector Model */
// export interface VisitorStateSelectorsModel {
//   getVisitors: (state: VisitorStateModel) => number;
// }

/** State Selectors */
export const VisitorStateSelectors/*: VisitorStateSelectorsModel*/ = {
  getVisitors: createSelector([VisitorState], (state: VisitorStateModel) => state.visitors)
};
