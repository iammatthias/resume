#!/usr/bin/env node

'use strict';
const inquirer = require('inquirer'),
    chalk = require('chalk'),
    resume = require('./iammatthias-resume.json'),
    response = chalk.bold.yellow;

const choices = [...Object.keys(resume), 'Exit 👋'];
const options = {
    choices,
    type: 'list',
    name: 'resumeViewOptions',
    message: 'What would you like to know?'
};

function handleResume() {
    inquirer.prompt(options).then(answer => {
        if (answer.resumeViewOptions == 'Exit') {
            console.log(response('Thank you for your time!'));
            return;
        }
        const option = resume[`${answer.resumeViewOptions}`];

        if (option) {
            console.log(response(new inquirer.Separator()));
            option.map(info => console.log(response('|   => ' + info)));
            console.log(response(new inquirer.Separator()));
        }

        inquirer
            .prompt({
                type: 'list',
                name: 'exitBack',
                message: 'Go back or Exit?',
                choices: ['Back', 'Exit']
            })
            .then(choice => {
                if (choice.exitBack == 'Back') {
                    return handleResume();
                }
                return console.log(response('Thank you for your time!'));
            });
    }).catch(err => console.log('Uh oh you broke me, maybe you should consider a career in QA?\n', err));
}

//Init :)
console.log(`Hello world! I'm Andrew, welcome to my resume! 🤓`);
handleResume();
