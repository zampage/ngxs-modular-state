# ngxs-modular-state

This project is a conceptual prototype to create modular states using [NGXS](https://www.ngxs.io/).

Serve the project via `npm start`.

## 1 Child State Module (Animal, Visitor)

A child state module consists of `child.state.ts` and `child.actions.ts` files.

### 1.1 State settings (`child.state.ts`)

Create the model of your child state.

```typescript
export interface DemoStateModel {
  count: number;
  // ...
}
```

Create some readonly default data if needed.

```typescript
export const DemoStateDefaults: Readonly<DemoStateModel> = Object.freeze({
  count: 0,
  // ...
});
```

Further create all the basic selectors your state will have in the format of the `IStateSelectors` interface which is a simplified version of ngxs's `createSelector` notation.

```typescript
export const DemoStateSelectors: IStateSelectors<DemoStateModel> = {
  getCount: (state: DemoStateModel) => state.count,
  // ...
};
```

### 1.2 Actions (`child.actions.ts`)

Create your action the ngxs way. but leave out the type and make the class abstract.

```typescript
export abstract class IncrementCount {
  constructor() {}
}
```

Add your action to an interface which defines the actions your parent state will have to implement.

```typescript
export interface IDemoActions<ParentStateModel> {
  incrementCount(
    state: StateContext<ParentStateModel>,
    action?: IncrementCount
  ): any;
  // ...
}
```

Create some `StateOperator`'s for your parent state to implement actions more easily if necessary.

```typescript
export function incrementCount(): StateOperator<DemoStateModel> {
  return (state: Readonly<DemoStateModel>) => ({
    ...state,
    count: state.count + 1,
  });
}
```

## 2 Child State Module (Bern, Basel)

### 2.1 Setup

Implement your parent state the default ngxs way.

Add the model of the child state as property of your parents state model.

```typescript
export interface ParentStateModel {
  // ...
  demoState: DemoStateModel;
}
```

Add your defaults when creating the state.

```typescript
@State<ParentStateModel>({
  name: "parentStateName",
  defaults: {
    // ...
    demoState: DemoStateDefaults,

    // or extend the child state defaults
    // demoState: {...DemoStateDefaults, count: 5}
  },
})
export class ParentState {}
```

### 2.2 Selectors

To use the childs selectors in your parent state include them via getter and return the helper function `createChildSelectors` which is a wrap for ngxs's `createSelector` function.

```typescript
public static get demoState() {
  return createChildSelectors<ParentStateModel, DemoStateModel>(ParentState, DemoStateSelectors, 'demoState');
}
```

You will be able to use the childs selectors like this:

```typescript
@Select(ParentState.demoState.getCount)
```

### 2.3 Actions

To use your child states abstract actions you will need to extend them. Using `createActionsFromState` you will get the wrapper function which extends any action you pass to it and gives it the appropriate static type that ngxs needs.

```typescript
export const DemoAction = createActionsFromState("parentStateName");
export const CreateDemoAction = createActionCreatorsFromState(
  "parentStateName"
);
```

You will use actions like this:

```typescript
// listen to an action
@Action(DemoAction(IncrementCount))
public incrementCount() { }

// dispatch an action
store.dispatch(CreateDemoAction(IncrementCount/* [, ...args] */))
```

Then implement the created interface on your state to know which actions are available.

```typescript
export class ParentState implements IDemoActions<ParentStateModel>
```

You will be prompted to implement said actions. You can use `StateOperators` to implement them faster.

```typescript
@Action(DemoAction(IncrementCount))
  public incrementCount(ctx: StateContext<ParentStateModel>): void {
    ctx.setState(patch<ParentStateModel>({
      demoState: incrementCount(),
    }));
  }
```

## 3 Pull Requests & ngxs integration

Pull requests to improve this project are greatly appreciated! Ngxs is welcome to integrate a native system like this one in its project. This would be a much needed alternative/improvement to ngxs sub-states, which currently can't handle beeing used in multiple states due to the unique type of actions and sub-state integration.
