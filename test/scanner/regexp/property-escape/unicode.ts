import * as assert from 'clean-assert';
import * as t from 'assert';
//import { ValidatorState, validateRegExp } from '../../../../src/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';

describe.skip('Unicode property escape', () => {

    describe.skip('Failure', () => {
        const invalidSyntax = [
            '/\\p/u',
            '/\\p/u',
            '/\\p{/u',
            '/\\p{/u',
            '/\\p{General_Category}/u',
            '/\\p{General_Category=}/u',
            '/\\p{General_Category/u',
            '/\\p{General_Category=/u',
            '/\\p{General_Category=Letter/u',
            '/\\p{General_Category=Hiragana}/u',
            '/[\\p}]/u',
            '/[\\p{}]/u',
            '/[\\p{invalid}]/u',
            '/[\\p{]/u',
            '/[\\p{]}/u',
            '/[\\p}]/u',
            '/^\p{Any}+$/u',
            '/^\p{Bidi_C}+$/u,',
            '/^\P{gc=Currency_Symbol}+$/u,',
            '/\\p{ASCII=Yes}/u',
            '/\\p{ASCII=Y}/u',
            '/\\p{ASCII=T}/u',
            '/\\P{ASCII=No}/u',
            '/\\P{ASCII=N}/u',
            '/\\P{ASCII=F}/u',
            '/\\p{ASCII=Invalid}/u',
            '/^\p{Pd}+$/u,',
            '/^\P{gc=Pd}+$/u,',
            '^\p{gc=Decimal_Number}+$/u,',
            '/\\p{Extended_Pictographic}/u',
            '/\\p{Expands_On_NFKD}/u',
            '/\\P{Expands_On_NFKC}/u',
            '/\\p{FC_NFKC_Closure}/u',
            '/\\P{FC_NFKC_Closure}/u',
            '/\\p{Full_Composition_Exclusion}/u',
            '/[\\p{invalid}]/u',
            '/[\\p{}]/u',
            '/[\\p{invalid}]/u',
            '/[\\p{]/u',
            '/[\\p{]}/u',
            '/[\\p}]/u',
            '/\\P{FC_NFKC_Closure}/u',
            '/\\p{Full_Composition_Exclusion}/u',
            '/\\P{Full_Composition_Exclusion}/u',
            '/\\p{Grapheme_Link}/u',
            '/\\P{Grapheme_Link}/u',
            '/\\P{Hyphen}/u',
            '/\\p{Other_Alphabetic}/u',
            '/\\P{Other_Alphabetic}/u',
            '/\\p{Other_Default_Ignorable_Code_Point}/u',
            '/\\P{Other_Default_Ignorable_Code_Point}/u',
            '/\\p{Other_Grapheme_Extend}/u',
            '/\\P{Other_Grapheme_Extend}/u',
            '/\\p{Other_ID_Continue}/u',
            '/\\P{Other_ID_Continue}/u',
            '/\\p{Other_Lowercase}/u',
            '/\\p{Other_Math}/u',
            '/\\P{Other_Uppercase}/u',
            '/\\p{Prepended_Concatenation_Mark}/u',
            '/\\P{Prepended_Concatenation_Mark}/u',
            '/\\P{Line_Break}/u',
            '/\\p{Line_Break=Alphabetic}/u',
            '/\\P{Line_Break=Alphabetic}/u',
            '/\\P{FC_NFKC_Closure}/u',
            '/\\p{Block=Adlam}/u',
            '/\\p{General_Category=WAT}/u',
            '/\\P{Line_Breakz=WAT}/u',
            '/\\p{Script=FooBarBazInvalid}/u',
            '/\\p{Script_Extensions=H_e_h}/u',
            '/\\P{Script_Extensions=H_e_h}/u',
            '/\\p{UnknownBinaryProperty}/u',
            '/\\p{Line_Breakz=Alphabetic}/u',
            '/\\p{General_Category}/u',
            '/\\P{Script}/u',
            '/\\p{Script=}/u',
            '/\\P{Script=}/u',
            '/\\p{Script_Extensions}/u',
            '/\\p{Script_Extensions=}/u',
            '/\\p{lowercase}/u',
            '/\\P{_-_lOwEr_C-A_S-E_-_}/u',
            '/\\p{General_Category = Uppercase_Letter}/u',
            '/\\p{gc=uppercaseletter}/u',
            '/\\P{gC=uppercase_letter}/u',
            '/\\P{ANY}/u',
            '/\\p{any}/u',
            '/\\p{assigned}/u',
            '/\\p{InScript=Adlam}/u',
            '/\\p{inScript=Adlam}/u',
            '/\\P{inScript=Adlam}/u',
            '/\\P{InAdlam}/u',
            '/\\PL/u',
            '/\\p{=Letter}/u',
            '/\\P{=Letter}/u',
            '/\\P{=}/u',
            '/\\p{=}/u',
            '/\\p{^General_Category=Letter}/u',
            '/\\p{General_Category:Letter}/u',
            '/\\P{General_Category:Letter}/u',
        ];
        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {

                t.throws(() => {
                    validateRegExp(`${arg}`, ValidatorState.Unicode);
                });
            });
        }
    });

    describe.skip('Pass', () => {
        const vadlidSyntax = [
            '/\\p{General_Category=Letter}/u',
            '/[\\p{Script=Hiragana}\\-\\p{Script=Katakana}]/u',
            ' /[\p{Hex}-\uFFFF]/u',
        ];

        for (const arg of vadlidSyntax) {

            it(`${arg}`, () => {

                t.doesNotThrow(() => {
                    validateRegExp(`${arg}`, ValidatorState.Unicode);
                });
            });
        }
    });
});