import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Miscellaneous - Binary', () => {

  describe('Failure', () => {
    const invalidSyntax = [
      `<1/>`,
      '<a b=}>',
        '<a b=<}>',
        '<a .../*hai*/asdf/>',
        '<a[foo]></a[foo]>',
        '<a[\'foo\']></a[\'foo\']>',
        '<a><a />',
        '<a b={}>',
        '<dd><e></e></dddd>;',
        '<f><g/></ff>;',
        '<b.b></b>;',
        '<a[foo]></a[foo]>',
        '<div {...props}>stuff</div {...props}>',
        '<div></span>',
        `<{...b} {...a }>{...b}</{...b}>`,
    ];

    for (const arg of invalidSyntax) {

       // Sloppy mode
       it(`${arg}`, () => {
        t.throws(() => {
            parse(`${arg}`, undefined, Context.OptionsJSX);
        });
    });

    // Module Code
      it(`${arg}`, () => {
      t.throws(() => {
          parse(`${arg}`, undefined, Context.OptionsJSX | Context.Strict | Context.Module);
      });
  });
    }
  });

  describe('Pass', () => {

      const validSyntax = [
        '<a>></a>',
        '<a> ></a>',
        '<a>}</a>',
          '<div />',
          // Acorn JSX issue: https://github.com/RReverser/acorn-jsx/issues/82
          'function* test() { yield <Hey />;    }',
          'function* test() { yield (<Hey />); }',
          // Acorn JSX issue: https://github.com/RReverser/acorn-jsx/issues/75
          '<div>{...children}</div>',
          `<div {...c}> {...children}{a}{...b}</div>`,
          `<svg:path/>`,
          '(<div />) < x;',
          '<div {...props} />',
          '<div {...props} post="attribute" />',
          '<div pre="leading" pre2="attribute" {...props}></div>',
          '<a>    </a>',
          '<a>= == =</a>',
          `<title>{ {caption} }</title>`,
          `"use strict"; <async />`,
          `<this />`,
          `var src = "<div title='café'></div>";`,
          `<Switch checkedChildren="开" unCheckedChildren={'关'} />`,
          `<Foo:Bar />;
          <Foo:Bar></Foo:Bar>`,
          '<n:a n:v />',
          '<a n:foo="bar"> {value} <b><c /></b></a>',
          '<a b={x ? <c /> : <d />} />',
          '<AbC-def\n  test="&#x0026;&#38;">\nbar\nbaz\n</AbC-def>',
          '<A aa={aa.bb.cc} bb={bb.cc.dd}><div>{aa.b}</div></A>',
          'var el = ( <span /> )',
          '<A.B.C.D.E.foo-bar />',
          '<a>  <b><c/></b> </a>',
          `<em>
          One
          Two
          Three
          </em>`,
                    '<title>{$caption}</title>',
                    '<earth.america />',
                    '<strong></strong>',
                    '<b>Hello</b>',
                    `<a
          />`,
                    '<a>{`${1}`}</a>',
                    'function *g() { yield <h1>Hello</h1> }',
          `function*it(){ yield <a></a>; }`,
          `class SayHello extends React.Component {
            constructor(props) {
              super(props);
              this.state = {message: 'Hello!'};
              // This line is important!
              this.handleClick = this.handleClick.bind(this);
            }
            handleClick() {
              alert(this.state.message);
            }
            render() {
              // Because "this.handleClick" is bound, we can use it as an event handler.
              return (
                <button onClick={this.handleClick}>
                  Say hello
                </button>
              );
            }
          }`
      ];

      for (const arg of validSyntax) {

           // Sloppy mode
      it(`${arg}`, () => {
        t.doesNotThrow(() => {
            parse(`${arg}`, undefined, Context.OptionsJSX);
        });
    });

    // Module Code
      it(`${arg}`, () => {
      t.doesNotThrow(() => {
          parse(`${arg}`, undefined, Context.OptionsJSX | Context.Strict | Context.Module);
      });
  });
      }
  });
});
