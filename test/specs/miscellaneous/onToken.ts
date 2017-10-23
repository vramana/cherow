import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Tokens', () => {

    it('should collect identifier token', () => {

      parseScript('a', {
        tokens: function(a: any) {
          console.log("this is: " + a);
        }
      });
     
      parseScript('123', {
        tokens: function(a: any) {
          console.log("this is: " + a);
        }
      });
      
      
    });


});