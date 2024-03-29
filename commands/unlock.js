const db = require("quick.db")
const config = require("../config.json");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright, bgBlue, gray } = require('chalk');
module.exports = {
    name: 'unlock',
    description: "test command",
    execute(msg, args, client, Discord){
        msg.delete()
        if(!msg.member.hasPermission("MANAGE_CHANNELS")) return;
        const alreadyUnlocked = new Discord.MessageEmbed()
        .setColor("#a0e43f")
      .setTitle("**Channel unlock unsuccessful**")
      .setDescription(`Channel is already unlocked`)
      
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
    if(!db.fetch(`lock.${msg.channel.id}`)) return msg.channel.send(alreadyUnlocked)
   

    

    try {
        db.delete(`lock.${msg.channel.id}`)
        msg.channel.updateOverwrite(msg.guild.roles.cache.find(e => e.id.toLowerCase().trim() == `${config.serverMemberId}`),{
            SEND_MESSAGES:true,
            ADD_REACTIONS:true
        })
        const unlocked = new Discord.MessageEmbed()
        .setColor("#a0e43f")
      .setTitle("**Channel unlock successful**")
      .setDescription(` Unlocked ${msg.channel.name} `)
      .addFields(
        {
            name: "**Unlocked by** :",
            value: `${msg.author}`,
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
        msg.channel.send(unlocked) + console.log( "[" + green("Craft") + gray("Play")+ "]" + blueBright(`${msg.author.tag} unlocked ${msg.channel.name} !`));

    }catch(e){
       
    }
    }
} 
