export function createActionsFromState(state: string, childState: string) {
  return (action: any) => class extends (action) {
    public static readonly type = `[${state}][${childState}] ${action.name}`;
    constructor(...args: any) {
      super(...args);
    }
  };
}
