#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

let directory = process.argv[2];

if(process?.argv[2] === undefined){
    console.log('Provide directory as argument.');
    return;
}

const dir = path.resolve(process.cwd(), directory);


const deleteFolderRecursive = function (directoryPath, notFirstCall=false) {
if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath, true);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    try{
        if(notFirstCall) fs.rmdirSync(directoryPath);
    }
    catch{}
  }
};

deleteFolderRecursive(dir);
