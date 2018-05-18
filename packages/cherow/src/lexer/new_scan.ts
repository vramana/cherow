export function scan(parser: Parser, context: Context): Token {
    while (parser.index < parser.length) {
        const first = parser.source.charCodeAt(parser.index);
        if (first <= Chars.Space) {
            parser.index++;parser.column++;
            continue;
        }
        parser.startIndex = parser.index;
        if (first === Chars.Dollar || (first >= Chars.LowerA && first <= Chars.LowerZ)) {
          return (parser.token = scanIdentifier(parser, context));
        }

        if ((parser.token = table[first](parser, context, first)) === Token.Whitespace) {
            continue;
        }
        return parser.token;
    }
    return Token.EndOfSource;
}
