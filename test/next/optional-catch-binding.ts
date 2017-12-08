import { pass, fail } from '../utils';

describe('Next - Optional catch binding', () => {

  pass(`without binding`, {
    source: 'try {}  catch {}',
    ranges: true,
    next: true,
    raw: true,
    module: true,
    expected: {
      "body": [
        {
          "block": {
           "body": [],
            "end": 6,
           "start": 4,
            "type": "BlockStatement",
          },
          "end": 16,
          "finalizer": null,
          "handler": {
            "body": {
              "body": [],
              "end": 16,
              "start": 14,
              "type": "BlockStatement"
            },
            "end": 16,
            "param": null,
            "start": 8,
            "type": "CatchClause"
         },
          "start": 0,
          "type": "TryStatement"
        }
      ],
      "end": 16,
      "sourceType": "module",
      "start": 0,
      "type": "Program"
    }
  });
   
});