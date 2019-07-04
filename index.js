const axios = require('axios');
const chalk = require('chalk');
const config = require('./config.json');
const inquirer = require('inquirer');

function success(){ console.log(chalk.green.italic("[SUCCESS]") + " " + chalk.bold(arguments[0])); };
function error(){ console.log(chalk.red.italic("[ERROR]") + " " + chalk.bold(arguments[0])); };
function info(){ console.log(chalk.blue.italic("[INFO]") + " " + chalk.bold(arguments[0])); };

info(chalk.green("RESTcord CLI") + " by " + chalk.red("Chiphyr\n\n"));

const methods = [{
    type: 'list',
    name: 'method',
    message: "What do you want to do?",
    choices: ["Send Message", "Send DM"]
}];

inquirer.prompt(methods).then(m => {
    if(m.method === "Send Message"){
        const questions = [{
            type: "input",
            name: "channelid",
            message: "Enter the ID of the channel to send to."
        }, {
            type: "input",
            name: "message",
            message: "Enter the message to be sent."
        }];
        inquirer.prompt(questions).then(args => {
            let channelID = args["channelid"];
            let message = args["message"];
            
            try{
                axios({
                    method: "post",
                    url: `${config.hostname}/restcord/channels/${channelID}/send`,
                    data: {
                        "content": message
                    }
                });
            } catch(e){
                return error(e);
            };
            return success(`I sent ${message} to ${channelID}.`);
        });
    };
    if(m.method === "Send DM"){
        const questions = [{
            type: "input",
            name: "userid",
            message: "Enter the ID of the user to DM."
        }, {
            type: "input",
            name: "message",
            message: "Enter the message to be sent."
        }];
        inquirer.prompt(questions).then(args => {
            let userID = args["userid"];
            let message = args["message"];
            
            try{
                axios({
                    method: "post",
                    url: `${config.hostname}/restcord/users/${userID}/send`,
                    data: {
                        "content": message
                    }
                });
            } catch(e){
                return error(e);
            };
            return success(`I sent ${message} to ${userID}.`);
        });
    };
});
