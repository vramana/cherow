import { parseScript, parseModule } from '../../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - Asynchronous Iteration - Object', () => {

    it('should fail on async generator await as binding identifier escaped', () => {
        expect(() => {
            parseScript(`var obj = {
                async *method() {
                  var \\u0061wait;
                }
              };`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on async generator await as binding identifier', () => {
        expect(() => {
            parseScript(`var obj = {
                async *method() {
                    var await;
                }
              };`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on async await as identifier reference escaped', () => {
        expect(() => {
            parseScript(`var obj = {
                async *method() {
                    void \\u0061wait;
                }
              };`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on async await as label identifier', () => {
        expect(() => {
            parseScript(`var obj = {
                async method() {
                  await: ;
                }
              };`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on async generator await as identifier reference label', () => {
        expect(() => {
            parseScript(`var obj = {
                async *method() {
                  void \\u0061wait;
                }
              };`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on async await as label identifier escaped', () => {
        expect(() => {
            parseScript(`var obj = {
                async *method() {
                    \\u0061wait: ;
                }
              };`, {
                next: true
            });
        }).to.throw();
    });

});