  parseFunctionDeclaration(identifierIsOptional?: boolean): Node.AsyncFunctionDeclaration | Node.FunctionDeclaration {
        const node = this.createNode();

        const isAsync = this.matchContextualKeyword('async');
        if (isAsync) {
            this.nextToken();
        }

        this.expectKeyword('function');

        const isGenerator = isAsync ? false : this.match('*');
        if (isGenerator) {
            this.nextToken();
        }

        let message;
        let id: Node.Identifier | null = null;
        let firstRestricted: RawToken | null = null;

        if (!identifierIsOptional || !this.match('(')) {
            const token = this.lookahead;
            id = this.parseVariableIdentifier();
            if (this.context.strict) {
                if (this.scanner.isRestrictedWord(token.value as string)) {
                    this.tolerateUnexpectedToken(token, Messages.StrictFunctionName);
                }
            } else {
                if (this.scanner.isRestrictedWord(token.value as string)) {
                    firstRestricted = token;
                    message = Messages.StrictFunctionName;
                } else if (this.scanner.isStrictModeReservedWord(token.value as string)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                }
            }
        }

        const previousAllowAwait = this.context.await;
        const previousAllowYield = this.context.allowYield;
        this.context.await = isAsync;
        this.context.allowYield = !isGenerator;

        const formalParameters = this.parseFormalParameters(firstRestricted);
        const params = formalParameters.params;
        const stricted = formalParameters.stricted;
        firstRestricted = formalParameters.firstRestricted;
        if (formalParameters.message) {
            message = formalParameters.message;
        }

        const previousStrict = this.context.strict;
        const previousAllowStrictDirective = this.context.allowStrictDirective;
        this.context.allowStrictDirective = formalParameters.simple;
        const body = this.parseFunctionSourceElements();
        if (this.context.strict && firstRestricted) {
            this.throwUnexpectedToken(firstRestricted, message);
        }
        if (this.context.strict && stricted) {
            this.tolerateUnexpectedToken(stricted, message);
        }

        this.context.strict = previousStrict;
        this.context.allowStrictDirective = previousAllowStrictDirective;
        this.context.await = previousAllowAwait;
        this.context.allowYield = previousAllowYield;

        return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) :
            this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
    }
