const Discord = require('discord.js')

module.exports = {
    name: "risu",
    description: "Talking Risu",

    async run (client, msg, args) {
        msg.delete({timeout: 10});
        msg.channel.send(msg.content.substr(6, 99999));
    }
}