const db = require("quick.db")
const config = require("../config.json");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright, bgBlue, gray } = require('chalk');
module.exports = {
    name: 'lock',
    description: "channel lockdown",
     execute(msg, args, client, Discord){
         msg.delete()
        if(!msg.member.hasPermission("MANAGE_CHANNELS")) return;
        const alreadyLocked = new Discord.MessageEmbed()
        .setColor("#a0e43f")
      .setTitle("**Channel lock unsuccessful**")
      .setDescription(`Channel is already locked`)
      
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
    if(db.fetch(`lock.${msg.channel.id}`)) return msg.reply(alreadyLocked)
    

    

    
        
       if(db.set(`lock.${msg.channel.id}`,msg.author.id)) {
        msg.channel.updateOverwrite(msg.guild.roles.cache.find(e => e.id.toLowerCase().trim() == `${config.serverMemberId}`),{
            SEND_MESSAGES:false,
            ADD_REACTIONS:false
        })
        const locked = new Discord.MessageEmbed()
        .setColor("#a0e43f")
      .setTitle("**Channel lock successful**")
      .setDescription(` Locked down ${msg.channel.name}`)
      .addFields(
        {
            name: "**Locked by** :",
            value: `${msg.author}`,
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
        msg.channel.send(locked) + console.log( "[" + green("Craft") + gray("Play")+ "]" + blueBright(`${msg.author.tag} locked ${msg.channel.name} !`));
    }

    
}
}
