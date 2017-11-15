import { n, test } from '../../utils/test-utils';

describe("ES2016 - Identifiers", () => {
    test("ૹ", {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "ૹ",
                    },
                },
            ],
            sourceType: "script",
        });
});
