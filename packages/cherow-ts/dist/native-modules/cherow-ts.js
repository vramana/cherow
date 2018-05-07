import { Parser } from 'cherow';

function parseTS(source, options) {
    return options && options.module
        ? Parser.parse(source, options, 4096 | 8192)
        : Parser.parse(source, options, 0);
}

export { parseTS };
