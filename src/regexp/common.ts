import { Chars } from '../chars';
import { getPropertyValue, lone, general, script } from './propertyList';

export const enum ValidatorState {
    Empty = 0,
    Unicode = 1 << 0,
    Invalid = 1 << 1,
}

/**
 * Loop up property value name
 *
 * @param name Property name
 * @param value Property value
 */
export function lookupPropertyValueName(name: string, value: string): boolean {
    if (name === 'General_Category' || name === 'gc' || name === 'scx') {
        return getPropertyValue(general, value);
    }
    // Here we do the same as V8 for 'Script_Extensions', and  do the property value
    // name lookup as if the property is Script.
    if (name === 'Script' || name === 'Script_Extensions') return getPropertyValue(script, value);
    return false;
}

/**
 * Validates if it's a valid unicode property name character
 *
 * @param cp Code point
 */

export function isUnicodePropertyNameCharacter(cp: number) {
    if (Chars.LowerA <= cp && cp <= Chars.LowerZ) return true;
    if (Chars.UpperA <= cp && cp <= Chars.UpperZ) return true;
    if (Chars.Zero <= cp && cp <= Chars.Nine) return true;
    return (cp === Chars.Underscore);
}
