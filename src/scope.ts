export const enum ScopeType {
  None = 0,
  BlockStatement = 1 << 0,
  ForStatement = 1 << 1,
  SwitchStatement = 1 << 2,
  CatchClause = 1 << 3,
  ArgumentList = 1 << 4
}

export interface ScopeState {
  variableScope: any;
  lexicalVarScope: any;
  lexicalScope: LexicalScope;
}

export interface LexicalScope {
  childScope: any;
  flags: ScopeType;
  functions: void | {
    pattern?: string;
    flags?: string;
  };
}

export function createScope(flags: ScopeType): ScopeState {
  return {
    variableScope: {},
    lexicalVarScope: {},
    lexicalScope: {
      childScope: undefined,
      flags: flags,
      functions: {}
    }
  };
}

export function createSubScope(parentScope: ScopeState, flags: ScopeType): ScopeState {
  return {
    variableScope: parentScope.variableScope,
    lexicalVarScope: {
      childScope: parentScope.lexicalVarScope
    },
    lexicalScope: {
      childScope: parentScope.lexicalScope,
      flags: flags,
      functions: {}
    }
  };
}
