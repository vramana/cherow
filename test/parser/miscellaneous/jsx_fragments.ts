import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('JSX - Fragments', () => {

  describe('Failure', () => {});

  describe('Pass', () => {

    const validSyntax = [
      `<></>`,
      `<    ></   >`,
      `< /*starting wrap*/ ></ /*ending wrap*/>;`,
      `<>hi</>;`,
      `<><div>JSXElement</div>JSXText{'JSXExpressionContainer'}</>`,
      `<><span>hi</span><div>bye</div></>;`,
      `<><span>1</span><><span>2.1</span><span>2.2</span></><span>3</span></>;`,
      `<><span> hi </span> <div>bye</div> </>`,
      `<
        // SingleLine
        /* MultiLine */
        >
         <div></div>
          <div></div>
        </>`,
        `<>
        <>
          <>
           Ghost!
          </>
        </>
      </>`,
      `<>
      <>
        <>
          super deep
        </>
      </>
    </>`,
    ];
    for (const arg of validSyntax) {

      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parse(`${arg}`, undefined, Context.OptionsJSX);
          });
      });
    }

});
});