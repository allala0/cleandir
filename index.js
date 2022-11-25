#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const clearDirectoryRecursive = function (directoryPath, notFirstCall=false) {
if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        clearDirectoryRecursive(curPath, true);
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

let directory = process?.argv[2];

if(directory !== undefined){
  clearDirectoryRecursive(path.resolve(require.main === module ? process.cwd() : __dirname, directory));
  console.log('Directory cleared.')
}
else if (require.main === module) {
  console.log('Please provide directory as argument.');
  console.log(require.main === module ? process.cwd() : __dirname)
} 
else {
  module.exports = clearDirectoryRecursive;
} 
