const CTX = 'Main';

export class UpdateFoo {
  public static readonly type = `[${CTX}] update foo`;
  constructor(public foo: string) {}
}
