import { createSelector } from '@ngxs/store';

type IncludesType<Parent, Type> = {
  [Key in Extract<keyof Parent, Type>]: Parent[Key]
};

export function createActionsFromState(state: string) {
  return (action: any) => class extends (action) {
    public static readonly type = `[${state}] ${action.name}`;
    constructor(...args: any) {
      super(...args);
    }
  };
}

export interface IStateSelectors<StateModel> {
  [key: string]: (state: StateModel) => any;
}

export function createChildSelectors<PStateModel extends IncludesType<PStateModel, CStateModel>, CStateModel>(
  parentState: any,
  childSelectors: { [key: string]: (state: CStateModel) => any },
  childProperty: keyof PStateModel
): IStateSelectors<PStateModel> {
  const extractChildState = (state: PStateModel): CStateModel => state[childProperty];
  return Object.keys(childSelectors).reduce((s, k) => ({
    ...s, [k]: createSelector(
      [parentState],
      (state: PStateModel) => childSelectors[k](extractChildState(state))
    )
  }), {});
}
