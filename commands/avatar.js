const Discord = require('discord.js');
module.exports = {
    name: 'avatar',
    description: "Shows member avatar!",
    execute(msg, args){
        msg.delete()
        let mentionedMember = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if(!mentionedMember) mentionedMember = msg.member;

        const embed = new Discord.MessageEmbed()
        .setColor("#a0e43f")
        .setTitle(mentionedMember.user.tag + "'s avatar!")
        .setImage(mentionedMember.user.displayAvatarURL({dynamic : true}));

        msg.channel.send(embed);
    }
}