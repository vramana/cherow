import { unicodeLookup } from './unicode';
export const AsciiLookup = new Uint8Array(0x80)
    .fill(3, 0x24, 0x25)
    .fill(4, 0x30, 0x3a)
    .fill(3, 0x41, 0x5b)
    .fill(3, 0x5f, 0x60)
    .fill(3, 0x61, 0x7b);
export function isIdentifierPart(code) {
    return (AsciiLookup[code] & 1) > 0 || ((unicodeLookup[(code >>> 5) + 0] >>> code) & 31 & 1) > 0;
}
export function isIdentifierStart(code) {
    return (AsciiLookup[code] & 2) > 0 || ((unicodeLookup[(code >>> 5) + 34816] >>> code) & 31 & 1) > 0;
}
//# sourceMappingURL=chars.js.map