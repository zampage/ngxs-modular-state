# ngxs-modular-state

This project is a conceptual prototype to create modular states using [NGXS](https://www.ngxs.io/).

Serve the project via `npm start`.

## Child State Module (Animal, Visitor)

A child state module consists of `child.state.ts` and `child.actions.ts` files.

### State settings (`child.state.ts`)

Create the model of your child state.

```ts
export interface DemoStateModel {
  count: number;
  // ...
}
```

Create some readonly default data if needed.

```ts
export const DemoStateDefaults: Readonly<DemoStateModel> = Object.freeze({
  count: 0,
  // ...
});
```

Further create all the basic selectors your state will have in the format of the `IStateSelectors` interface which is a simplified version of ngxs's `createSelector` notation.

```ts
export const ChildStateSelectors: IStateSelectors<ChildStateModel> = {
  getCount: (state: ChildStateModel) => state.count,
  // ...
};
```

### Actions (`child.actions.ts`)

Create your action the ngxs way. but leave out the type and make the class abstract.

```ts
export abstract class IncrementCount {
  constructor() {}
}
```

Add your action to an interface which defines the actions your parent state will have to implement.

```ts
export interface IDemoActions<ParentStateModel> {
  incrementCount(
    state: StateContext<ParentStateModel>,
    action: IncrementCount
  ): any;
  // ...
}
```

Create some `StateOperator`'s for your parent state to implement actions more easily if necessary.

```ts
export function incrementCount(): StateOperator<DemoStateModel> {
  return (state: Readonly<DemoStateModel>) => ({
    ...state,
    count: state.count + 1,
  });
}
```
