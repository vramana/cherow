export declare const enum ScopeType {
    None = 0,
    BlockStatement = 1,
    ForStatement = 2,
    SwitchStatement = 4,
    CatchClause = 8,
    ArgumentList = 16
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
export declare function createScope(type: ScopeType): ScopeState;
export declare function createSubScope(parent: ScopeState, type: ScopeType): ScopeState;
//# sourceMappingURL=scope.d.ts.map