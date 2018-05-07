#!/usr/bin/env node

"use strict"

const path = require("path")
const stream = require("fs").createWriteStream(
    path.resolve(__dirname, "../src/xhtml-entities.ts")
)
var https = require('https');

function get(uri, callback) {
    var content = '';
    // console.log('Downloading', uri);
    https.request(uri, (response) => {
        response.on('data', (chunk) => {
            content += chunk;
        });
        response.on('end', () => {
            callback(content);
        });
    }).end();
}

function process(uri, callback) {
    var entities = [];
    get(uri, (content) => {
        var lines = content.split('\n');
        lines.forEach((line) => {
            var name, code;
            if (line.indexOf('<!ENTITY') !== 0) {
                return;
            }
            name = /<!ENTITY\s([a-zA-Z0-4]+)/g.exec(line)[1];
            code = /"&#x([0-9A-Fa-f]+);/g.exec(line);
            if (code === null) {
                code = /"&#([0-9]+);/g.exec(line);
                code = parseInt(code[1], 10);
                entities.push({
                    name: name,
                    code: code
                });
            } else {
                code = parseInt(code[1], 16);
                entities.push({
                    name: name,
                    code: code
                });
            }
        });
        callback(entities);
    });
}

function collect(callback) {
    var entities = [];
    process('https://www.w3.org/2003/entities/2007/xhtml1-special.ent', (e) => {
        entities = entities.concat(e);
        process('https://www.w3.org/2003/entities/2007/xhtml1-lat1.ent', (e) => {
            entities = entities.concat(e);
            process('https://www.w3.org/2003/entities/2007/xhtml1-symbol.ent', (e) => {
                entities = entities.concat(e);
                process('https://www.w3.org/2003/entities/2007/predefined.ent', (e) => {
                    entities = entities.concat(e);
                    callback(entities);
                });
            });
        });
    });
}

function generate() {
    var entities = {};

    function cp(n) {
        var str = n.toString(16).toUpperCase();
        while (str.length < 4) {
            str = '0' + str;
        }
        return '\'\\u' + str + '\'';
    }

    collect(function(data) {
        var codes = [],
            lines = [];

        data.sort((p, q) => {
            return p.code - q.code;
        });
        data.forEach((u) => {
            if (codes.indexOf(u.code) < 0) {
                lines.push('    ' + u.name + ': ' + cp(u.code));
            }
            codes.push(u.code);
        });

      stream.write(`
      // XHTML entities
      // tslint:disable
      export const XHTMLEntities = {
          ${lines.join(',\n')}
        };`)

    });
}

generate();
