const util = require('minecraft-server-util');
const Discord = require('discord.js');
const config = require("../config.json")
module.exports = {
    name: 'status',
    description: "Minecraft status command",
     async execute(msg, args, client){
         msg.delete()
        util.status(`${config.serverIp}`, { port: 25565, enableSRV: true, timeout: 5000, protocolVersion: 47 }) 
    .then((response) => {
        const status = new Discord.MessageEmbed()
        .setColor("#a0e43f")
        .setTitle("**CraftPlay • Survival - Minecraft Server Status**")
        .setDescription(`**Status** : Online`)
        .addFields(
            
            {

                name: "**Server ip** :",
                value: `play.craftplay.xyz:${response.port}`,
                inline: false
            },
            {
                name: "**Online players** :",
                value: `${response.onlinePlayers}/${response.maxPlayers}`,
                inline: true
            },
            {
                name: "**Server Version** :",
                value: `${response.version}`,
                inline: true
            }
        )
        .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
      .setFooter("For any bugs or other questions mention Craftplay developers")
        msg.channel.send(status)
    })
    .catch((error) => {
        const offlineServer = new Discord.MessageEmbed()
        .setColor("#a0e43f")
        .setTitle("**CraftPlay • Survival - Minecraft Server Status**")
        .setDescription("**Status**: Offline")
        .addFields(
            
            {

                name: "**Server ip** :",
                value: `play.craftplay.xyz:${response.port}`,
                inline: false
            },
            {
                name: "**Online players** :",
                value: `Server offline`,
                inline: true
            },
            {
                name: "**Server Version** :",
                value: `${response.version}`,
                inline: true
            }
        )
        .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
      .setFooter("For any bugs or other questions mention Craftplay developers")
        msg.channel.send(offlineServer)

    });

    }
}