import * as t from 'assert';
import { scanJSXToken, scanJSXAttributeValue } from '../../src/lexer/jsx';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - JSX', () => {

  describe('Lexer - JSX attribute value', () => {
      it('JSX string scanning should work', () => {
          const state = new State('"chinese pig"', undefined, undefined);
          const token = scanJSXAttributeValue(state, Context.OptionsJSX | Context.OptionsRaw);
          t.deepEqual({
              token,
              raw: state.tokenRaw,
              value: state.tokenValue,
              line: state.line,
              column: state.column,
          },          {
              token: Token.StringLiteral,
              value: 'chinese pig',
              raw: '"chinese pig"',
              line: 1,
              column: 13,
          });
      });
  });
  describe('Lexer - JSX attribute value', () => {
      it('should move on if "JSXClose" and return the token', () => {
          const state = new State('</', undefined, undefined);
          const found = scanJSXToken(state);
          t.deepEqual({
              token: found,
              value: state.tokenValue,
              line: state.line,
              column: state.column,
          },          {
              token: Token.JSXClose,
              value: 0,
              line: 1,
              column: 2,
          });
      });
      it('should move on if "JSXClose" and return the token', () => {
          const state = new State('{', undefined, undefined);
          const token = scanJSXToken(state);
          t.deepEqual({
              token,
              value: state.tokenValue,
              line: state.line,
              column: state.column,
          },          {
              token: Token.LeftBrace,
              value: 0,
              line: 1,
              column: 1,
          });
      });

      it('should move on if "JSXText" and return the token', () => {
          const state = new State('"JSX scanner should think this is text and move on"', undefined, undefined);
          const token = scanJSXToken(state);
          t.deepEqual({
              token,
              value: state.tokenValue,
              line: state.line,
              column: state.column,
          },          {
              token: Token.JSXText,
              value: 0,
              line: 1,
              column: 51,
          });
      });
  });
});
