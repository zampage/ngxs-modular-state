import { StateSelectors } from './state-helper';

export interface VisitorStateModel {
  visitors: number;
  ticketPrize: number;
}

export const VisitorStateDefaults: Readonly<VisitorStateModel> = Object.freeze({
  visitors: 0,
  ticketPrize: 10,
});

export const VisitorStateSelectors: StateSelectors<VisitorStateModel> = {
  getVisitors: (state: VisitorStateModel) => state.visitors,
  getRevenue: (state: VisitorStateModel) => state.visitors * state.ticketPrize,
};
