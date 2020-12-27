const Discord           = require('discord.js');
const settings          = require('./settings.json');
const client            = new Discord.Client();
const express           = require('express');
const mongoose          = require('mongoose');
const config            = require('config');
const app               = express();
const db                = config.get('mongoURI');
const { readdirSync }   = require('fs');
const { join }          = require('path');

/*mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err)); */

client.commands     = new Discord.Collection();

const commandFiles  = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
const prefix        = settings.prefix;

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on("error", console.error);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {

    if(msg.author.bot) return;
    if(msg.channel.type === 'dm') return;
    if(msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;
        try {
            client.commands.get(command).run(client, msg, args);

        } catch (error){
            console.error(error);
        }
    }

});

//client.login(process.env.token);
client.login(settings.token); 