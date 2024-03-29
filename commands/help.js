module.exports = {
    name: 'help',
    description: 'help menu',
    execute(msg, args, Discord){
        msg.delete()
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#a0e43f')
        .setTitle('**Craftplay discord bot**')
        .setDescription('Craftplay discord commands\nPrefix: ~ ')
        .addFields(
            {name: '🛠️Admin', value: '`ban` `kick` `mute` `clear` `lock/unlock`'},
            {name: '⚜️Server', value: '`status` `discord`'},
            {name: '💎ETC', value: '`userinfo` `avatar` `player`'},
           
            
        )
        .setImage(`https://cdn.discordapp.com/attachments/732692223883477133/841244632489918474/Commands.png`)
        .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
        .setFooter('Craftplay discord bot made by [Dev]mthh');
        

        msg.channel.send(newEmbed);
        




    }
}