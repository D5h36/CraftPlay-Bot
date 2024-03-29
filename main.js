const Discord = require("discord.js");
const client = new Discord.Client()
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright, bgBlue, gray } = require('chalk');
const config = require("./config.json")
const fs = require("fs");
client.commands = new Discord.Collection();
const db = require('quick.db');

client.on("ready", () => {
    console.log( "[" + green("Craft") + gray("Play")+ "]" + redBright(`${client.user.username} is up and running!`))
})
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
client.on('message', async msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'ping') {
        client.commands.get('ping').execute(msg, args);
    }
    if (command === 'ban') {
        client.commands.get('ban').execute(msg, args, client);
    }
    if (command === 'kick') {
        client.commands.get('kick').execute(msg, args, client);
    }
    if (command === 'mute') {
        client.commands.get('mute').execute(msg, args, client);
    }
    if (command === 'help') {
        client.commands.get('help').execute(msg, args, Discord);
    }
    if (command === 'userinfo') {
        client.commands.get('userinfo').execute(msg, args);
    }
    if (command === 'clear') {
        client.commands.get('clear').execute(msg, args, client);
    }
    if (command === 'avatar') {
        client.commands.get('avatar').execute(msg, args);
    }
    if (command === 'discord') {
        client.commands.get('discord').execute(msg, args, client, Discord)
    }
    if (command === 'lock') {
        client.commands.get('lock').execute(msg, args, client, Discord)
    }
    if (command === 'unlock') {
        client.commands.get('unlock').execute(msg, args, client, Discord)
    }
    if (command === 'status') {
        client.commands.get('status').execute(msg, args, client, Discord)
    }
    if (command === 'player') {
        client.commands.get('player').execute(msg, args)
    }
    if (command === 'warn') {
        client.commands.get('warn').execute(msg, args, client, Discord)
    }
    if (command === 'ticket') {
        client.commands.get('ticket').execute(msg, args, client, Discord)
    }
    if (command === 'tclose') {
        client.commands.get('tclose').execute(msg, args, client, Discord)
    }
    if (command === 'thelp') {
        client.commands.get('thelp').execute(msg, args, client, Discord)
    }
    if (command === 'tsetup') {
        client.commands.get('tsetup').execute(msg, args, client, Discord)
    }
    if (command === 'walson') {
        client.commands.get('walson').execute(msg, args, client, Discord)
    }


});







client.login(config.token);