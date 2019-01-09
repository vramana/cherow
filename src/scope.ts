export const enum ScopeType {
  None = 0,
  BlockStatement = 1,
  ForStatement = 2,
  SwitchStatement = 3,
  CatchClause = 4,
  ArgumentList = 5
}

export interface ScopeState {
  variableScope: any;
  lexicalVarScope: any;
  lexicalScope: any;
}

export interface LexicalScope {
  childScope: any;
  flags: ScopeType;
  functions: void | {
    pattern?: string;
    flags?: string;
  };
}

/**
 * Create a block scope
 */
export function createScope(type: ScopeType): ScopeState {
  return {
    variableScope: {},
    lexicalVarScope: {},
    lexicalScope: {
      '@': undefined,
      type,
      funcs: {}
    }
  };
}

export function createSubScope(parent: ScopeState, type: ScopeType): ScopeState {
  return {
    variableScope: parent.variableScope,
    lexicalVarScope: {
      '@': parent.lexicalVarScope
    },
    lexicalScope: {
      '@': parent.lexicalScope,
      type,
      funcs: []
    }
  };
}
