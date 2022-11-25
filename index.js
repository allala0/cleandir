#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require("fs");

let directory = process.argv[2];

if(process?.argv[2] === undefined){
    console.log('Provide directory as argument.');
    return;
}

const dir = path.resolve(process.cwd(), directory)
fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
    fs.unlink(path.join(dir, file), (err) => {
        if (err) throw err;
    });
    }
});
