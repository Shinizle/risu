const Discord = require('discord.js')

module.exports = {
    name: "player",
    description: "Guild Search",

    async run (client, msg, args) {
        if (args.length === 2 && args[0] === "ID" && args[1] !== null) {
            var request = require('request');

            var headers = {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=B5986A807D4E1FD226DC83EC40F5B3DB',
            };
            
            const main = async () => {
                request.post({
                url: 'https://info.gbfteamraid.fun/web/userrank?method=getUserDayPoint&params=%7B%22teamraidid%22%3A%22teamraid057%22%2C%22userid%22%3A%22' + args[1] + '%22%7D', 
                headers: headers,
            }, (error, response, body) => {
                    var obj = JSON.parse(response.body);
                    console.log(obj.result);
                    if (obj.result.length == 0) {
                        msg.channel.send("Player ID tidak ditemukan.");
                    } else {
                        var field = new Array();
                        Object.entries(obj.result).forEach(
                            ([key, value]) => field[key] = {
                                'name': "Date: " + value.updatedate,
                                'value': "Daily: " + (Math.floor(value.maxp - value.minp)).toLocaleString() + " | " + "Total: " + (Math.floor(value.maxp)).toLocaleString(),
                                'inline': true,
                            }
                        );

                        const crewinfo = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('**Player Data United and Fight**')
                        .setURL('https://game.granbluefantasy.jp')
                        .setAuthor(msg.author.username, 'https://gbf.wiki/images/0/03/Stamp148.png', 'https://game.granbluefantasy.jp')
                        .setDescription('Tengtereng teng teng teng')
                        .setThumbnail('https://cdn.discordapp.com/emojis/874305387774500915.png?v=1')
                        .addFields(field)
                        .setTimestamp()
                        .setFooter('Risu-desu!', 'https://gbf.wiki/images/0/03/Stamp148.png');

                        msg.channel.send(crewinfo);
                    }
                })
            }
            
            main()
        }
    }
}