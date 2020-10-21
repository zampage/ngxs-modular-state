import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';

const BERN_STATE_NAME = 'bern';

export interface BernStateModel {
  favoritAnimal: string;
}

@State<Partial<BernStateModel>>({
  name: BERN_STATE_NAME,
  defaults: {
    favoritAnimal: 'Bear',
  },
})
@Injectable()
export class BernState {
  @Selector()
  public static favoritAnimal(state: BernStateModel): string {
    return state.favoritAnimal;
  }
}
