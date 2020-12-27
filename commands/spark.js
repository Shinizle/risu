const Discord = require('discord.js')

module.exports = {
    name: "spark",
    description: "GBF Spark Calculator",

    async run (client, msg, args) {
        if (args.length === 5 && args[1] === "|" && args[3] === "|") {
            let draw        = 300;
            let crystal     = parseInt(args[0]);
            let single      = parseInt(args[2]);
            let tenfold     = parseInt(args[4]);
            const spark     = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('**GRANBLUE FANTASY SPARKFUND INFO**')
            .setURL('https://game.granbluefantasy.jp')
            .setAuthor(msg.author.username, 'https://gbf.wiki/images/0/03/Stamp148.png', 'https://game.granbluefantasy.jp')
            .setDescription('Permisi jagoan mau spark apa nih?')
            .setThumbnail('https://cdn.discordapp.com/attachments/486763700405927936/729694533457019022/done_oc_rise_pp.png')
            .addFields(
                { 
                    name: '**TOTAL SPARKFUND**', 
                    value: (Math.floor(crystal / draw) + single + (tenfold * 10))
                },
                { 
                    name: 'CRYSTAL', 
                    value: crystal,
                    inline: true 
                },
                { 
                    name: 'SINGLE DRAW TICKET', 
                    value: single, 
                    inline: true 
                },
                { 
                    name: '10-DRAW TICKET', 
                    value: tenfold, 
                    inline: true 
                },
            )
            .setTimestamp()
            .setFooter('Risu-desu!', 'https://gbf.wiki/images/0/03/Stamp148.png');

            msg.channel.send(spark);
        } else {
            msg.channel.send('```Format salah desu! \n \nFormat: >spark crystal | single ticket | 10-draw ticket\nContoh: >spark 5000 | 12 | 2```');
        }
    }
}