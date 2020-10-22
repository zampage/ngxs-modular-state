export function createActionsFromState(state: string) {
  return (action: any) => class extends (action) {
    public static readonly type = `[${state}] ${action.name}`;
    constructor(...args: any) {
      super(...args);
    }
  };
}
