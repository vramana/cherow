export const enum ScopeType {
  None = 0,
  BlockStatement = 1,
  ForStatement = 2,
  SwitchStatement = 3,
  CatchClause = 4,
  ArgumentList = 5
}

export interface ScopeState {
  var: any;
  lexVars: any;
  lex: any;
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
    var: {},
    lexVars: {},
    lex: {
      '@': undefined,
      type,
      funcs: {}
    }
  };
}

export function createSubScope(parent: ScopeState, type: ScopeType): ScopeState {
  return {
    var: parent.var,
    lexVars: {
      '@': parent.lexVars
    },
    lex: {
      '@': parent.lex,
      type,
      funcs: []
    }
  };
}
