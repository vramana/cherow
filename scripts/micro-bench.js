const esprima = require('esprima').parse;
const acorn = require('acorn').parse
const cherow = require('../dist/cherow.min.js').parseScript;
const Benchmark = require('benchmark');

// Micro-benchmark between Acorn, Esprima and Cherow

function newSuite (name) {
  return new Benchmark.Suite(name, {
    onStart: () => console.log(`\n\n${name}`),
    onCycle: event => console.log(String(event.target)),
    onComplete: function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    }
  });
}

/* Numbers */

newSuite('1')
.add('Esprima', () => esprima('1'))
.add('Acorn', () => acorn('1'))
.add('cherow', () => cherow('1'))
.run({ async: false });

newSuite('.123')
.add('Esprima', () => esprima('.123'))
.add('Acorn', () => acorn('.123'))
.add('cherow', () => cherow('.123'))
.run({ async: false });

newSuite('1_2_3_4_5')
.add('Esprima', () => esprima('1_2_3_4_5'))
.add('Acorn', () => acorn('1_2_3_4_5'))
.add('cherow', () => cherow('1_2_3_4_5', { next: true}))
.run({ async: false });

newSuite('1_2.3_4_5')
.add('Esprima', () => esprima('1_2.3_4_5'))
.add('Acorn', () => acorn('1_2.3_4_5'))
.add('cherow', () => cherow('1_2.3_4_5', { next: true}))
.run({ async: false });

newSuite('123')
.add('Esprima', () => esprima('123'))
.add('Acorn', () => acorn('123'))
.add('cherow', () => cherow('123'))
.run({ async: false });

newSuite('0O0')
.add('Esprima', () => esprima('0O0'))
.add('Acorn', () => acorn('0O0'))
.add('cherow', () => cherow('0O0'))
.run({ async: false });

newSuite('0b11')
.add('Esprima', () => esprima('0b11'))
.add('Acorn', () => acorn('0b11'))
.add('cherow', () => cherow('0b11'))
.run({ async: false });

newSuite('6.02214179e+23')
.add('Esprima', () => esprima('6.02214179e+23'))
.add('Acorn', () => acorn('6.02214179e+23'))
.add('cherow', () => cherow('6.02214179e+23'))
.run({ async: false });

newSuite('0012')
.add('Esprima', () => esprima('0012'))
.add('Acorn', () => acorn('0012'))
.add('cherow', () => cherow('0012'))
.run({ async: false });

newSuite('0X0_11_0101;')
.add('Esprima', () => esprima('0X0_11_0101;'))
.add('Acorn', () => acorn('0X0_11_0101;'))
.add('cherow', () => cherow('0X0_11_0101;', { next: true}))
.run({ async: false });
