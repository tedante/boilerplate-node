#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { exec } = require('child_process');

const argv = yargs(hideBin(process.argv)).argv

// npm install --save express ejs sequelize 
// npm install --save-dev sequelize-cli nodemon 

if(argv._[0] === "install") {
  console.log(`installing express, ejs, sequelize`)
  exec('npm install --save express ejs sequelize', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log("-> installing express, ejs, sequelize has done")

    console.log(`installing sequelize-cli nodemon`)
    exec('npm install --save-dev sequelize-cli nodemon', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log("-> installing sequelize-cli, nodemon has done")
    })
  });
}